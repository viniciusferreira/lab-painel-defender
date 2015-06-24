<?php

namespace ResultSystems\Emtudo\Models;

use Illuminate\Database\Eloquent\Model;

class ProdutoMarca extends Model {
	protected $table="produto_marca";
	protected $primaryKey='idMarca';
	public $timestamps = false;
	public function produto() {
    	return $this->belongToMany('ResultSystems\Emtudo\Produto','idMarca','idMarca');
	}
}
