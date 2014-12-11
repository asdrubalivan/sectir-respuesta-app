sectirRApp = angular.module 'sectirRespuestaApp', [
    'sectirTableModule'
]

sectirRApp.controller 'sectirRespuestaCtrl', ["$http", "SECTIR_PREG_URL", ($http, SPU) ->
    $scope.jsonData = false
    successFn = (data)->
        $scope.jsonData = data
    $http.get(SPU)
        .then(successFn)
    return
]

window.sectirRApp = sectirRApp
