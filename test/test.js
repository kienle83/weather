describe('WeatherTest', function() {
    var $controller, $compile, $scope, $httpBackend, $http;

    beforeEach(module('app'));

    beforeEach(inject(function(_$controller_, _$compile_, _$rootScope_, _$httpBackend_, _$http_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
        $httpBackend = _$httpBackend_;
        $http = _$http_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('Default Value', function() {

        it('should define controller', function() {
            var weatherController = $controller('WeatherController', {$scope: $scope});
            expect(weatherController).toBeDefined();
        });

        it('should return the number of cities and standard current location', function() {
            var controller = $controller('WeatherController', {$scope: $scope});

            // show name of 5 nearest cities
            expect($scope.numberCities).toBe(5);

            // standard location is Berlin if browser can not find current location
            expect($scope.currentPositionLat).toBe(52.5243700);
            expect($scope.currentPositionLon).toBe(13.4105300);
        });
    });

    describe('Render Element', function() {
        it('should render at least one checkbox and one card', function() {
            var controller = $controller('WeatherController', {$scope: $scope});

            var checkboxElm = $compile('<input type="checkbox" name="selectCities[]">')($scope);
            expect(checkboxElm.length).toBe(1);

            var cardElm = $compile('<div class="card">')($scope);
            expect(cardElm.length).toBe(1);
        });

    });

});