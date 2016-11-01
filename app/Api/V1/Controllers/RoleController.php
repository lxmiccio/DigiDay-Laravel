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
}
