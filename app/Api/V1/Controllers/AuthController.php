<?php

namespace App\Api\V1\Controllers;

use Config;
use JWTAuth;
use Mail;
use Validator;
use App\Http\Controllers\Controller;
use App\Transformers\UserTransformer;
use App\User;
use Dingo\Api\Exception\ValidationHttpException;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Password;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class AuthController extends Controller
{
  use Helpers;

  public function __construct()
  {
    $this->middleware('jwt.auth', ['only' => ['me', 'logout']]);
    $this->middleware('jwt.refresh', ['only' => ['refresh']]);
  }

  public function me()
  {
    try {
      if(!$user = JWTAuth::parseToken()->authenticate()) {
        return $this->response->errorNotFound('user_not_found');
      }
    } catch(TokenExpiredException $exception) {
      return $this->response->error('token_expired', $exception->getStatusCode());
    } catch(TokenInvalidException $exception) {
      return $this->response->error('token_invalid', $exception->getStatusCode());
    } catch(JWTException $exception) {
      return $this->response->error('token_absent', $exception->getStatusCode());
    }

    return $this->response->item($user, new UserTransformer);
  }

  public function refresh() {

  }

  public function login(Request $request)
  {
    $validator = Validator::make($request->only(['fresher', 'password']), [
      'fresher' => 'required|exists:users,fresher',
      'password' => 'required|min:6'
    ]);

    if($validator->fails()) {
      return $this->response->errorUnauthorized('La matricola selezionata non esiste');
    }

    try {
      if(!$token = JWTAuth::attempt(array_merge(['fresher' => $request->only(['fresher'])], $request->only(['password'])))) {
        return $this->response->errorUnauthorized('La password non corrisponde alla matricola');
      }
    } catch(JWTException $exception) {
      return $this->response->errorInternal('could_not_create_token');
    }

    return response()->json(compact('token'));
  }

  public function logout()
  {
    if(JWTAuth::parseToken()->invalidate()) {
      return $this->response->noContent();
    } else {
      return $this->response->errorInternal('could_not_logout');
    }
  }

  public function signup(Request $request)
  {
    if(Validator::make($request->only(['fresher']), ['fresher' => 'required|unique:users,fresher'])->fails()) {
      return $this->response->errorBadRequest('La matricola selezionata è già registrata');
    }

    if(Validator::make($request->only(['email']), ['email' => 'required|email|unique:users,email'])->fails()) {
      return $this->response->errorBadRequest('La email selezionata è già registrata');
    }

    if(Validator::make($request->only(['first_name', 'last_name']), ['first_name' => 'required', 'last_name' => 'required'])->fails()) {
      return $this->response->errorBadRequest('Inserire nome e cognome');
    }

    $user = new User;
    $user->fresher = $request->get('fresher');
    $user->email = $request->get('email');
    $user->first_name = $request->get('first_name');
    $user->last_name = $request->get('last_name');
    $user->image = 'images/default/user.jpg';
    $user->password = str_random(255);
    $user->confirmation_token = str_random(255);

    if($user->save()) {
      Mail::send('emails.auth.confirm', ['user' => $user, 'url' => Config::get("app.url")], function($message) use($user) {
        $message->from(Config::get("mail.from")["address"], Config::get("mail.from")["name"]);
        $message->to($user->email, $user->first_name)->subject('DigiDay - Conferma il tuo Account');
      });

      return $this->response->item(User::find($user->id), new UserTransformer);
    } else {
      return $this->response->errorInternal('could_not_create_user');
    }
  }

  public function confirm(Request $request)
  {
    $validator = Validator::make($request->only(['token', 'password']), [
      'token' => 'required|exists:users,confirmation_token',
      'password' => 'required|min:6'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $user = User::where('confirmation_token', $request->get('token'))->first();
    $user->password = $request->get('password');
    $user->confirmed = 1;

    if($user->save()) {
      return $this->response->noContent();
    } else {
      return $this->response->errorInternal('could_not_confirm_user');
    }
  }

  public function recovery(Request $request)
  {
    $validator = Validator::make($request->only(['fresher']), [
      'fresher' => 'required|exists:users,fresher'
    ]);

    if($validator->fails()) {
      return $this->response->errorBadRequest('La matricola selezionata non esiste');
    }

    $response = Password::sendResetLink(['email' => User::where('fresher', $request->only(['fresher']))->first()->email], function(Message $message) {
      $message->subject('DigiDay - Modifica la tua Password');
    });

    if($response == Password::RESET_LINK_SENT) {
      return $this->response->noContent();
    } else if($response == Password::INVALID_USER) {
      return $this->response->errorNotFound('user_not_found');
    }
  }

  public function reset(Request $request)
  {
    if(Validator::make($request->only(['fresher']), ['fresher' => 'required|exists:users,freshe'])->fails()) {
      return $this->response->errorBadRequest('La matricola selezionata non esiste');
    }

    $validator = Validator::make($request->only(['token', 'password', 'password_confirmation']), [
      'token' => 'required',
      'password' => 'required|confirmed|min:6',
      'password_confirmation' => 'required|min:6',
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $response = Password::reset(array_merge(['email' => User::where('fresher', $request->only(['fresher']))->first()->email], $request->only(['token', 'password', 'password_confirmation'])), function($user, $password) {
      $user->password = $password;
      $user->save();
    });

    if($response == Password::PASSWORD_RESET) {
      return $this->response->noContent();
    } else {
      return $this->response->errorInternal('could_not_reset_password');
    }
  }
}
