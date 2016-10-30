<?php

namespace App\Api\V1\Controllers;

use JWTAuth;
use Validator;
use App\Item;
use App\Http\Controllers\Controller;
use App\Http\Requests;
use App\Transformers\ItemTransformer;
use Dingo\Api\Exception\ValidationHttpException;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;

class ItemController extends Controller
{
  use Helpers;

  public function __construct()
  {
    $this->middleware('jwt.auth', ['except' => ['index', 'show']]);
  }

  public function index()
  {
    return $this->response->collection(Item::orderBy('name')->get(), new ItemTransformer);
  }

  public function show($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:items,id'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    return $this->response->item(Item::find($id), new ItemTransformer);
  }

  public function store(Request $request)
  {
    $validator = Validator::make($request->only(['name', 'amount']), [
      'name' => 'required',
      'amount' => 'required|integer|min:1'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $item = new Item;
    $item->name = $request->get('name');
    $item->amount = $request->get('amount');
    $item->description = $request->get('description');

    if($item->save()) {
      return $this->response->item(Item::find($item->id), new ItemTransformer);
    } else {
      return $this->response->errorInternal('could_not_create_item');
    }
  }

  public function update(Request $request, $id)
  {
    $validator = Validator::make(array_merge(['id' => $id], $request->only(['name', 'amount'])), [
      'id' => 'required|exists:items,id',
      'name' => 'required',
      'amount' => 'required|integer|min:0'
    ]);

    if($validator->fails()) {
      throw new ValidationHttpException($validator->errors()->all());
    }

    $item = Item::find($id);
    $item->name = $request->get('name');
    $item->amount = $request->get('amount');
    $item->description = $request->get('description');

    if($item->save()) {
      return $this->response->item(Item::find($id), new ItemTransformer);
    } else {
      return $this->response->errorInternal('could_not_update_item');
    }
  }

  public function enable($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:items,id'
    ]);

    $item = Item::find($id);
    $item->disabled = 0;

    if($item->save()) {
      return $this->response->item(Item::find($item->id), new ItemTransformer);
    } else {
      return $this->response->errorInternal('could_not_enable_item');
    }
  }

  public function disable($id)
  {
    $validator = Validator::make(['id' => $id], [
      'id' => 'required|exists:items,id'
    ]);

    $item = Item::find($id);
    $item->disabled = 1;

    if($item->save()) {
      return $this->response->item(Item::find($item->id), new ItemTransformer);
    } else {
      return $this->response->errorInternal('could_not_disable_item');
    }
  }

  // public function destroy($id)
  // {
  //   $validator = Validator::make(['id' => $id], [
  //     'id' => 'required|exists:items,id'
  //   ]);
  //
  //   $item = Item::find($id);
  //
  //   if($item->delete()) {
  //     return $this->response->noContent();
  //   } else {
  //     return $this->response->errorInternal('could_not_delete_item');
  //   }
  // }
}
