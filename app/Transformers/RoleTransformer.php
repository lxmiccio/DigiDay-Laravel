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
				'fresher',
				'first_name as firstName',
				'last_name as lastName',
				'email',
				'image',
			])
		];
	}
}
