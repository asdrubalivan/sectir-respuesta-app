(function() {
  var sectirRApp;

  sectirRApp = angular.module('sectirRespuestaApp', ['sectirTableModule']);

  sectirRApp.controller('sectirRespuestaCtrl', [
    "$http", "$scope", "SECTIR_PREG_URL", function($http, $scope, SPU) {
      var successFn;
      $scope.jsonData = false;
      successFn = function(data) {
        return $scope.jsonData = data;
      };
      $http.get(SPU).then(successFn);
    }
  ]);

  window.sectirRApp = sectirRApp;

}).call(this);
