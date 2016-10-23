<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
	protected $fillable = [
		'name', 'amount', 'description'
	];

	/**
	* The events that belong to the item.
	*/
	public function events()
	{
		return $this->belongsToMany('App\Event')->withPivot('required');
	}
}
