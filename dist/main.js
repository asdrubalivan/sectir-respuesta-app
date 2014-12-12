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
      var isCompiled;
      isCompiled = false;
      return {
        restrict: "EA",
        controller: [
          "$http", "$scope", "sectirRespuestaConfigProvider", function($http, $scope, SRC) {
            var successFn;
            $scope.jsonData = false;
            $scope.datos = false;
            $scope.finalFunc = function() {};
            successFn = function(data) {
              var arrayDatos, value;
              $scope.jsonData = data;
              arrayDatos = [];
              for (value in data.data) {
                arrayDatos.push(data.data[value]);
              }
              return $scope.datos = arrayDatos;
            };
            $http.get(SRC.getURL()).then(successFn);
            $scope.settings = {
              table: {
                titlefield: "enunciado",
                typefield: "tipo"
              },
              input: {
                namefield: "enunciado",
                typefield: "tipo"
              }
            };
          }
        ],
        link: function(scope, element, attrs, ctrl) {
          var elm, funcCompile;
          elm = angular.element('<div sectir-pager\n    values="datos"\n    finalizeFunc ="finalFunc"\n    settings = "settings"\n</div>');
          funcCompile = function() {
            var compiled;
            if (!isCompiled && scope.datos) {
              isCompiled = true;
              compiled = $compile(elm)(scope);
              element.append(compiled);
            }
          };
          scope.$watch("datos", funcCompile, true);
        }
      };
    }
  ]);

  window.sectirRApp = sectirRApp;

}).call(this);
