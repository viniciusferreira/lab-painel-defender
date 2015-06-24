<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	ResultSystems\Emtudo\Permission\Models\Roles::insert([
    			[
    			'name'=>'Administrador do Sistema',
    			'email'=>'admin@resultsystems.com',
    			'password'=>bcrypt('resultsystems')
    			'created_at'=>$date,
    			'updated_at'=>$date],
   			]
		);
    }
}
