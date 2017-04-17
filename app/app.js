var app = angular.module('app', []);

app.controller('WeatherController', function($scope, $http) {

    /** Load cities list */
    $scope.numberCities = 5;

    // Default city is Berlin with this latitude and longitude
    $scope.currentPositionLat = 52.5243700;
    $scope.currentPositionLon = 13.4105300;

    $scope.apiUrl   = 'http://api.openweathermap.org/data/2.5/find';
    $scope.apiAppId = '86c0d18157e569c9f812762726a999b4';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            $scope.currentPositionLat = position.coords.latitude;
            $scope.currentPositionLon = position.coords.longitude;

            loadWeatherByPosition($scope.currentPositionLat, $scope.currentPositionLon, $scope.numberCities);

        }, function() {
            alert('can not load geo location where you now currently are so the default weather city is Berlin');
            loadWeatherByPosition($scope.currentPositionLat, $scope.currentPositionLon, $scope.numberCities);
        });
    }
    else
    {
        loadWeatherByPosition($scope.currentPositionLat, $scope.currentPositionLon, $scope.numberCities);
    }

    /**
     * Load weather data by position
     * @param positionLat
     * @param positionLon
     * @param numberCities
     */
    function loadWeatherByPosition(positionLat, positionLon, numberCities) {

        /**
         * positionLat, positionLon: current latitude and longitude of user
         * cnt: number of cities ('cnt') around this point (max is 50)
         * units metrics: Celsius (temperature)
         */
        $scope.loading = true;
        $http.get($scope.apiUrl + '?lat='+positionLat+'&lon='+positionLon+'&cnt='+numberCities+'&units=metric&appid=' + $scope.apiAppId).then(function(response) {
            $scope.cities = response.data.list;
            if ($scope.cities) {
                $scope.defaultCity = $scope.cities[0].id;
                $scope.selection = [$scope.cities[0].id];

                $scope.toggleSelection = function (cityId) {
                    var idx = $scope.selection.indexOf(cityId);

                    if (idx > -1) {
                        $scope.selection.splice(idx, 1);
                    } else {
                        $scope.selection.push(cityId);
                    }
                };
            }

            $scope.$watch('numberCities', function(newValue, oldValue) {
                if (newValue != oldValue) {
                    $scope.loading = true;
                    $http.get($scope.apiUrl + '?lat='+positionLat+'&lon='+positionLon+'&cnt='+newValue+'&units=metric&appid=' + $scope.apiAppId).then(function(response) {
                        $scope.cities = response.data.list;
                    }, function() {
                        $scope.loading = false;
                    }).finally(function() {
                        $scope.loading = false;
                    });
                }
            });

        },function() {
            alert('loading weather data error');
            $scope.loading = false;
        }).finally(function() {
            $scope.loading = false;
        });

    }

});