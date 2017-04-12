var app = angular.module('app', ['ngMaterial']);

app.controller('WeatherController', function($scope, $http) {

    /** Load cities list */
    $scope.numberCities = 10;

    // Default city is Berlin with this latitude and longitude
    var currentPositionLat = 52.5243700,
        currentPositionLon = 13.4105300;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            currentPositionLat = position.coords.latitude;
            currentPositionLon = position.coords.longitude;

            loadWeatherByPosition(currentPositionLat, currentPositionLon, $scope.numberCities);

        }, function() {
            alert('can not load geo location where you now currently are so the default weather city is Berlin');
            loadWeatherByPosition(currentPositionLat, currentPositionLon, $scope.numberCities);
        });
    }
    else
    {
        loadWeatherByPosition(currentPositionLat, currentPositionLon, $scope.numberCities);
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
        $http.get('http://api.openweathermap.org/data/2.5/find?lat='+positionLat+'&lon='+positionLon+'&cnt='+numberCities+'&units=metric&appid=86c0d18157e569c9f812762726a999b4').then(function(response) {
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
                    $http.get('http://api.openweathermap.org/data/2.5/find?lat='+positionLat+'&lon='+positionLon+'&cnt='+newValue+'&units=metric&appid=86c0d18157e569c9f812762726a999b4').then(function(response) {
                        $scope.cities = response.data.list;
                    });
                }
            });

        },function() {
            alert('loading weather data error');
        });

    }


});