app.controller('appWarehousePersonController', ['$scope', '$http', '$filter',function($scope, $http, $filter) {
	//Abreviaturas
	var ng=$scope,
		aj=$http;
	//Valores iniciais;
	ng.person=[];
	ng.person.endereco=[];
	ng.person.person='1'; //tipo de pessoa
	ng.person.sexo='m'; //Sexo
	ng.person.correntista='nao'; //Sexo
	ng.listPerson=[]; //Pessoas
	ng.reverse=true; //Ordem reversa
	ng.endNotFound=false; //Não encontrou endereço
	ng.save=function(person) {
		if (person.person=='1') {
			person.rgie=person.ie;
			person.cnpjcpf=person.cnpj;
		} else {
			person.rgie=person.rg;
			person.cnpjcpf=person.cpf;
		}
		ng.listPerson.push(person);
		ng.person=[];
		ng.endereco=[];
		ng.person.person=person.person;
	};
	ng.edit=function(person) {
		ng.person=person;
	};
	ng.del=function(person) {
		var index=ng.listPerson.indexOf(person);
		ng.listPerson.splice(index,1);
		ng.person=[];
		ng.person.person='pj';
	};
	ng.order=function(property) {
		ng.listPerson=$filter('orderBy')(ng.listPerson,property,ng.reverse);
		ng.reverse = !ng.reverse;
	};
	ng.cep=function(endereco) {
		if(/^[0-9]{5}-?[0-9]{3}$/.test(endereco.cep))
		{
			ng.endNotFound=false;
			aj.get('http://viacep.com.br/ws/'+endereco.cep+'/json/').success(function(data){
		        if(endereco.erro)
		        {
		            ng.endNotFound = true;
			        $("#inputLogradouro").focus();
//			        ng.endereco = [];
		            return;
		        }
		        ng.person.endereco = data;
		        $("#inputNumero").focus();
			}).error(function(data, status, headers, config) {
	            ng.endNotFound = true;
			});
		}
	};
}]);
