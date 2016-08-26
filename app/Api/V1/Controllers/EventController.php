<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use Validator;
use App\Event;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Transformers\EventTransformer;
use Dingo\Api\Exception\ValidationHttpException;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;

class EventController extends Controller
{
  use Helpers;

  public function __construct()
  {
    $this->middleware('jwt.auth', ['except' => ['index', 'show']]);
  }

  public function index()
  {
    return $this->response->collection(Event::all(), new EventTransformer);
  }

  public function show($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:events,id'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    return $this->response->item(Event::find($id), new EventTransformer);
  }

  public function store(Request $request)
  {
    $validator = Validator::make($request->only(['name', 'starting_date', 'ending_date', 'maximum_partecipant', 'user_id', 'classroom_id', 'topic_id']), [
      'name' => 'required',
      'starting_date' => 'required|date_format:Y-m-d H:i:s',
      'ending_date' => 'required|date_format:Y-m-d H:i:s|after:starting_date',
      'maximum_partecipant' => 'required|integer|min:0',
      'user_id' => 'required|exists:users:id',
      'classroom_id' => 'required|exists:classrooms,id',
      'topic_id' => 'required|exists:topics:id'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $event = new Event;

    $event->name = $request->get('name');
    $event->description = $request->get('description');
    $event->starting_date = $request->get('starting_date');
    $event->ending_date = $request->get('ending_date');
    $event->maximum_partecipant = $request->get('maximum_partecipant');
    $event->user_id = $request->get('user_id');
    $event->classroom_id = $request->get('classroom_id');
    $event->topic_id = $request->get('topic_id');

    if($event->save()) {
      return $this->response->item(Event::find($id), new EventTransformer);
    }
    else {
      return $this->response->errorInternal('could_not_create_event');
    }
  }

  public function update(Request $request, $id)
  {
    $validator = Validator::make(array_merge(['id' => $id], $request->only(['name', 'starting_date', 'ending_date', 'maximum_partecipant'])), [
      'id' => 'required|exists:events,id',
      'name' => 'required',
      'starting_date' => 'required|date_format:Y-m-d H:i:s',
      'ending_date' => 'required|date_format:Y-m-d H:i:s|after:starting_date',
      'maximum_partecipant' => 'required|integer|min:0'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $event = Event::find($id);

    $event->name = $request->get('name');
    $event->description = $request->get('description');
    $event->starting_date = $request->get('starting_date');
    $event->ending_date = $request->get('ending_date');
    $event->maximum_partecipant = $request->get('maximum_partecipant');

    if($event->save()) {
      return $this->response->item(Event::find($id), new EventTransformer);
    }
    else {
      return $this->response->errorInternal('could_not_update_event');
    }
  }

  public function attachUser(Request $request, $id) {
    $validator = Validator::make(array_merge(['id' => $id], $request->only(['user_id'])), [
      'id' => 'required|exists:events,id',
      'user_id' => 'required|exists:users,id'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $event = Event::find($id);

    $count = count($event->users()->get());

    $event->users()->attach($request->get('user_id'));

    if(count($event->users()->get()) > $count) {
      return $this->response->item(Event::find($id), new EventTransformer);
    }
    else {
      return $this->response->errorInternal('could_not_attach_user');
    }
  }

  public function detachUser(Request $request, $id) {
    $validator = Validator::make(array_merge(['id' => $id], $request->only(['user_id'])), [
      'id' => 'required|exists:events,id',
      'user_id' => 'required|exists:users,id'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $event = Event::find($id);

    $count = count($event->users()->get());

    $event->users()->detach($request->get('user_id'));

    if(count($event->users()->get()) < $count) {
      return $this->response->item(Event::find($id), new EventTransformer);
    }
    else {
      return $this->response->errorInternal('could_not_detach_user');
    }
  }

  public function attachItem(Request $request, $id) {
    $validator = Validator::make(array_merge(['id' => $id], $request->only(['item_id', 'required_amount'])), [
      'id' => 'required|exists:events,id',
      'item_id' => 'required|exists:items,id',
      'required_amount' => 'required|integer|min:0'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $event = Event::find($id);

    $count = count($event->items()->get());

    $event->items()->attach([$request->get('item_id') => ['required_amount' => $request->get('required_amount')]]);

    if(count($event->items()->get()) > $count) {
      return $this->response->item(Event::find($id), new EventTransformer);
    }
    else {
      return $this->response->errorInternal('could_not_attach_item');
    }
  }

  public function detachItem(Request $request, $id) {
    $validator = Validator::make(array_merge(['id' => $id], $request->only(['item_id'])), [
      'id' => 'required|exists:events,id',
      'item_id' => 'required|exists:items,id'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $event = Event::find($id);

    $count = count($event->items()->get());

    $event->items()->detach($request->get('item_id'));

    if(count($event->items()->get()) < $count) {
      return $this->response->item(Event::find($id), new EventTransformer);
    }
    else {
      return $this->response->errorInternal('could_not_detach_item');
    }
  }

  public function destroy($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:events,id'
    ]);

    $event = Event::find($id);

    if($event->delete()) {
      return $this->response->noContent();
    }
    else {
      return $this->response->errorInternal('could_not_delete_event');
    }
  }
}
