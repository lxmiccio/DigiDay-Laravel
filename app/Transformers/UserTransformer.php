<?php

namespace App\Transformers;

use App\User;
use League\Fractal;

class UserTransformer extends Fractal\TransformerAbstract
{
	public function transform(User $user)
	{
		return [
			'id' => $user->id,
			'fresher' => $user->fresher,
			'email' => $user->email,
			'firstName' => $user->first_name,
			'lastName' => $user->last_name,
			'image' => $user->image,
			'confirmed' => $user->confirmed,
			'disabled' => $user->disabled,

			'events' => $user->events()->orderBy('starting_date', 'desc')->get([
				'events.id',
				'events.name',
				'events.starting_date as startingDate',
				'events.ending_date as endingDate'
			]),

			'attendedEvents' => $user->attendedEvents()->orderBy('starting_date', 'desc')->get([
				'events.id',
				'events.name',
				'events.starting_date as startingDate',
				'events.ending_date as endingDate',
				'event_user.attended'
			]),

			'roles' => $user->roles()->orderBy('name')->get([
				'roles.id',
				'roles.name'
			])
		];
	}
}
