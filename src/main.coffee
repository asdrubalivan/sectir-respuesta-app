sectirRApp = angular.module 'sectirRespuestaApp', [
    'sectirTableModule'
]

url = false
urlPost = false
anoComienzo = false
anoFinal = false
urlRetorno = false

sectirRApp.provider 'sectirRespuestaConfigProvider',
    {
        set: (data) ->
            url = data.url
            urlPost = data.urlPost
            anoComienzo = data.anoComienzo
            anoFinal = data.anoFinal
            urlRetorno = data.urlRetorno
        $get: ->
            {
                getURL: ->
                    url
                getURLPost: ->
                    urlPost
                getURLRetorno: ->
                    urlRetorno
                getAnos: ->
                    {
                        anoComienzo: anoComienzo
                        anoFinal: anoFinal
                    }
            }
    }

sectirRApp.directive 'sectirApp', ["$compile", "sectirDataFactory", ($compile, SDF) ->
    isCompiled = false
    {
        restrict: "EA"
        controller: ["$http","$scope", "$window" , "sectirRespuestaConfigProvider", ($http, $scope, $window , SRC) ->
            $scope.jsonData = false
            $scope.anos = SRC.getAnos()
            $scope.datos = false
            successPostFn = (data, status) ->
                console.log data
                console.log status
                retorno = SRC.getURLRetorno()
                if retorno
                    $window.location.href = retorno
                return
            $scope.finalFunc = ->
                console.log SDF.data
                isConfirmed = confirm '''¿Desea terminar?
                La encuesta no podrá volver a ser respondida
                '''
                if isConfirmed
                    $http.post(SRC.getURLPost(),SDF.data).
                        success(successPostFn)
                return
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
            if $scope.anos
                $scope.settings.table.anocomienzo =
                    $scope.anos.anoComienzo
                $scope.settings.table.anofinal =
                    $scope.anos.anoFinal
            return
        ]
        link: (scope, element, attrs, ctrl) ->
            elm = angular.element '''
            <div sectir-pager
                values="datos"
                finalizeFunc ="finalFunc()"
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
