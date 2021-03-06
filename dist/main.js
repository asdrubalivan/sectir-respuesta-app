(function() {
  var anoComienzo, anoFinal, sectirRApp, url, urlPost, urlRetorno;

  sectirRApp = angular.module('sectirRespuestaApp', ['sectirTableModule']);

  url = false;

  urlPost = false;

  anoComienzo = false;

  anoFinal = false;

  urlRetorno = false;

  sectirRApp.provider('sectirRespuestaConfigProvider', {
    set: function(data) {
      url = data.url;
      urlPost = data.urlPost;
      anoComienzo = data.anoComienzo;
      anoFinal = data.anoFinal;
      return urlRetorno = data.urlRetorno;
    },
    $get: function() {
      return {
        getURL: function() {
          return url;
        },
        getURLPost: function() {
          return urlPost;
        },
        getURLRetorno: function() {
          return urlRetorno;
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
          "$http", "$scope", "$window", "sectirRespuestaConfigProvider", function($http, $scope, $window, SRC) {
            var successFn, successPostFn;
            $scope.jsonData = false;
            $scope.anos = SRC.getAnos();
            $scope.datos = false;
            successPostFn = function(data, status) {
              var retorno;
              console.log(data);
              console.log(status);
              retorno = SRC.getURLRetorno();
              if (retorno) {
                $window.location.href = retorno;
              }
            };
            $scope.finalFunc = function() {
              var isConfirmed;
              console.log(SDF.data);
              isConfirmed = confirm('¿Desea terminar?\nLa encuesta no podrá volver a ser respondida');
              if (isConfirmed) {
                $http.post(SRC.getURLPost(), SDF.data).success(successPostFn);
              }
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
