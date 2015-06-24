/*;(function($)
{
	'use strict';
	$(document).ready(function()
	{
		var $tabs=$('a[data-toggle="tab"]'),
		manageHash = function()
		{
			$tabs.each(function() {
				if (this.hash === window.location.hash) {
					$(this).tab('show');
				}
			});
		};
		$tabs.on('click',function(){
			window.location.hash=this.hash;
		});
		$(window).on('hashchange',function()
		{
			manageHash();
		})
		if (window.location.hash==='#tabDetalheConta') {
			window.location.hash=$tabs[0].hash;
		}

	});
})(window.jQuery);
*/

app.controller('appContaController', ['$scope', '$http', '$filter',function(scope, http, filter) {
	//Variaveis relatório
	scope.qtdPage='';
	scope._to='';
	scope._from='';
	scope._current_page='';
	scope._last_page='';
	scope._total='';

	scope.qtdPage=_account.per_page;
	scope._to=_account.to;
	scope._from=_account.from;
	scope._current_page=_account.current_page;
	scope._last_page=_account.last_page;
	scope._total=_account.total;

	//Recebe dados
	scope.listAccount=_account.data;

	//Seta valores iniciais
	scope.reverse = true;
	scope.keepSelected=false;
	scope.vencimento='';
	scope.account={};
	scope.view={};
	scope.priceMin=0;
	scope.priceMax=0;
	scope.valueMin='';
	scope.valueMax='';
	scope.showValor=false;
	scope.typeColumn='adicional';

	//Ocultar/exibir colunas
	scope.hideValor=false;
	scope.hideJuros=false;
	scope.hideTotal=false;
	scope.hideMulta=true;
	scope.hideAdicional=false;
	scope.hideDataQuitar=true;
	scope.hideAcoes=false;
	scope.hideidOS=false;
	scope.hideNewAccount=true;
	//Trocar coluna
	scope.selectColumn=function(column) {
		scope.typeColumn=column;

	};
	//Filtro por data de vencimento
	scope.dataVencimentoChange=function(vencimento){
		var data='';
		try{
			data=vencimento.split("/").reverse().toString().replace(',','-').replace(',','-');
		} catch (e){
		}
		scope.account.DataVencimento=data;
	};
	scope.getValue=function(value){
		if (value>=0 && value!=null && value!='') {
			return value;
		}
		else
			return 0;
	};
	scope.getTotal=function(account){
		valor=scope.getValue(account.Valor);
		juros=scope.getValue(account.Juros);
		multa=scope.getValue(account.Multa);
		desconto=scope.getValue(account.Desconto);
		acrescimo=scope.getValue(account.Acrescimo);
		account.total=(parseFloat(valor)+parseFloat(juros)+parseFloat(multa)+parseFloat(acrescimo)-parseFloat(desconto));
		return account.total;
	};
	scope.valueMinChange=function(valor){
		scope.priceMin=valor.replace(',','.');
		if (scope.priceMin==='')
			scope.priceMin=0;
	};
	scope.valueMaxChange=function(valor){
		scope.priceMax=valor.replace(',','.');
		if (scope.priceMax==='')
			scope.priceMax=0;
	};
	scope.getAccountValue=function(account){
		value=filter('number')(account.Valor,2);
		return value.replace('.',',');
	}
	scope.priceRange = function(item) {
		if (parseInt(scope.priceMax)===0) {
			return (parseFloat(item['Valor']) >= parseFloat(scope.priceMin));
		} else {
			return (parseFloat(item['Valor']) >= parseFloat(scope.priceMin) && parseFloat(item['Valor']) <= parseFloat(scope.priceMax));
		}
	};
	scope.showUrl=function(url,id){
		location.href=url+'/'+id;
	};
	scope.details=function(account){
		scope.view=angular.copy(account);
	};
	scope.personDetails=function(person){
		scope.view=angular.copy(person);
	};
	scope.filterPage=function(url,id){
		url=url+'?total='+id;
		if (id!=_account.per_page)
			location.href=url;
	};
	scope.order=function(property)
	{
/*		$( ".startHidden" ).addClass( "hidden" );
		$( ".loading" ).removeClass( "hidden" );
*/		scope.listAccount = filter('orderBy')(scope.listAccount,property,scope.reverse);
		scope.reverse = !scope.reverse;
	};
	scope.quitar=function(conta){
		var ids=[];
		if (conta!=='all') {
			var urlPay=_urlPayAccount;
			ids.push(conta.idConta);
			var dataObj = {
				conta : conta
			};
		}
		else {
			var contas=[];
			var ids=[];
			var urlPay=_urlPayAccounts;
		    angular.forEach(scope.listAccount, function (item) {
		    	if (item.selected) {
    				contas.push(item);
    				ids.push(item.idConta);
		    	}
		    });
			var dataObj = {
				conta			: contas,
				dataIndividual	: scope.dataIndividual,
				dataQuitar		: scope.dataQuitar
			};
		}
		if (!ids[0]) {
			sweetAlert("Aviso!", "Você não selecionou nenhuma conta.", "warning");
			abort();
		}
		http.put(urlPay+'/'+ids.toString(),dataObj).success(function(data){
			$("#result").html(data);
		    angular.forEach(data.conta, function (conta) {
			    angular.forEach(scope.listAccount, function (item) {
			    	if (conta.idConta==item.idConta && conta.success==true) {
				  		var index = scope.listAccount.indexOf(item);
				  		scope.listAccount.splice(index,1);
			    	}
			    });
		    });
			showSuccess(data.message);
			//alert(data.message);
		}). error(function(data, status, headers, config) {
			$("#result").html(data);
			if(typeof data === 'string' ) {
				showError(data);
			} else {
				if(data.fatal===true) {
					showError(data);
					abort();
				}
				var r = '';
				angular.forEach(data, function(value) {
					r=r+value+"\n";
				}, r);
				showError(r);
			};
		});
	};
	scope.checkAll = function () {
	    if (scope.selectedAll) {
	        scope.selectedAll = true;
	    } else {
	        scope.selectedAll = false;
	    }
	    if (!scope.keepSelected)
		    angular.forEach(scope.listAccount, function (item) {
		        item.selected = false;
		    });
	    angular.forEach(filter('filter')(scope.listAccount, scope.conta), function (item) {
	        item.selected = scope.selectedAll;
	    });
	};
}]);
