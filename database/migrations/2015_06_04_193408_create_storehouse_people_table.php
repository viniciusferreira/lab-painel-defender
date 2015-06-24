<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWarehousePeopleTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('warehouse_people', function(Blueprint $table)
		{
 			$table->engine = 'InnoDB';
			$table->bigIncrements('id')->unsigned();
			$table->string('name', 45)->index('name');
			$table->enum('person',['pf','pj']);
 			$table->bigInteger('created_by')->unsigned();
 			$table->bigInteger('updated_by')->unsigned();
			$table->timestamps();
			$table->softDeletes();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('warehouse_people');
	}

}
