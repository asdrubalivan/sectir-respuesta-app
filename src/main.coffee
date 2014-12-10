sectirRApp = angular.module 'sectirRespuestaApp', [
    'sectirTableModule'
]

sectirRApp.controller 'sectirRespuestaCtrl', ["$http", "SECTIR_PREG_URL", ($http, SPU) ->
    $scope.json = false
    successFn = (data)->
        $scope.json = data
    $http.get(SPU)
        .then(successFn)
    return
]

window.sectirRApp = sectirRApp
