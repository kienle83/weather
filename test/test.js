describe('test', function() {
    var $controller, $compile, $scope;

    beforeEach(module('app'));

    beforeEach(inject(function(_$controller_, _$compile_, _$rootScope_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
    }));


    describe('sum', function() {
        it('1 + 1 should equal 2', function() {
            var $scope = {};
            var controller = $controller('WeatherController', { $scope: $scope });

            $scope.x = 1;
            $scope.y = 2;
            $scope.sum();

            expect($scope.z).toBe(3);
        });


        // it('should render div with id header', function() {
        //         var html = '<div id="header">{{selectedZipcode}}</div>';
        //         var elem = angular.element(html);  // turn html into an element object
        //         $compile(elem)($scope); // compile the html
        //         $scope.$digest();  // update the scope
        //         expect(elem.text()).toBe($scope.selectedZipcode);  //test to see if it was updated.
        // });

    });

    describe('sum2', function() {

        it('2 + 2 should equal 4', function() {
            var $scope = {};
            var controller = $controller('WeatherController', { $scope: $scope });

            $scope.x = 2;
            $scope.y = 2;
            $scope.sum();

            expect($scope.z).toBe(4);
        });

    });

    describe('render', function() {

        it('should at least one card show', function() {

            //var $scope = {};

            var controller = $controller('WeatherController', { $scope: $scope });

            var body = angular.element('<body></body>');
            var elem = angular.element('<div id="header"></div>');

            elem = $compile(elem)($scope);
            $scope.zipcodes = [{"zipcode":10178,"location":"Berlin","id":1111},{"zipcode":10179,"location":"Berlin","id":1112},{"zipcode":10245,"location":"Berlin","id":1113},{"zipcode":10247,"location":"Berlin","id":1114}];
            $scope.$digest();

            //console.log(body.find('.card').is(':visible'));
            console.log(elem.html());

            //expect($('.card').length).toBe(1);

        });

    });

});