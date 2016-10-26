<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use Validator;
use App\Role;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Transformers\RoleTransformer;
use Dingo\Api\Exception\ValidationHttpException;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;

class RoleController extends Controller
{
  use Helpers;

  public function __construct()
  {
    $this->middleware('jwt.auth', ['except' => ['index', 'show']]);
  }

  public function index()
  {
    return $this->response->collection(Role::orderBy('name')->get(), new RoleTransformer);
  }

  // public function show($id)
  // {
  //   $validator = Validator::make(['id' => $id], [
  //     'id' => 'required|exists:roles,id'
  //   ]);
  //
  //   if($validator->fails()) {
  //     throw new ValidationHttpException($validator->errors()->all());
  //   }
  //
  //   return $this->response->item(Role::find($id), new RoleTransformer);
  // }

  // public function store(Request $request)
  // {
  //   $validator = Validator::make($request->only(['name']), [
  //     'name' => 'required'
  //   ]);
  //
  //   if($validator->fails()) {
  //     throw new ValidationHttpException($validator->errors()->all());
  //   }
  //
  //   $role = new Role;
  //   $role->name = $request->get('name');
  //
  //   if($role->save()) {
  //     return $this->response->item(Role::find($role->id), new RoleTransformer);
  //   } else {
  //     return $this->response->errorInternal('could_not_create_role');
  //   }
  // }

  // public function update(Request $request, $id)
  // {
  //   $validator = Validator::make(array_merge(['id' => $id], $request->only(['name'])), [
  //     'id' => 'required|exists:roles,id',
  //     'name' => 'required'
  //   ]);
  //
  //   if($validator->fails()) {
  //     throw new ValidationHttpException($validator->errors()->all());
  //   }
  //
  //   $role = Role::find($id);
  //   $role->name = $request->get('name');
  //
  //   if($role->save()) {
  //     return $this->response->item(Role::find($role->id), new RoleTransformer);
  //   } else {
  //     return $this->response->errorInternal('could_not_update_role');
  //   }
  // }

  // public function destroy($id)
  // {
  //   $validator = Validator::make(['id' => $id], [
  //     'id' => 'required|exists:roles,id'
  //   ]);
  //
  //   $role = Role::find($id);
  //
  //   if($role->delete()) {
  //     return $this->response->noContent();
  //   } else {
  //     return $this->response->errorInternal('could_not_delete_role');
  //   }
  // }
}
