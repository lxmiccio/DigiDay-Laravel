<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration
{
  /**
  * Run the migrations.
  *
  * @return void
  */
  public function up()
  {
    Schema::create('events', function (Blueprint $table) {
      $table->increments('id');

      $table->string('name');
      $table->text('description')->nullable();

      $table->datetime('starting_date');
      $table->datetime('ending_date');

      $table->integer('maximum_partecipants')->unsigned();

      $table->integer('user_id')->unsigned();
      $table->foreign('user_id')->references('id')->on('users');

      $table->integer('classroom_id')->unsigned();
      $table->foreign('classroom_id')->references('id')->on('classrooms');

      $table->integer('topic_id')->unsigned();
      $table->foreign('topic_id')->references('id')->on('topics');

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
    Schema::drop('events');
  }
}
