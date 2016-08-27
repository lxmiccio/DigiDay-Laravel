<?php
namespace App\Transformers;

use App\Item;
use League\Fractal;

class ItemTransformer extends Fractal\TransformerAbstract
{
	public function transform(Item $item)
	{
		return [
			'id' => $item->id,
			'name' => $item->name,
			'description' => $item->description,
			'amount' => $item->amount,

			'events' => $item->events()->orderBy('starting_date', 'desc')->get([
				'events.id',
				'name',
				'description',
				'starting_date as startingDate',
				'ending_date as endingDate',
				'maximum_partecipants as maximumPartecipants'
			])
		];
	}
}
