<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
  /**
  * Run the migrations.
  *
  * @return void
  */
  public function up()
  {
    Schema::create('users', function (Blueprint $table) {
      $table->increments('id');

      $table->string('fresher')->unique();

      $table->string('first_name');
      $table->string('last_name');
      $table->string('email')->unique();
      $table->string('password');

      $table->date('birthdate');
      $table->string('sex');

      $table->string('image')->nullable();

      $table->string('confirmation_token');
      $table->boolean('confirmed')->default(0);

      $table->timestamps();
    });
  }

  /**
  * Reverse the migrations.
  *
  * @return void
  */
  public function down()
  {
    Schema::drop('users');
  }
}
