angular.module("RFO", [])

.run(function($rootScope){
    $rootScope.progress = 1;
    $rootScope.department = null;
    
    $rootScope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if(phase == '$apply' || phase == '$digest') {
            if(fn && (typeof(fn) === 'function')) {
                fn();
                }
            } else {
            this.$apply(fn);
        }
    };
})

.filter('MoneyFormat',function(){
    return function(input){
        return formatDollarValue(input, true);
    }
})

.controller('SearchCtrl', function($scope, $rootScope){
    $scope.search = this;
    this.search_value = "";
})

.directive('onSearch', function($rootScope, $timeout){
    function onSearch(){
        if(this.searchTimer){
            $timeout.cancel(this.searchTimer);
        }

        this.searchTimer = $timeout(function(){

        $rootScope.$broadcast('DoSearch', "HELLO");
            
        }, 500);        
    }

    return{
        restrict : 'A',
        scope: {
            onSearch : "="
        },
        link: function($scope, $elem, $attr){
            $scope.searchTimer = null;
            $($elem).on('keydown', onSearch.bind($scope));
        }
    }
})

.controller('DepartmentCtrl', function($scope, $rootScope){
    $scope.department = this;

    this.department_id = null;

    this.nextStep = function(){
        if(!$scope.department.department_id) return;

        $rootScope.progress = 2;
    }
})

.controller('ResultCtrl', function($rootScope, $scope, $http){
    $scope.result_list = {
        catalog : [],
        recreate : []
    }

    $scope.showResult = false;
    $scope.searching = false;

    $scope.$on('DoSearch', function(event, search_value){
        $scope.search(search_value);
    });

    $scope.onCatalogClick = function(id){
        $rootScope.progress = 3;

        $('.rfo-result-wrapper').hide();
        $scope.showResult = false;
    }

    $scope.search = function(search_value){
        // Show searching loader
        $scope.searching = true;

        $('.rfo-result-wrapper').show();
        setTimeout(function(){
            $rootScope.safeApply(function(){                
                $scope.showResult = true;
            });
        },1);

        var response = {
                "success": true,
                "data": {
                    "catalog":
                    [
                        {
                            "name" : "Dell Laptop 15\"",
                            "price" : "1900",
                            "id" : 1
                        },
                        {
                            "name" : "iPhone Thunderbolt Cable",
                            "price" : "250",
                            "id" : 2
                        },
                        {
                            "name" : "Superman Figure",
                            "price" : "1300",
                            "id" : 3
                        },
                        {
                            "name" : "Eton Leung's Manliness",
                            "price" : "552",
                            "id" : 4
                        },
                        {
                            "name" : "ProcurifyLite Subscription",
                            "price" : "243",
                            "id" : 5
                        },
                        {
                            "name" : "Alcohol",
                            "price" : "5150",
                            "id" : 6
                        }
                    ],
                    
                    "recreate":
                    [
                        {
                            "id" : "9282"
                        },
                        {
                            "id" : "15223"
                        }
                    ]
                }
            };
        setTimeout(function(){
            $scope.result_list.catalog = response.data.catalog;
            $scope.result_list.recreate = response.data.recreate;
            
            setTimeout(function(){
                $rootScope.safeApply(function(){                
                    $scope.searching = false;
                });
            },1);
        }, 1000);
            


        // $http({method: 'GET', url: 'null'}).
        // success(function(response, status, headers, config) {
        //     if(!response.success) return;

        //     $scope.result_list.catalog = response.data.catalog;
        //     $scope.result_list.recreate = response.data.recreate;
            
        //     setTimeout(function(){
        //         $rootScope.safeApply(function(){                
        //             $scope.searching = false;
        //         });
        //     },1);
            
        // }).
        // error(function(response, status, headers, config) {

        // });
    }
})

.controller('CreateCtrl', function($scope, $rootScope){
    $scope.create = this;

    this.AddItem = function(){
        $rootScope.$broadcast('AddItem', {
            name : "Dell 15\" Laptop",
            price : 1500,
            quantity : 4
        });
    };

    this.prevStep = function(){
        $rootScope.progress = 2;
    }
})

.directive('uiSelectable', function($rootScope, $timeout){
    return{
        restrict : 'A',
        require: '?ngModel',
        link: function($scope, $elem, $attr, ngModel){
            $($elem).Selectable({
                onSelect: function(text, value){
                    if(!ngModel) return;
                    $rootScope.safeApply(function(){
                        ngModel.$setViewValue(value);
                    });
                }
            });
        }
    }
})

.controller('CartCtrl', function($scope, $rootScope){
    $scope.cart = this;

    this.expanded = true;
    this.items = [
        {
            name : "Dell 15\" Laptop",
            price : 1500,
            quantity : 4
        },
        {
            name : "Mac Book Pro",
            price : 1950,
            quantity : 15
        }
    ];

    $scope.$on('AddItem', function(e, item){
        $scope.cart.items.push(item);
        $rootScope.progress = 2;
    });

    this.ToggleCart = function(){
        this.expanded = !this.expanded;
    }

    this.deleteItem = function(index){
        $scope.cart.items.splice(index, 1);
    }
})


function formatDollarValue(value, hideSymbol){
    value = value.toString().replace("$", "");
    value = value.replace(",", "");
    if(isNumber(value)){
        return (!hideSymbol ? '$' : '') + parseFloat(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }else{
        return "";
    }
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}