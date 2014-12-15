(function() {
  var anoComienzo, anoFinal, sectirRApp, url;

  sectirRApp = angular.module('sectirRespuestaApp', ['sectirTableModule']);

  url = false;

  anoComienzo = false;

  anoFinal = false;

  sectirRApp.provider('sectirRespuestaConfigProvider', {
    set: function(myURL, myAnoComienzo, myAnoFinal) {
      url = myURL;
      anoComienzo = myAnoComienzo;
      return anoFinal = myAnoFinal;
    },
    $get: function() {
      return {
        getURL: function() {
          return url;
        },
        getAnos: function() {
          return {
            anoComienzo: anoComienzo,
            anoFinal: anoFinal
          };
        }
      };
    }
  });

  sectirRApp.directive('sectirApp', [
    "$compile", "sectirDataFactory", function($compile, SDF) {
      var isCompiled;
      isCompiled = false;
      return {
        restrict: "EA",
        controller: [
          "$http", "$scope", "sectirRespuestaConfigProvider", function($http, $scope, SRC) {
            var successFn;
            $scope.jsonData = false;
            $scope.anos = SRC.getAnos();
            $scope.datos = false;
            $scope.finalFunc = function() {
              return console.log(SDF.data);
            };
            successFn = function(data) {
              var arrayDatos, key, value, _ref;
              $scope.jsonData = data;
              arrayDatos = [];
              _ref = data.data;
              for (key in _ref) {
                value = _ref[key];
                arrayDatos.push(value);
              }
              return $scope.datos = arrayDatos;
            };
            $http.get(SRC.getURL()).then(successFn);
            $scope.settings = {
              table: {
                titlefield: "enunciado",
                typefield: "tipo",
                subqenun: "enunciadocomp"
              },
              input: {
                namefield: "enunciado",
                typefield: "tipo"
              }
            };
            if ($scope.anos) {
              $scope.settings.table.anocomienzo = $scope.anos.anoComienzo;
              $scope.settings.table.anofinal = $scope.anos.anoFinal;
            }
          }
        ],
        link: function(scope, element, attrs, ctrl) {
          var elm, funcCompile;
          elm = angular.element('<div sectir-pager\n    values="datos"\n    finalizeFunc ="finalFunc()"\n    settings = "settings"\n</div>');
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
