sectirRApp = angular.module 'sectirRespuestaApp', [
    'sectirTableModule'
]

sectirRApp.provider 'sectirRespuestaConfig', ->
    @url = false
    {
        set: (myURL) ->
            @url = myURL
        $get: ->
            {
                getURL: ->
                    @url
            }
    }

sectirRApp.controller 'sectirRespuestaCtrl', ["$http","$scope", "sectirRespuestaConfig", ($http, $scope , SRC) ->
    $scope.jsonData = false
    successFn = (data)->
        $scope.jsonData = data
    $http.get(SRC.getUrl())
        .then(successFn)
    return
]

window.sectirRApp = sectirRApp
