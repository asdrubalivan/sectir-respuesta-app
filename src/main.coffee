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

sectirRApp.directive 'sectirApp', ["$compile", ($compile) ->
    isCompiled = false
    {
        restrict: "EA"
        controller: ["$http","$scope", "sectirRespuestaConfigProvider", ($http, $scope , SRC) ->
            $scope.jsonData = false
            $scope.datos = false
            $scope.finalFunc = ->
                #Empty
            successFn = (data)->
                $scope.jsonData = data
                arrayDatos = []
                for value of data.data
                    arrayDatos.push(data.data[value])
                $scope.datos = arrayDatos
            $http.get(SRC.getURL())
                .then(successFn)
            return
        ]
        link: (scope, element, attrs, ctrl) ->
            elm = angular.element '''
            <div sectir-pager
                values="datos"
                finalizeFunc ="finalFunc"
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
