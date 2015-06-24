<?php

namespace ResultSystems\Emtudo\Models;

use Illuminate\Database\Eloquent\Model;

class TipoServico extends Model {
	protected $table="tipo_servico";
	protected $primaryKey='idCategoria';
	public $timestamps = false;
	public function categoriaPai() {
    	return $this->hasOne('ResultSystems\Emtudo\Models\TipoServico','idCategoria','idCategoriaPai')->with('categoriaPai');
	}
}
