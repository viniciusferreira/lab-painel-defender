app.service('Responsavel',['$http', function (http) {
  var queries = [];

	return {
		filter: function (q) {
			var query = queryWith(q);
			return http({
				url: '/wcli/person/responsavel/' + query,
				cache: true
			});
		}
	};
	function queryWith(query) {
		for (var i = 0, len = queries.length; i < len; i++) {
			if (query.lastIndexOf(queries[i], 0) === 0) {
			  return queries[i];
			}
		}
		queries.push(query);
		return query;
	}
}])

app.controller('appPersonShowController', ['$scope', function(scope) {
	scope.view=_person;
}]);

app.controller('appPersonController', ['$scope','$http', '$filter', 'Responsavel', function appPersonController(scope, http, filter, Responsavel) {
	scope.queryHandler = function (q) {
		if (q.length>=2)
			Responsavel.filter(q).success(function (response) {
				scope.responsaveis = response;
			});
	};

	scope.getClass = function getClass(idx, list) {
		if (idx % 2 == 0) {
			return "gridPar";
		}else{
			return "gridImpar";
		}
	};
	scope.changeResponsavel=function(){
		$("#idResponsavel_value").val('');
		scope.selectedResponsavel=null;
		$("#idResponsavel_value").focus();
	};
		//Valores iniciais;
		scope.person = {}; //new Object();
		scope.view = {}; //new Object();
		scope.responsaveis = [];
		scope.selectedResponsavel=[];
	scope.reset=function()
	{
	}
	    //Variaveis relatório
		scope.qtdPage=_person.per_page;
		scope._to=_person.to;
		scope._from=_person.from;
		scope._current_page=_person.current_page;
		scope._last_page=_person.last_page;
		scope._total=_person.total;

	//Valores iniciais;
	scope.person.Pessoa_Fisica='1'; //tipo de pessoa
	//scope.person.sexo='m'; //Sexo
	//scope.person.Correntista='Nao'; //Correntista
	scope.listPerson=_person.data; //Pessoas
	scope.reverse=true; //Ordem reversa
	scope.endNotFound=false; //Não encontrou endereço
    angular.forEach(scope.listPerson, function (item) {
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
	scope.filterPage=function(url,id){
		url=url+'?total='+id;
		if (id!=_person.per_page)
			location.href=url;
	};
	scope.save=function(person) {
		if (person.empresa!=null) {
			try
			{
				person.empresa.idResponsavel=angular.copy(scope.selectedResponsavel.description.idParceiro);
			} catch (e){
				person.empresa.idResponsavel=0;
			}
		}
		var config = {
			'headers': {
				'X-CSRF-TOKEN': _token,
				'X-XSRF-TOKEN': _token
			}
		};
		//var dataObj  = JSON.parse(person);
		if (person.idParceiro!=undefined) {
			var _method=http.put;
			var _urlSave=_urlBase+'person/'+person.idParceiro;
		} else {
			var _method=http.post;
			var _urlSave=_urlBase+'person';
		}
		_method(_urlSave,person,config).success(function(data, status, headers, config){
			$("#result").html(data);
			//alert(data);
			if (data.data.idParceiro!=person.idParceiro)
				scope.listPerson.push(data.data);
			_token=data._token;
			scope.person={};
			scope.selectedResponsavel=[];
			scope.person.Pessoa_Fisica=person.Pessoa_Fisica;
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
	scope.delails=function(person){
		scope.view=angular.copy(person);
	};
	scope.del=function(person) {
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
			http.delete(_delete,config).success(function(data, status, headers, config){
				//$("#result").html(data);
				_token=data._token;
				var index=scope.listPerson.indexOf(person);
				scope.listPerson.splice(index,1);
				scope.person={};
				scope.person.Pessoa_Fisica=person.Pessoa_Fisica;
				showSuccess(data.message);
				//alert(data.message);
			}).error(function(data, status, headers, config) {
				if (data=='Unauthorized.')
					showWarning('Você não tem autorização para fazer isso');
				else {
					$("#result").html(data);
					showError(data);
				}
				/* Act on the event */
			});
		});
	};
	scope.edit=function(person) {
		if (person.empresa!=null) {
			if (person.empresa.responsavel!=null) {
				scope.selectedResponsavel.title=person.empresa.responsavel.Nome;
				scope.selectedResponsavel.description=angular.copy(person.empresa.responsavel);
			} else {
				scope.selectedResponsavel=[];
			}
		}
		if (person.individuo!=null) {
			person.individuo.Data_Nascimento=filter('removeTime')(person.individuo.Data_Nascimento);
			person.individuo.Data_Nascimento=filter('MysqlToDateBR')(person.individuo.Data_Nascimento);
		}
		if (person.arte_finalista!=null)
			person.arte_finalista_check=true;
		if (person.cliente!=null)
			person.cliente_check=true;
		if (person.agenda_person!=null)
			person.agenda_person_check=true;
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

		scope.person=person;
		location.href="#addPerson";
	};
	scope.order=function(property) {
		scope.listPerson=filter('orderBy')(scope.listPerson,property,scope.reverse);
		scope.reverse = !scope.reverse;
	};
	scope.cep=function(cep) {
		if(/^[0-9]{5}-?[0-9]{3}$/.test(cep))
		{
			scope.endNotFound=false;
			http.get('https://viacep.com.br/ws/'+cep+'/json/').success(function(data){
		        if(data.erro)
		        {
		            scope.endNotFound = true;
			        $("#inputLogradouro").focus();
//			        scope.endereco = [];
		            return;
		        }
		        scope.person.Endereco = data.logradouro;
		        scope.person.Complemento = '';
		        scope.person.Numero = '';
		        scope.person.Bairro = data.bairro;
		        scope.person.Cidade = data.localidade;
		        scope.person.Estado = data.uf;
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

	scope.reset();
	scope.order('Nome');
}]);
