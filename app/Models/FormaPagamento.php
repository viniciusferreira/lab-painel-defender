<?php

namespace ResultSystems\Emtudo\Models;

use Illuminate\Database\Eloquent\Model;

class FormaPagamento extends Model {
	protected $table="forma_pagamento";
	protected $primaryKey='idFormaPagamento';
	public $timestamps = false;
	public function os() {
    	return $this->hasMany('ResultSystems\Emtudo\OS\Models\OS','idFormaPagamento','idFormaPagamento');
	}
	public function orcamento() {
    	return $this->hasMany('ResultSystems\Emtudo\Budget\Models\Budget','idFormaPagamento','idFormaPagamento');
	}
}
