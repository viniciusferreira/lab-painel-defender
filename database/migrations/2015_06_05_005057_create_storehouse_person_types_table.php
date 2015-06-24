<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWarehousePersonTypesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('warehouse_person_types', function(Blueprint $table)
		{
 			$table->engine = 'InnoDB';
 			$table->bigInteger('warehouse_people_id')->unsigned();
 			$table->enum('type',['supplier','manufacturer','customer','employee']);
 			$table->foreign('warehouse_people_id')->references('id')->on('warehouse_people')->onDelete('cascade');
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
		Schema::drop('warehouse_person_types');
	}

}
