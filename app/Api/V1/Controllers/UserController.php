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

class UserController extends Controller
{
  use Helpers;

  public function __construct()
  {
    $this->middleware('jwt.auth', ['only' => ['attachRole', 'updateImage']]);
  }

  public function index()
  {
    return $this->response->collection(User::orderBy('fresher')->get(), new UserTransformer);
  }

  public function show($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:users,id'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    return $this->response->item(User::find($id), new UserTransformer);
  }

  public function create(Request $request)
  {
    $validator = Validator::make($request->only(['fresher', 'email', 'first_name', 'last_name']), [
      'fresher' => 'required|unique:users,fresher',
      'email' => 'required|email|unique:users,email',
      'first_name' => 'required',
      'last_name' => 'required'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
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

  public function update(Request $request, $id)
  {
    if(!strcmp($request->get('email'), User::find($id)->email)) {
      $validator = Validator::make(array_merge(['id' => $id], $request->only(['fresher', 'first_name', 'last_name'])), [
        'id' => 'required|exists:users,id',
        'fresher' => 'required|unique:users,fresher',
        'first_name' => 'required',
        'last_name' => 'required'
      ]);

      if($validator->fails()) {
        throw new ValidationHttpException($validator->errors()->all());
      }
    } else {
      $validator = Validator::make(array_merge(['id' => $id], $request->only(['fresher', 'email', 'first_name', 'last_name'])), [
        'id' => 'required|exists:users,id',
        'fresher' => 'required|unique:users,fresher',
        'email' => 'required|email|unique:users,email',
        'first_name' => 'required',
        'last_name' => 'required'
      ]);

      if($validator->fails()) {
        throw new ValidationHttpException($validator->errors()->all());
      }
    }

    $user = User::find($id);
    $user->fresher = $request->get('fresher');
    $user->email = $request->get('email');
    $user->first_name = $request->get('first_name');
    $user->last_name = $request->get('last_name');
    $user->confirmation_token = str_random(255);
    $user->confirmed = 0;

    if($user->save()) {
      Mail::send('emails.auth.change', ['user' => $user, 'url' => Config::get("app.url")], function($message) use($user) {
        $message->from(Config::get("mail.from")["address"], Config::get("mail.from")["name"]);
        $message->to($user->email, $user->first_name)->subject('DigiDay - Conferma il nuovo indirizzo Email');
      });

      return $this->response->item(User::find($user->id), new UserTransformer);
    } else {
      return $this->response->errorInternal('could_not_update_email');
    }
  }

  public function updateImage(Request $request, $id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:users,id'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $user = User::find($id);
    $user->image = $request->get('image');

    if($user->save()) {
      return $this->response->item(User::find($user->id), new UserTransformer);
    } else {
      return $this->response->errorInternal('could_not_update_image');
    }
  }

  public function attachRole(Request $request, $id)
  {
    $validator = Validator::make(array_merge(['id' => $id], $request->only(['role_id'])), [
      'id' => 'required|exists:users,id',
      'role_id' => 'required|exists:roles,id'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $user = User::find($id);

    $count = count($user->roles()->get());

    $user->roles()->attach($request->get('role_id'));

    if(count($user->roles()->get()) > $count) {
      return $this->response->item(User::find($id), new UserTransformer);
    } else {
      return $this->response->errorInternal('could_not_attach_role');
    }
  }

  public function detachRole(Request $request, $id)
  {
    $validator = Validator::make(array_merge(['id' => $id], $request->only(['role_id'])), [
      'id' => 'required|exists:users,id',
      'role_id' => 'required|exists:roles,id'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $user = User::find($id);

    $count = count($user->roles()->get());

    $user->roles()->detach($request->get('role_id'));

    if(count($user->roles()->get()) < $count) {
      return $this->response->item(User::find($id), new UserTransformer);
    } else {
      return $this->response->errorInternal('could_not_detach_role');
    }
  }

  public function attended(Request $request, $id)
  {
    $validator = Validator::make(array_merge(['id' => $id], $request->only(['attended', 'event_id'])), [
      'id' => 'required|exists:users,id',
      'attended' => 'required',
      'event_id' => 'required|exists:events,id'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    User::find($id)->attendedEvents()->updateExistingPivot($request->get('event_id'), [
      'attended' => $request->get('attended')
    ]);

    return $this->response->item(User::find($id), new UserTransformer);
  }

  public function enable($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:users,id'
    ]);

    $user = User::find($id);
    $user->disabled = 0;

    if($user->save()) {
      return $this->response->item(User::find($user->id), new UserTransformer);
    } else {
      return $this->response->errorInternal('could_not_enable_user');
    }
  }

  public function disable($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:users,id'
    ]);

    $user = User::find($id);
    $user->disabled = 1;

    if($user->save()) {
      return $this->response->item(User::find($user->id), new UserTransformer);
    } else {
      return $this->response->errorInternal('could_not_disable_user');
    }
  }
}
