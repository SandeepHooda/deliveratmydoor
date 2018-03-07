// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var APP = {};
APP.DIRECTIVE = angular.module('allDirective',[]);
APP.CONTROLLERS = angular.module('allControllers',[]);
APP.SERVICES = angular.module('allServices',[]);
APP.FACTORY = angular.module('allFact',[]);
APP.DEPENDENCIES = ['allControllers',
                    'allServices',
                    'allDirective',
                    'allFact'
                    ];
APP.OTHERDEPENDENCIES = ['ionic','ngCordova','nfcFilters','ionic-numberpicker'];
angular.module('starter', APP.DEPENDENCIES.concat(APP.OTHERDEPENDENCIES))
.config(['$urlRouterProvider','$stateProvider','$ionicConfigProvider',
         function($urlRouterProvider,$stateProvider,$ionicConfigProvider){
	$ionicConfigProvider.tabs.position('bottom');
	 // setup an abstract state for the tabs directive
				$stateProvider.state('menu',{
					url:'/menu',
					abstract: true,
					templateUrl:'menu.html'	
					 
					
				}).state('menu.address',{
					url:'/address',
					templateUrl: 'address/address.html',
					controller: 'CTRL_ADDRESS'
				}).state('menu.tab',{
					url:'/tab',
					abstract: true,
					templateUrl:'tabs.html'	
					 
					
				}).state('menu.tab.home',{
					url:'/home',
					views: {
						 'tab-home': {
						 templateUrl: 'home/home.html',
						 controller: 'CTRL_HOME'
						 }
					}	
					
				}).state('menu.tab.checkout',{
					url:'/checkout',
					views: {
						 'tab-checkout': {
						 templateUrl: 'checkout/checkout.html',
						 controller: 'CTRL_CheckOut'
						 }
					}	
					
				}).state('menu.tab.cart',{
					url:'/cart',
					views: {
						 'tab-cart': {
						 templateUrl: 'cart/cart.html',
						 controller: 'CTRL_Cart'
						 }
					}	
					
				}).state('menu.tab.confirmation',{
					url:'/confirmation',
					views: {
						 'tab-confirmation': {
						 templateUrl: 'confirmation/confirmation.html',
						 controller: 'CTRL_confirmation'
						 }
					}	
					
				}).state('menu.tab.offers',{
					url:'/offers',
					views: {
						 'tab-offers': {
						 templateUrl: 'offers/offers.html',
						 controller: 'CTRL_offers'
						 }
					}	
					
				}).state('menu.tab.admin',{
					url:'/admin',
					views: {
						 'tab-admin': {
						 templateUrl: 'admin/admin.html',
						 controller: 'CTRL_admin'
						 }
					}	
					
				})
				$urlRouterProvider.otherwise('/menu/tab/home');
			}
         ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
