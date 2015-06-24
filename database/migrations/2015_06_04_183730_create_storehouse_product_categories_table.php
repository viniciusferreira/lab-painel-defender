<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWarehouseProductCategoriesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('warehouse_product_categories', function(Blueprint $table)
		{
 			$table->engine = 'InnoDB';
			$table->bigIncrements('id')->unsigned();
			$table->bigInteger('warehouse_product_categories_id')->unsigned();
			$table->string('name', 45)->index('name');
			$table->text('description');
 			$table->foreign('warehouse_product_categories_id','fk_wh_prod_cat_id')->references('id')->on('warehouse_product_categories');
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
		Schema::drop('warehouse_product_categories');
	}

}
