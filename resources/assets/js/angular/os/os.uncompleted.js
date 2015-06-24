app.controller('appOSController', ['$scope', '$http', '$filter',function(scope, http, filter) {
	//Variaveis relatório
	scope.qtdPage=_os.per_page;
	scope._to=_os.to;
	scope._from=_os.from;
	scope._current_page=_os.current_page;
	scope._last_page=_os.last_page;
	scope._total=_os.total;

	//Recebe dados
	scope.listOS=_os.data;

	//Seta valores iniciais
	scope.reverse = true;
	scope.keepSelected=false;
	scope.os=[];
	scope.view=_os.data[0];
	scope.osMin=0;
	scope.osMax=0;
	scope.personDetails=function(person){
		scope.view=angular.copy(person);
	};
	//Filtro por data de vencimento
	scope.dataOSChange=function(dt){
		var data='';
		try{
			data=dt.split("/").reverse().toString().replace(',','-').replace(',','-');
		} catch (e){
		}
		scope.os.Data=data;
	};
	scope.dataOSPrevistaChange=function(dt){
		var data='';
		try{
			data=dt.split("/").reverse().toString().replace(',','-').replace(',','-');
		} catch (e){
		}
		scope.os.DataPrevista=data;
	};
	scope.valueMinChange=function(valor){
		scope.osMin=valor.replace(',','.');
		if (scope.osMin==='')
			scope.osMin=0;
	};
	scope.valueMaxChange=function(valor){
		scope.osMax=valor.replace(',','.');
		if (scope.osMax==='')
			scope.osMax=0;
	};

	scope.osRange = function(item) {
		if (parseInt(scope.osMax)===0) {
			return (parseInt(item['idOS']) >= parseInt(scope.osMin));
		} else {
			return (parseInt(item['idOS']) >= parseInt(scope.osMin) && parseInt(item['idOS']) <= parseInt(scope.osMax));
		}
	};
	scope.showUrl=function(url,id){
		location.href=url+'/'+id;
	};
	scope.detalheOS=function(os){
		scope.view=os;
	};
	scope.filterPage=function(url,id){
		url=url+'?total='+id;
		if (id!=_os.per_page)
			location.href=url;
	};
	scope.order=function(property)
	{
/*		$( ".startHidden" ).addClass( "hidden" );
		$( ".loading" ).removeClass( "hidden" );
*/		scope.listOS = filter('orderBy')(scope.listOS,property,scope.reverse);
		scope.reverse = !scope.reverse;
	};
	scope.concluir=function(os){
		var ids=[];
		if (os!=='all') {
			ids.push(os.idOS);
		}
		else {
			var os=[];
			var ids=[];
		    angular.forEach(scope.listOS, function (item) {
		    	if (item.selected) {
    				os.push(item);
    				ids.push(item.idOS);
		    	}
		    });
		}
		var dataObj = {
			os : os
		};
		if (!ids[0]) {
			showWarning('Você não selecionou nenhuma OS.');
			abort();
		}
		http.put(_urlComplete+'/'+ids.toString(),dataObj).success(function(data){
		    angular.forEach(data.os, function (os) {
			    angular.forEach(scope.listOS, function (item) {
			    	if (os.idOS===item.idOS && os.success===true) {
				  		var index = scope.listOS.indexOf(item);
				  		scope.listOS.splice(index,1);
			    	}
			    });
		    });
			showSuccess(data.message);
		}). error(function(data, status, headers, config) {
			$("#result").html(data);
			if(typeof data === 'string' ) {
				showError(data);
			} else {
				if(data.fatal===true) {
					showError(data.message);
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
		    angular.forEach(scope.listOS, function (item) {
		        item.selected = false;
		    });
	    angular.forEach(filter('filter')(scope.listOS, scope.conta), function (item) {
	        item.selected = scope.selectedAll;
	    });
	};
}]);
