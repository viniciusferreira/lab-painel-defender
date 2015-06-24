<?php

namespace ResultSystems\Emtudo\Models;

use Illuminate\Database\Eloquent\Model;

class ProdutoCategoria extends Model {
	protected $table="produto_categoria";
	protected $primaryKey='idCategoria';
	public $timestamps = false;
	public function categoriaPai() {
    	return $this->hasMany('ResultSystems\Emtudo\Models\ProdutoCategoria','idCategoria','idCategoriaPai')
    			->with('categoriaPai');
	}
	public function produto() {
    	return $this->belongToMany('ResultSystems\Emtudo\Product\Models\Product','idCategoria','idCategoria');
	}
}
