<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventItemTable extends Migration
{
  /**
  * Run the migrations.
  *
  * @return void
  */
  public function up()
  {
    Schema::create('event_item', function (Blueprint $table) {
      $table->increments('id');

      $table->integer('event_id')->unsigned();
      $table->foreign('event_id')->references('id')->on('events')->onDelete('cascade');

      $table->integer('item_id')->unsigned();
      $table->foreign('item_id')->references('id')->on('items');

      $table->integer('required')->unsigned();

      $table->unique(array('event_id','item_id'));

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
    Schema::drop('event_item');
  }
}
