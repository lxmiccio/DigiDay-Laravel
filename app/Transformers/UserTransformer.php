<?php

namespace App\Transformers;

use App\User;
use League\Fractal;

class UserTransformer extends Fractal\TransformerAbstract
{
	public function transform(User $user)
	{
		$events = [];

		foreach ($user->events()->orderBy('starting_date', 'desc')->get() as $event) {
			$users = [];

			foreach ($event->users()->orderBy('fresher')->get() as $usr) {
				$users[] = [
					'id' => $usr->id,
					'fresher' => $usr->fresher,
					'email' => $usr->email,
					'firstName' => $usr->first_name,
					'lastName' => $usr->last_name,
					'attended' => $usr->pivot->attended
				];
			}

			$events[] = [
				'id' => $event->id,
				'name' => $event->name,
				'startingDate' => $event->starting_date,
				'endingDate' => $event->ending_date,
				'maximumPartecipants' => $event->maximum_partecipants,

				'topic' => $event->topic()->get([
					'id',
					'name'
				])
				->first(),

				'user' => $event->user()->get([
					'users.id',
					'users.fresher',
					'users.email',
					'users.first_name as firstName',
					'users.last_name as lastName'
				])
				->first(),

				'users' => $users
			];
		}

		$attendedEvents = [];

		foreach ($user->attendedEvents()->orderBy('starting_date', 'desc')->get() as $event) {
			$users = [];

			foreach ($event->users()->orderBy('fresher')->get() as $usr) {
				$users[] = [
					'id' => $usr->id,
					'fresher' => $usr->fresher,
					'email' => $usr->email,
					'firstName' => $usr->first_name,
					'lastName' => $usr->last_name,
					'attended' => $usr->pivot->attended
				];
			}

			$attendedEvents[] = [
				'id' => $event->id,
				'name' => $event->name,
				'startingDate' => $event->starting_date,
				'endingDate' => $event->ending_date,
				'maximumPartecipants' => $event->maximum_partecipants,

				'topic' => $event->topic()->get([
					'id',
					'name'
				])
				->first(),

				'user' => $event->user()->get([
					'users.id',
					'users.fresher',
					'users.email',
					'users.first_name as firstName',
					'users.last_name as lastName'
				])
				->first(),

				'users' => $users
			];
		}

		return [
			'id' => $user->id,
			'fresher' => $user->fresher,
			'email' => $user->email,
			'firstName' => $user->first_name,
			'lastName' => $user->last_name,
			'image' => $user->image,
			'confirmed' => $user->confirmed,
			'disabled' => $user->disabled,

			'events' => $events,

			'attendedEvents' => $attendedEvents,

			'roles' => $user->roles()->orderBy('name')->get([
				'roles.id',
				'roles.name'
			])
		];
	}
}
