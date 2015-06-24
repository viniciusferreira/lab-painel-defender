<?php namespace ResultSystems\Emtudo;

use Illuminate\Database\Eloquent\Model;

class Produto extends Model {
	protected $table="produto";
	protected $primaryKey='idProduto';
	public $timestamps = false;
	public function categoria() {
    	return $this->hasMany('ResultSystems\Emtudo\ProdutoCategoria','idCategoria','idCategoria');
	}
	public function fornecedorPrincipal() {
    	return $this->hasMany('ResultSystems\Emtudo\Person','idParceiro','idFornecedorPrincipal');
	}
	public function marca() {
    	return $this->hasMany('ResultSystems\Emtudo\ProdutoMarca','idMarca','idMarca');
	}
	public function fabricante() {
    	return $this->hasMany('ResultSystems\Emtudo\ProdutoFabricante','idFabricante','idFabricante');
	}
	public function planoConta() {
    	return $this->hasMany('ResultSystems\Emtudo\PlanoConta','idPlano','idPlanoConta');
	}
	public function os() {
    	return $this->hasMany('ResultSystems\Emtudo\OsProduto','idProduto','idProduto')->with('os');
	}
	public function orcamento() {
    	return $this->hasMany('ResultSystems\Emtudo\OrcamentoProduto','idProduto','idProduto')->with('orcamento');
	}
}
