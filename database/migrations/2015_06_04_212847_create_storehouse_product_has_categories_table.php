<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWarehouseProductHasCategoriesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('warehouse_product_has_categories', function(Blueprint $table)
		{
 			$table->engine = 'InnoDB';
 			$table->bigInteger('warehouse_products_id')->unsigned();
 			$table->bigInteger('warehouse_product_categories_id')->unsigned();
 			$table->foreign('warehouse_products_id','fk_wh_prod_id2')->references('id')->on('warehouse_products')->onDelete('cascade');
 			$table->foreign('warehouse_product_categories_id','fk_wh_prod_cat_id2')->references('id')->on('warehouse_product_categories')->onDelete('cascade');
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
		Schema::drop('warehouse_product_has_categories');
	}

}
