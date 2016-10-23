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
			'capacity' => $classroom->capacity,
			'description' => $classroom->description,
			'disabled' => $classroom->disabled,

			'events' => $classroom->events()->orderBy('starting_date', 'desc')->get([
				'id',
				'name',
				'starting_date as startingDate',
				'ending_date as endingDate',
			])
		];
	}
}
