<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use Validator;
use App\Topic;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Transformers\TopicTransformer;
use Dingo\Api\Exception\ValidationHttpException;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;

class TopicController extends Controller
{
  use Helpers;

  public function __construct()
  {
    $this->middleware('jwt.auth', ['except' => ['index', 'show']]);
  }

  public function index()
  {
    return $this->response->collection(Topic::orderBy('name')->get(), new TopicTransformer);
  }

  public function show($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:topics,id'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    return $this->response->item(Topic::find($id), new TopicTransformer);
  }

  public function store(Request $request)
  {
    $validator = Validator::make($request->only(['name']), [
      'name' => 'required'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $topic = new Topic;
    $topic->name = $request->get('name');
    $topic->description = $request->get('description');

    if($topic->save()) {
      return $this->response->item(Topic::find($topic->id), new TopicTransformer);
    } else {
      return $this->response->errorInternal('could_not_create_topic');
    }
  }

  public function update(Request $request, $id)
  {
    $validator = Validator::make(array_merge(['id' => $id], $request->only(['name'])), [
      'id' => 'required|exists:topics,id',
      'name' => 'required'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $topic = Topic::find($id);
    $topic->name = $request->get('name');
    $topic->description = $request->get('description');

    if($topic->save()) {
      return $this->response->item(Topic::find($topic->id), new TopicTransformer);
    } else {
      return $this->response->errorInternal('could_not_update_topic');
    }
  }

  public function enable($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:topics,id'
    ]);

    $topic = Topic::find($id);
    $topic->disabled = 0;

    if($topic->save()) {
      return $this->response->item(Topic::find($topic->id), new TopicTransformer);
    } else {
      return $this->response->errorInternal('could_not_enable_topic');
    }
  }

  public function disable($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:topics,id'
    ]);

    $topic = Topic::find($id);
    $topic->disabled = 1;

    if($topic->save()) {
      return $this->response->item(Topic::find($topic->id), new TopicTransformer);
    } else {
      return $this->response->errorInternal('could_not_disable_topic');
    }
  }

  // public function destroy($id)
  // {
  //   $validator = Validator::make(['id' => $id], [
  //     'id' => 'required|exists:topics,id'
  //   ]);
  //
  //   $topic = Topic::find($id);
  //
  //   if($topic->delete()) {
  //     return $this->response->noContent();
  //   } else {
  //     return $this->response->errorInternal('could_not_delete_topic');
  //   }
  // }
}
