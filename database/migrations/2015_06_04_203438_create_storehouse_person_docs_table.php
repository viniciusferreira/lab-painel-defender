<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWarehousePersonDocsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('warehouse_person_docs', function(Blueprint $table)
		{
 			$table->engine = 'InnoDB';
 			$table->bigInteger('warehouse_people_id')->unsigned();
			$table->string('value',45)->nullable()->index('value');
			$table->enum('type', array('cpf','rg','cnpj','ie','rs'))->index('type');
 			$table->foreign('warehouse_people_id')->references('id')->on('warehouse_people')->onDelete('cascade');
			$table->unique(['warehouse_people_id','type']);
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
		Schema::drop('warehouse_person_docs');
	}

}
