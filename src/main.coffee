sectirRApp = angular.module 'sectirRespuestaApp', [
    'sectirTableModule'
]

url = false

sectirRApp.provider 'sectirRespuestaConfigProvider',
    {
        set: (myURL) ->
            url = myURL
        $get: ->
            {
                getURL: ->
                    url
            }
    }

sectirRApp.directive 'sectirApp', ["$compile", "sectirDataFactory", ($compile, SDF) ->
    isCompiled = false
    {
        restrict: "EA"
        controller: ["$http","$scope", "sectirRespuestaConfigProvider", ($http, $scope , SRC) ->
            $scope.jsonData = false
            $scope.datos = false
            $scope.finalFunc = ->
                console.log SDF.data
            successFn = (data)->
                $scope.jsonData = data
                arrayDatos = []
                for key, value of data.data
                    arrayDatos.push value
                $scope.datos = arrayDatos
            $http.get(SRC.getURL())
                .then(successFn)
            $scope.settings = {
                table:
                    titlefield: "enunciado"
                    typefield: "tipo"
                    subqenun: "enunciadocomp"
                input:
                    namefield: "enunciado"
                    typefield: "tipo"

            }
            return
        ]
        link: (scope, element, attrs, ctrl) ->
            elm = angular.element '''
            <div sectir-pager
                values="datos"
                finalizeFunc ="finalFunc"
                settings = "settings"
            </div>
            '''
            funcCompile = ->
                if not isCompiled and scope.datos
                    isCompiled = true
                    compiled = $compile(elm)(scope)
                    element.append compiled
                return
            
            scope.$watch "datos", funcCompile , true
            return
    }
]

window.sectirRApp = sectirRApp
