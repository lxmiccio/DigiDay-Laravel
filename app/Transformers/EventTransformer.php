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
			'description' => $event->description,
			'startingDate' => $event->starting_date,
			'endingDate' => $event->ending_date,
			'maximumPartecipants' => $event->maximum_partecipants,

			'user' => $event->user()->get([
				'users.id',
				'users.fresher',
				'users.first_name as firstName',
				'users.last_name as lastName',
				'users.email',
				'users.image',
			])
			->first(),

			'users' => $event->users()->orderBy('last_name')->get([
				'users.id',
				'users.fresher',
				'users.first_name as firstName',
				'users.last_name as lastName',
				'users.email',
				'users.image',
			]),

			'classroom' => $event->classroom()->get([
				'classrooms.id',
				'classrooms.name',
				'classrooms.maximum_partecipants as maximumPartecipants',
			])->first(),

			'topic' => $event->topic()->get([
				'topics.id',
				'topics.name'
			])->first(),

			'items' => $event->items()->orderBy('name')->get([
				'items.id',
				'items.name',
				'items.amount',
				'required_amount as requiredAmount'
			])
		];
	}
}
