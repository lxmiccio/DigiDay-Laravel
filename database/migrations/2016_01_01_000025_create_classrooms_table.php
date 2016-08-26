<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClassroomsTable extends Migration
{
  /**
  * Run the migrations.
  *
  * @return void
  */
  public function up()
  {
    Schema::create('classrooms', function (Blueprint $table) {
      $table->increments('id');

      $table->string('name')->unique();
      $table->text('description')->nullable();

      $table->integer('maximum_partecipants')->unsigned();

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
    Schema::drop('classrooms');
  }
}
