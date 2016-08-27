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
    return $this->response->collection(Classroom::all(), new ClassroomTransformer);
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
    $validator = Validator::make($request->only(['name', 'maximum_partecipants']), [
      'name' => 'required|unique:classrooms,name',
      'maximum_partecipants' => 'required|integer|min:0'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $classroom = new Classroom;

    $classroom->name = $request->get('name');
    $classroom->description = $request->get('description');
    $classroom->maximum_partecipants = $request->get('maximum_partecipants');

    if($classroom->save()) {
      return $this->response->item(Classroom::find($classroom->id), new ClassroomTransformer);
    }
    else {
      return $this->response->errorInternal('could_not_create_classroom');
    }
  }

  public function update(Request $request, $id)
  {
    $validator = Validator::make(array_merge(['id' => $id], $request->only(['name', 'maximum_partecipants'])), [
      'id' => 'required|exists:classrooms,id',
      'name' => 'required',
      'maximum_partecipants' => 'required|integer|min:0'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $classroom = Classroom::find($id);

    $classroom->name = $request->get('name');
    $classroom->description = $request->get('description');
    $classroom->maximum_partecipants = $request->get('maximum_partecipants');

    if($classroom->save()) {
      return $this->response->item(Classroom::find($classroom->id), new ClassroomTransformer);
    }
    else {
      return $this->response->errorInternal('could_not_update_classroom');
    }
  }

  public function destroy($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:classrooms,id'
    ]);

    $classroom = Classroom::find($id);

    if($classroom->delete()) {
      return $this->response->noContent();
    }
    else {
      return $this->response->errorInternal('could_not_delete_classroom');
    }
  }
}
