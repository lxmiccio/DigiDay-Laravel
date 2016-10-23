<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTopicsTable extends Migration
{
  /**
  * Run the migrations.
  *
  * @return void
  */
  public function up()
  {
    Schema::create('topics', function (Blueprint $table) {
      $table->increments('id');

      $table->string('name');

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
    Schema::drop('topics');
  }
}
