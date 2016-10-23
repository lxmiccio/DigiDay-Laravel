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
      $table->integer('capacity')->unsigned();

      $table->text('description')->nullable();
      
      $table->boolean('disabled')->default(0);

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
