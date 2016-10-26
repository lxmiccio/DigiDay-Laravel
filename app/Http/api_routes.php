<?php

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function ($api) {

	$api->get('auth/me', 'App\Api\V1\Controllers\AuthController@me');
	$api->get('auth/refresh', 'App\Api\V1\Controllers\AuthController@refresh');
	$api->post('auth/login', 'App\Api\V1\Controllers\AuthController@login');
	$api->get('auth/logout', 'App\Api\V1\Controllers\AuthController@logout');
	$api->post('auth/signup', 'App\Api\V1\Controllers\AuthController@signup');
	$api->post('auth/confirm', 'App\Api\V1\Controllers\AuthController@confirm');
	$api->post('auth/recovery', 'App\Api\V1\Controllers\AuthController@recovery');
	$api->post('auth/reset', 'App\Api\V1\Controllers\AuthController@reset');

	$api->get('users', 'App\Api\V1\Controllers\UserController@index');
	$api->get('users/{id}', 'App\Api\V1\Controllers\UserController@show');
	$api->post('users', 'App\Api\V1\Controllers\UserController@create');
	$api->put('users/{id}/update/email', 'App\Api\V1\Controllers\UserController@updateEmail');
	$api->put('users/{id}/update/image', 'App\Api\V1\Controllers\UserController@updateImage');
	$api->put('users/{id}/attach/role', 'App\Api\V1\Controllers\UserController@attachRole');
	$api->put('users/{id}/detach/role', 'App\Api\V1\Controllers\UserController@detachRole');
	$api->put('users/{id}/attended', 'App\Api\V1\Controllers\UserController@attended');
	$api->delete('users/{id}', 'App\Api\V1\Controllers\UserController@destroy');

	$api->resource('classrooms', 'App\Api\V1\Controllers\ClassroomController');

	$api->resource('events', 'App\Api\V1\Controllers\EventController');
	$api->put('events/{id}/attach/user', 'App\Api\V1\Controllers\EventController@attachUser');
	$api->put('events/{id}/detach/user', 'App\Api\V1\Controllers\EventController@detachUser');
	$api->put('events/{id}/attach/item', 'App\Api\V1\Controllers\EventController@attachItem');
	$api->put('events/{id}/detach/item', 'App\Api\V1\Controllers\EventController@detachItem');

	$api->post('images/upload', 'App\Api\V1\Controllers\ImageController@upload');
	$api->post('images/remove', 'App\Api\V1\Controllers\ImageController@remove');

	$api->resource('items', 'App\Api\V1\Controllers\ItemController');

	$api->resource('roles', 'App\Api\V1\Controllers\RoleController');

	$api->resource('topics', 'App\Api\V1\Controllers\TopicController');

});
