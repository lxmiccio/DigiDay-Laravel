<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use Validator;
use App\Classroom;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Transformers\ClassroomTransformer;
use Dingo\Api\Exception\ValidationHttpException;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;

class ClassroomController extends Controller
{
  use Helpers;

  public function __construct()
  {
    $this->middleware('jwt.auth', ['except' => ['index', 'show']]);
  }

  public function index()
  {
    return $this->response->collection(Classroom::orderBy('name')->get(), new ClassroomTransformer);
  }

  public function show($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:classrooms,id'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    return $this->response->item(Classroom::find($id), new ClassroomTransformer);
  }

  public function store(Request $request)
  {
    $validator = Validator::make($request->only(['name', 'capacity']), [
      'name' => 'required|unique:classrooms,name',
      'capacity' => 'required|integer|min:1'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $classroom = new Classroom;
    $classroom->name = $request->get('name');
    $classroom->capacity = $request->get('capacity');
    $classroom->description = $request->get('description');

    if($classroom->save()) {
      return $this->response->item(Classroom::find($classroom->id), new ClassroomTransformer);
    } else {
      return $this->response->errorInternal('could_not_create_classroom');
    }
  }

  public function update(Request $request, $id)
  {
    $validator = Validator::make(array_merge(['id' => $id], $request->only(['name', 'capacity'])), [
      'id' => 'required|exists:classrooms,id',
      'name' => 'required|unique:classrooms,name',
      'capacity' => 'required|integer|min:1'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $classroom = Classroom::find($id);
    $classroom->name = $request->get('name');
    $classroom->capacity = $request->get('capacity');
    $classroom->description = $request->get('description');

    if($classroom->save()) {
      return $this->response->item(Classroom::find($classroom->id), new ClassroomTransformer);
    } else {
      return $this->response->errorInternal('could_not_update_classroom');
    }
  }

  public function destroy($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:classrooms,id'
    ]);

    $classroom = Classroom::find($id);
    $classroom->disabled = 1;

    if($classroom->save()) {
      return $this->response->noContent();
    } else {
      return $this->response->errorInternal('could_not_delete_classroom');
    }
  }

  public function enable($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:classrooms,id'
    ]);

    $classroom = Classroom::find($id);
    $classroom->disabled = 0;

    if($classroom->save()) {
      return $this->response->item(Classroom::find($classroom->id), new ClassroomTransformer);
    } else {
      return $this->response->errorInternal('could_not_enable_classroom');
    }
  }

  public function disable($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:classrooms,id'
    ]);

    $classroom = Classroom::find($id);
    $classroom->disabled = 1;

    if($classroom->save()) {
      return $this->response->item(Classroom::find($classroom->id), new ClassroomTransformer);
    } else {
      return $this->response->errorInternal('could_not_disable_classroom');
    }
  }

  // public function destroy($id)
  // {
  //   $validator = Validator::make(['id' => $id], [
  //     'id' => 'required|exists:classrooms,id'
  //   ]);
  //
  //   $classroom = Classroom::find($id);
  //
  //   if($classroom->delete()) {
  //     return $this->response->noContent();
  //   } else {
  //     return $this->response->errorInternal('could_not_delete_classroom');
  //   }
  // }
}
