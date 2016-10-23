<?php
namespace App\Transformers;

use App\Event;
use League\Fractal;

class EventTransformer extends Fractal\TransformerAbstract
{
	public function transform(Event $event)
	{
		return [
			'id' => $event->id,
			'name' => $event->name,
			'startingDate' => $event->starting_date,
			'endingDate' => $event->ending_date,
			'maximumPartecipants' => $event->maximum_partecipants,
			'description' => $event->description,

			'classroom' => $event->classroom()->get([
				'id',
				'name',
				'capacity',
			])->first(),

			'topic' => $event->topic()->get([
				'id',
				'name'
			])->first(),

			'user' => $event->user()->get([
				'users.id',
				'users.fresher',
				'users.email',
				'users.first_name as firstName',
				'users.last_name as lastName'
			])->first(),

			'items' => $event->items()->orderBy('name')->get([
				'items.id',
				'items.name',
				'items.amount',
				'event_item.required'
			]),

			'users' => $event->users()->orderBy('last_name')->get([
				'users.id',
				'users.fresher',
				'users.email',
				'users.first_name as firstName',
				'users.last_name as lastName',
				'event_user.attended'
			])
		];
	}
}
