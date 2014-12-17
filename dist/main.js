(function() {
  var anoComienzo, anoFinal, sectirRApp, url, urlPost;

  sectirRApp = angular.module('sectirRespuestaApp', ['sectirTableModule']);

  url = false;

  urlPost = false;

  anoComienzo = false;

  anoFinal = false;

  sectirRApp.provider('sectirRespuestaConfigProvider', {
    set: function(data) {
      url = data.url;
      urlPost = data.urlPost;
      anoComienzo = data.anoComienzo;
      return anoFinal = data.anoFinal;
    },
    $get: function() {
      return {
        getURL: function() {
          return url;
        },
        getURLPost: function() {
          return urlPost;
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
            var successFn, successPostFn;
            $scope.jsonData = false;
            $scope.anos = SRC.getAnos();
            $scope.datos = false;
            successPostFn = function(data, status) {
              console.log(data);
              return console.log(status);
            };
            $scope.finalFunc = function() {
              console.log(SDF.data);
              return $http.post(SRC.getURLPost(), SDF.data).success(successPostFn);
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
