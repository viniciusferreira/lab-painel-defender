var _urlBase='/wcli/novo/';

app.controller('appPersonController', ['$scope', '$http', '$filter',function(ng, aj, f) {


    //Variaveis relatório
	ng.qtdPage=_parceiro.per_page;
	ng._to=_parceiro.to;
	ng._from=_parceiro.from;
	ng._current_page=_parceiro.current_page;
	ng._last_page=_parceiro.last_page;
	ng._total=_parceiro.total;

	//Valores iniciais;
	ng.person = {}; //new Object();
	ng.view = {}; //new Object();
	ng.person.Pessoa_Fisica='1'; //tipo de pessoa
	//ng.person.sexo='m'; //Sexo
	//ng.person.Correntista='Nao'; //Correntista
	ng.listPerson=_parceiro.data; //Pessoas
	ng.reverse=true; //Ordem reversa
	ng.endNotFound=false; //Não encontrou endereço
    angular.forEach(ng.listPerson, function (item) {
		if (item.individuo!=null) {
			item.cnpjcpf=item.individuo.CPF;
			item.rgie=item.individuo.RG;
		} else if (item.empresa!=null) {
			item.cnpjcpf=item.empresa.CNPJ;
			item.rgie=item.empresa.Inscricao_Estadual;
		} else {
			item.cnpjcpf='';
			item.rgie='';
		}
    });
	ng.filterPage=function(url,id){
		url=url+'?total='+id;
		if (id!=_parceiro.per_page)
			location.href=url;
	};
	ng.save=function(person) {
		var config = {
			'headers': {
				'X-CSRF-TOKEN': _token,
				'X-XSRF-TOKEN': _token
			}
		};
		//var dataObj  = JSON.parse(person);
		if (person.idParceiro!=undefined) {
			var _method=aj.put;
			var _urlSave=_urlBase+'person/'+person.idParceiro;
		} else {
			var _method=aj.post;
			var _urlSave=_urlBase+'person';
		}
		_method(_urlSave,person,config).success(function(data, status, headers, config){
			$("#result").html(data);
			//alert(data);
			if (data.data.idParceiro!=person.idParceiro)
				ng.listPerson.push(data.data);
			_token=data._token;
			ng.person={};
			ng.person.Pessoa_Fisica=person.Pessoa_Fisica;
			//alert('Pessoa salva com sucesso!');
			if(typeof data.message === 'string' ) {
				swal({   title: "Sucesso!",
					text: data.message,
					timer: 3000,
					showConfirmButton: true,
					type: "success"
				});
//				alert(data.message);
			} else {
				var r = '';
				angular.forEach(data.message, function(value) {
					r=r+value+"\n";
				}, r);
				swal({   title: "Sucesso!",
					text: r,
					timer: 3000,
					showConfirmButton: true,
					type: "success"
				});
//				alert(r);
			};
		}).error(function(data, status, headers, config) {
			//alert(data);
			$("#result").html(data);
			if(typeof data === 'string' ) {
				sweetAlert("Oops...", data, "error");
			} else {
				var r = '';
				angular.forEach(data, function(value) {
					r=r+value+"\n";
				}, r);
				sweetAlert("Oops...", r, "error");
			};
		});
	};
	ng.delails=function(person){
		ng.view=angular.copy(person);
	};
	ng.del=function(person) {
		swal({  title: 'Tem certeza que deseja excluir: '+person.Nome+'?',
				text: 'Você não será capaz de recuperar novamente este cadastro!',
				type: "warning",
				showCancelButton: true,
				cancelButtonText: "Cancelar",
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "Sim, tenho certeza",
				closeOnConfirm: true
		}, function(){
			var config = {
				'headers': {
					'X-CSRF-TOKEN': _token,
					'X-XSRF-TOKEN': _token
				}
			};
			var _delete=_urlBase+'person/'+person.idParceiro;
			//alert(_delete);
			aj.delete(_delete,config).success(function(data, status, headers, config){
				//$("#result").html(data);
				_token=data._token;
				var index=ng.listPerson.indexOf(person);
				ng.listPerson.splice(index,1);
				ng.person={};
				ng.person.Pessoa_Fisica=person.Pessoa_Fisica;
				swal({   title: "Sucesso!",
					text: data.message,
					showConfirmButton: true,
					type: "success" }
				);
				//alert(data.message);
			}).error(function(data, status, headers, config) {
				$("#result").html(data);
				//alert(data);
				/* Act on the event */
			});
		});
	};
	ng.edit=function(person) {
		if (person.individuo!=null) {
			person.individuo.Data_Nascimento=f('removeTime')(person.individuo.Data_Nascimento);
			person.individuo.Data_Nascimento=f('MysqlToDateBR')(person.individuo.Data_Nascimento);
		}
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
		location.href="#addPerson";
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
		        if (data.logradouro!='')
		        	$("#inputNumero").focus();
		        else
			        $("#inputLogradouro").focus();
			}).error(function(data, status, headers, config) {
				sweetAlert("Oops...", data, "error");
//	        	alert(data);
			});
		}
	};
	ng.order('Nome');
}]);
