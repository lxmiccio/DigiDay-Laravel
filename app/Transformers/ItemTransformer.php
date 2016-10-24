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
			'amount' => $item->amount,
			'description' => $item->description,
			'disabled' => $item->disabled,

			'events' => $item->events()->orderBy('starting_date', 'desc')->get([
				'events.id',
				'events.name',
				'events.starting_date as startingDate',
				'events.ending_date as endingDate',
        'event_item.required'
			])
		];
	}
}
