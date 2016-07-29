<?php
namespace App\Transformers;

use App\Topic;
use League\Fractal;

class TopicTransformer extends Fractal\TransformerAbstract
{
	public function transform(Topic $topic)
	{
	    return [
	        'id' => $topic->id,
	        'name' => $topic->name,
	        'description' => $topic->description,
	        'events' => $topic->events()->orderBy('starting_date', 'desc')->get()
	    ];
	}
}
