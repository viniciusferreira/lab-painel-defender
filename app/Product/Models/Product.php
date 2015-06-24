<?php

namespace ResultSystems\Emtudo\Product\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model {
	protected $table="produto";
	protected $primaryKey='idProduto';
	public $timestamps = false;
	public function categoria() {
    	return $this->hasMany('ResultSystems\Emtudo\Product\Models\ProdutoCategoria','idCategoria','idCategoria');
	}
	public function fornecedorPrincipal() {
    	return $this->hasMany('ResultSystems\Emtudo\Person\Models\Person','idParceiro','idFornecedorPrincipal');
	}
	public function marca() {
    	return $this->hasMany('ResultSystems\Emtudo\Product\Models\ProdutoMarca','idMarca','idMarca');
	}
	public function fabricante() {
    	return $this->hasMany('ResultSystems\Emtudo\Product\Models\ProdutoFabricante','idFabricante','idFabricante');
	}
	public function planoConta() {
    	return $this->hasMany('ResultSystems\Emtudo\PlanoConta','idPlano','idPlanoConta');
	}
	public function os() {
    	return $this->hasMany('ResultSystems\Emtudo\Os\Models\OsProduto','idProduto','idProduto')->with('os');
	}
	public function orcamento() {
    	return $this->hasMany('ResultSystems\Emtudo\OrcamentoProduto','idProduto','idProduto')->with('orcamento');
	}
}
