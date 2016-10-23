<?php
namespace App\Transformers;

use App\Role;
use League\Fractal;

class RoleTransformer extends Fractal\TransformerAbstract
{
	public function transform(Role $role)
	{
		return [
			'id' => $role->id,
			'name' => $role->name,

			'users' => $role->users()->orderBy('last_name')->get([
				'users.id',
				'users.fresher',
				'users.email',
				'users.first_name as firstName',
				'users.last_name as lastName'
			])
		];
	}
}
