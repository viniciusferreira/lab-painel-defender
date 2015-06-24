<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;


class DatabaseSeeder extends Seeder
{
    protected $toTruncate=['testes'];
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        foreach ($this->toTruncate as $table) {
            DB::table($table)->truncate();
            # code...
        }

        $this->call('RolesTableSeeder');
        $this->call('PermissionsTableSeeder');
        $this->call('UsersTableSeeder');
//user@resultsystems.com
//        $this->call('TestesTableSeeder');

        Model::reguard();
    }
}
