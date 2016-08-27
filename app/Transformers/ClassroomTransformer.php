<?php
namespace App\Transformers;

use App\Classroom;
use League\Fractal;

class ClassroomTransformer extends Fractal\TransformerAbstract
{
	public function transform(Classroom $classroom)
	{
		return [
			'id' => $classroom->id,
			'name' => $classroom->name,
			'description' => $classroom->description,
			'maximumPartecipants' => $classroom->maximum_partecipants,

			'events' => $classroom->events()->orderBy('starting_date')->get([
				'id',
				'name',
				'description',
				'starting_date as startingDate',
				'ending_date as endingDate',
				'maximum_partecipants as maximumPartecipants'
			])
		];
	}
}
