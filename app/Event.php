<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
  protected $fillable = [
    'name', 'description', 'starting_date', 'ending_date', 'maximum_partecipants'
  ];

  /**
  * Get the user that owns the event.
  */
  public function user()
  {
    return $this->belongsTo('App\User');
  }

  /**
  * Get the classroom that owns the event.
  */
  public function classroom()
  {
    return $this->belongsTo('App\Classroom');
  }

  /**
  * Get the topic that owns the event.
  */
  public function topic()
  {
    return $this->belongsTo('App\Topic');
  }

  /**
  * Get the users that belong to the event.
  */
  public function users()
  {
    return $this->belongsToMany('App\User');
  }

  /**
  * Get the items that belong to the event.
  */
  public function items()
  {
    return $this->belongsToMany('App\Item')->withPivot('required');
  }
}
