<?php

namespace ResultSystems\Emtudo\Models;

use Illuminate\Database\Eloquent\Model;

class ProdutoOferta extends Model {
	protected $table="produto_oferta";
	protected $primaryKey='idProduto';
	public $timestamps = false;
	public function produto() {
    	return $this->belongToMany('ResultSystems\Emtudo\Produto','idProduto','idProduto');
	}
	public function parceiro() {
    	return $this->hasOne('ResultSystems\Emtudo\Person','idParceiro','idParceiro');
	}
}
