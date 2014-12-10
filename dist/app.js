(function() {
  var sectirRApp;

  sectirRApp = angular.module('sectirRespuestaApp', ['sectirTableModule']);

  sectirRApp.controller('sectirRespuestaCtrl', [
    "$http", "SECTIR_PREG_URL", function($http, SPU) {
      var successFn;
      $scope.json = false;
      successFn = function(data) {
        return $scope.json = data;
      };
      return $http.get(SPU).then(successFn);
    }
  ]);

  window.sectirRApp = sectirRApp;

}).call(this);
