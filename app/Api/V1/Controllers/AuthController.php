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
      throw new ValidationHttpException($validator->errors()->all());
    }

    try {
      if(!$token = JWTAuth::attempt(array_merge(['fresher' => $request->only(['fresher'])], $request->only(['password'])))) {
        return $this->response->errorUnauthorized('could_not_login');
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
    }
    else {
      return $this->response->errorInternal('could_not_logout');
    }
  }

  public function signup(Request $request)
  {
    $validator = Validator::make($request->only(['fresher', 'first_name', 'last_name', 'email', 'password']), [
      'fresher' => 'required|unique:users,fresher',
      'first_name' => 'required',
      'last_name' => 'required',
      'email' => 'required|email|unique:users,email',
      'password' => 'required|min:6'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $user = new User;

    $user->fresher = $request->get('fresher');
    $user->first_name = $request->get('first_name');
    $user->last_name = $request->get('last_name');
    $user->email = $request->get('email');
    $user->password = $request->get('password');
    $user->image = $request->get('image');
    $user->confirmation_token = str_random(255);

    if($user->save()) {
      return $this->response->item(User::find($user->id), new UserTransformer);
    }
    else {
      return $this->response->errorInternal('could_not_create_user');
    }
  }

  public function confirm(Request $request)
  {
    $validator = Validator::make(['confirmation_token' => $request->only(['confirmation_token'])], [
      'confirmation_token' => 'required|exists:users,confirmation_token'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $user = User::where('confirmation_token', $request->get('confirmation_token'))->first();

    $user->confirmed = 1;

    if($user->save()) {
      return $this->response->noContent();
    }
    else {
      return $this->response->errorInternal('could_not_confirm_user');
    }
  }

  public function recovery(Request $request)
  {
    $validator = Validator::make($request->only(['fresher']), [
      'fresher' => 'required|exists:users,fresher'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $response = Password::sendResetLink(['email' => User::where('fresher', $request->only(['fresher']))->first()->email], function (Message $message) {
      $message->subject('DigiDay - Modifica la tua Password');
    });

    if($response == Password::RESET_LINK_SENT) {
      return $this->response->noContent();
    }
    else if($response == Password::INVALID_USER){
      return $this->response->errorNotFound('user_not_found');
    }
  }

  public function reset(Request $request)
  {
    $validator = Validator::make($request->only(['token', 'fresher', 'password', 'password_confirmation']), [
      'token' => 'required',
      'fresher' => 'required|exists:users,fresher',
      'password' => 'required|confirmed|min:6',
      'password_confirmation' => 'required|min:6',
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $response = Password::reset(array_merge(['email' => User::where('fresher', $request->only(['fresher']))->first()->email], $request->only(['token', 'password', 'password_confirmation'])), function ($user, $password) {
      $user->password = $password;
      $user->save();
    });

    if($response == Password::PASSWORD_RESET) {
      return $this->response->noContent();
    }
    else {
      return $this->response->errorInternal('could_not_reset_password');
    }
  }
}
