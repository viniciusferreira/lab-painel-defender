app.controller('appTestesController', ['$scope', '$http', '$filter',function($scope, $http, $filter) {
	$scope.alert=function(text) {
		alert(text);
	};
	$scope.copia=function(){
		$( "#alerta" ).clone().prependTo( "#result" );
		angular.copy($scope.origem, $scope.destino);
/*		$( ".cloneButtons" ).clone().prependTo( "#divSaveBottom" );
		$( ".cloneColumn" ).clone().prependTo( ".columnAdd" );
*/
	};
}]);
