<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'fresher', 'password', 'email', 'first_name', 'last_name', 'image'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'confirmation_token',
    ];

    /**
     * Get the events for the user.
     */
    public function events()
    {
        return $this->hasMany('App\Event');
    }

    /**
     * Get the password resets for the user.
     */
    public function password_resets()
    {
        return $this->hasMany('App\PasswordReset');
    }

  	/**
  	* Get the events that the user attends.
  	*/
  	public function attendedEvents()
  	{
  		return $this->belongsToMany('App\Event');
  	}

    /**
     * Get the roles that belong to the user.
     */
    public function roles()
    {
        return $this->belongsToMany('App\Role');
    }

    /**
     * This mutator automatically hashes the password.
     *
     * @var string
     */
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = \Hash::make($value);
    }
}
