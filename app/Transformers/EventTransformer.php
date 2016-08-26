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
			'starting_date' => $event->starting_date,
			'ending_date' => $event->ending_date,
			'maximum_partecipants as maximumPartecipants' => $event->maximum_partecipants,

			'user' => $event->user()->get([
				'id',
				'fresher',
				'first_name as firstName',
				'last_name as lastName',
				'email',
				'image',
			])
			->first(),

			'users' => $event->users()->orderBy('last_name')->get([
				'id',
				'fresher',
				'first_name as firstName',
				'last_name as lastName',
				'email',
				'image',
			]),

			'classroom' => $event->classroom()->get([
				'id',
				'name',
				'maximum_partecipants as maximumPartecipants',
			])->first(),

			'topic' => $event->topic()->get([
				'id',
				'name'
			]),

			'items' => $event->items()->orderBy('name')->get([
				'items.id',
				'items.name',
				'items.amount',
				'items.required_amount as requiredAmount'
			])
		];
	}
}
