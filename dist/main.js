(function() {
  var sectirRApp;

  sectirRApp = angular.module('sectirRespuestaApp', ['sectirTableModule']);

  sectirRApp.provider('sectirRespuestaConfig', function() {
    this.url = false;
    return {
      set: function(myURL) {
        return this.url = myURL;
      },
      $get: function() {
        return {
          getURL: function() {
            return this.url;
          }
        };
      }
    };
  });

  sectirRApp.controller('sectirRespuestaCtrl', [
    "$http", "$scope", "sectirRespuestaConfig", function($http, $scope, SRC) {
      var successFn;
      $scope.jsonData = false;
      successFn = function(data) {
        return $scope.jsonData = data;
      };
      $http.get(SRC.getUrl()).then(successFn);
    }
  ]);

  window.sectirRApp = sectirRApp;

}).call(this);
