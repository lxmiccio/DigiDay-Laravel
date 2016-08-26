<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Classroom extends Model
{
	protected $fillable = [
		'name', 'description', 'maximum_partecipants',
	];

	/**
	* Get the events for the classroom.
	*/
	public function events()
	{
		return $this->hasMany('App\Event');
	}
}
