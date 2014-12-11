sectirRApp = angular.module 'sectirRespuestaApp', [
    'sectirTableModule'
]

sectirRApp.provider 'sectirRespuestaConfig', ->
    @url = false
    {
        set: (myURL) ->
            @url = myURL
        $get: ->
            @url
    }

sectirRApp.controller 'sectirRespuestaCtrl', ["$http","$scope", "sectirRespuestaConfig", ($http, $scope , SRC) ->
    $scope.jsonData = false
    successFn = (data)->
        $scope.jsonData = data
    $http.get(SRC.url)
        .then(successFn)
    return
]

window.sectirRApp = sectirRApp
