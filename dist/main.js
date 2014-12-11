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

  sectirRApp.directive('sectirApp', [
    "$compile", function($compile) {
      return {
        controller: [
          "$http", "$scope", "sectirRespuestaConfigProvider", function($http, $scope, SRC) {
            var successFn;
            $scope.jsonData = false;
            $scope.finalFunc = function() {};
            successFn = function(data) {
              var arrayDatos, value;
              $scope.jsonData = data;
              arrayDatos = [];
              for (value in data.data) {
                arrayDatos.push(value);
              }
              return $scope.datos = arrayDatos;
            };
            $http.get(SRC.getURL()).then(successFn);
          }
        ],
        link: function(scope, element, attrs, ctrl) {
          var elm;
          elm = angular.element('<sectir-page\n    values="jsonData"\n    finalizeFunc ="finalFunc"\n</sectir-pager>');
          return scope.$watch("jsonData", function() {
            var compiled;
            element.html('');
            compiled = $compile(elm)(scope);
            element.append(compiled);
          }, true);
        }
      };
    }
  ]);

  window.sectirRApp = sectirRApp;

}).call(this);
