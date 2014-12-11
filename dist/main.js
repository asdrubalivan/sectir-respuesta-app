(function() {
  var sectirRApp, url;

  sectirRApp = angular.module('sectirRespuestaApp', ['sectirTableModule']);

  url = false;

  sectirRApp.provider('sectirRespuestaConfigProvider', {
    set: function(myURL) {
      return url = myURL;
    },
    $get: function() {
      return {
        getURL: function() {
          return url;
        }
      };
    }
  });

  sectirRApp.controller('sectirRespuestaCtrl', [
    "$http", "$scope", "sectirRespuestaConfigProvider", function($http, $scope, SRC) {
      var successFn;
      $scope.jsonData = false;
      successFn = function(data) {
        return $scope.jsonData = data;
      };
      $http.get(SRC.getURL()).then(successFn);
    }
  ]);

  window.sectirRApp = sectirRApp;

}).call(this);
