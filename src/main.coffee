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

sectirRApp.controller 'sectirRespuestaCtrl', ["$http","$scope", "sectirRespuestaConfigProvider", ($http, $scope , SRC) ->
    $scope.jsonData = false
    successFn = (data)->
        $scope.jsonData = data
    $http.get(SRC.getURL())
        .then(successFn)
    return
]

window.sectirRApp = sectirRApp
