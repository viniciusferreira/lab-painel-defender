var _urlBase='/wcli/novo/';
app.controller('appWarehousePersonController', ['$scope', '$http', '$filter',function(ng, aj, f) {
/*	var padrao={
		'arte_finalista_check':1,
		'cliente_check':1,
		'agenda_parceiro_check':1,
		'familiar_check':1,
		'fabricante_check':1,
		'fornecedor_check':1,
		'funcionario_check':1,
		'usuario_sistema_check':1,
		'vendedor_check':1
	}
*/	//Valores iniciais;
	var ng.person = {}; //new Object();
/*	ng.person = {
		'Nome':'Luciana Reis',
		'Cep':'38055260',
		'Numero':'60',
		'Endereco': 'Rua Gama',
		'Bairro':'Umuarama',
		'Cidade':'Uberaba',
		'Estado':'MG',
		'Telefone1':'3488041263',
		'Pessoa_Fisica':'2',
		'Correntista':'Nao',
		'individuo':{
			'CPF':'12945968614',
			'Sexo':'f'
		},
	}
*/	//ng.person.Pessoa_Fisica='1'; //tipo de pessoa
	//ng.person.sexo='m'; //Sexo
	//ng.person.Correntista='Nao'; //Correntista
	var ng.listPerson=_parceiro.data; //Pessoas
	var ng.reverse=true; //Ordem reversa
	var ng.endNotFound=false; //Não encontrou endereço
	ng.save=function(person) {
		var dataObj=angular.copy(person);
		if (dataObj.Pessoa_Fisica=='1') {
			//dataObj.individuo.CPF='';
			dataObj.rgie=dataObj.empresa.Inscricao_Estadual;
			dataObj.cnpjcpf=dataObj.empresa.CNPJ;
		} else {
			//dataObj.empresa.CNPJ='';
			dataObj.rgie=dataObj.individuo.RG;
			dataObj.cnpjcpf=dataObj.individuo.CPF;
		}
		var config = {
			'headers': {
				'X-CSRF-TOKEN': _token,
				'X-XSRF-TOKEN': _token
			}
		};
		//var dataObj  = JSON.parse(person);
		if (dataObj.idParceiro!=undefined) {
			var _method=aj.put;
			var _urlSave=_urlBase+'person/'+dataObj.idParceiro;
		} else {
			var _method=aj.post;
			var _urlSave=_urlBase+'person';
		}
		_method(_urlSave,dataObj,config).success(function(data, status, headers, config){
			$("#result").html(data);
			//alert(data);
			if (data.data.idParceiro!=person.idParceiro)
				ng.listPerson.push(data.data);
			_token=data._token;
			alert(_token);
			ng.person={};
			ng.person.Pessoa_Fisica=person.Pessoa_Fisica;
			//alert('Pessoa salva com sucesso!');
			if(typeof data.message === 'string' ) {
				alert(data.message);
			} else {
				var r = '';
				angular.forEach(data.message, function(value) {
					r=r+value+"\n";
				}, r);
				alert(r);
			};
		}).error(function(data, status, headers, config) {
			//alert(data);
			$("#result").html(data);
			if(typeof data === 'string' ) {
				alert(data);
			} else {
				var r = '';
				angular.forEach(data, function(value) {
					r=r+value+"\n";
				}, r);
				alert(r);
			};
		});
	};
	ng.edit=function(person) {
		person.individuo.Data_Nascimento=f('removeTime')(person.individuo.Data_Nascimento);
		person.individuo.Data_Nascimento=f('MysqlToDateBR')(person.individuo.Data_Nascimento);

		if (person.arte_finalista!=null)
			person.arte_finalista_check=true;
		if (person.cliente!=null)
			person.cliente_check=true;
		if (person.agenda_parceiro!=null)
			person.agenda_parceiro_check=true;
		if (person.familiar!=null)
			person.familiar_check=true;
		if (person.fabricante!=null)
			person.fabricante_check=true;
		if (person.fornecedor!=null)
			person.fornecedor_check=true;
		if (person.funcionario!=null)
			person.funcionario_check=true;
		if (person.usuario_sistema!=null)
			person.usuario_sistema_check=true;
		if (person.vendedor!=null)
			person.vendedor_check=true;

		ng.person=person;
	};
	ng.order=function(property) {
		ng.listPerson=f('orderBy')(ng.listPerson,property,ng.reverse);
		ng.reverse = !ng.reverse;
	};
	ng.cep=function(cep) {
		if(/^[0-9]{5}-?[0-9]{3}$/.test(cep))
		{
			ng.endNotFound=false;
			aj.get('http://viacep.com.br/ws/'+cep+'/json/').success(function(data){
		        if(data.erro)
		        {
		            ng.endNotFound = true;
			        $("#inputLogradouro").focus();
//			        ng.endereco = [];
		            return;
		        }
		        ng.person.Endereco = data.logradouro;
		        ng.person.Complemento = '';
		        ng.person.Numero = '';
		        ng.person.Bairro = data.bairro;
		        ng.person.Cidade = data.localidade;
		        ng.person.Estado = data.uf;
		        $("#inputNumero").focus();
			}).error(function(data, status, headers, config) {
	            ng.endNotFound = true;
			});
		}
	};
}]);
