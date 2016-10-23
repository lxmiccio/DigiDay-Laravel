<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Classroom extends Model
{
	protected $fillable = [
		'name', 'capacity', 'description'
	];

	/**
	* Get the events for the classroom.
	*/
	public function events()
	{
		return $this->hasMany('App\Event');
	}
}
