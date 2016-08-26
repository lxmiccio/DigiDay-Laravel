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
			'firstName' => $user->first_name,
			'lastName' => $user->last_name,
			'email' => $user->email,
			'birthdate' => $user->birthate,
			'sex' => $user->sex,
			'image' => $user->image,
			'confirmed' => $user->confirmed,

			'events' => $user->events()->orderBy('starting_date')->get([
				'events.id',
				'name',
				'description',
				'starting_date as startingDate',
				'ending_date as endingDate',
				'maximum_partecipants as maximumPartecipants'
			]),

			'attendedEvents' => $user->attendedEvents()->orderBy('starting_date')->get([
				'events.id',
				'name',
				'description',
				'starting_date',
				'ending_date',
				'maximum_partecipants'
			])
		];
	}
}
