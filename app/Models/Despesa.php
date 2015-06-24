<?php

namespace ResultSystems\Emtudo\Models;

use Illuminate\Database\Eloquent\Model;

class Despesa extends Model {
	protected $table="despesa";
	protected $primaryKey='idDespesa';
	public $timestamps = false;
	public function conta() {
    	return $this->hasMany('ResultSystems\Emtudo\Account\Models\Account','idDespesa','idDespesa');
	}
	public function historicoCaixa() {
    	return $this->hasMany('ResultSystems\Emtudo\BoxHistory\Models\BoxHistory','idDespesa','idDespesa');
	}
}
