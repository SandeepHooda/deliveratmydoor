APP.CONTROLLERS.controller ('CTRL_HOME',['$scope','$http','$rootScope','appData','$window',
    function($scope, $http, $rootScope,appData,$window ){
	//https://github.com/apache/cordova-plugin-geolocation
	//cordova plugin add phonegap-nfc 
	//cordova plugin add cordova-plugin-vibration
	//cordova plugin add https://github.com/katzer/cordova-plugin-email-composer.git#0.8.2
	//cordova plugin add https://github.com/cowbell/cordova-plugin-geofence
	//cordova plugin add cordova-plugin-vibration
	//cordova plugin add cordova-plugin-device-motion
	//cordova plugin add cordova-plugin-whitelist
	//cordova plugin add cordova-plugin-shake
	//cordova plugin add cordova-plugin-sms
	//cordova plugin add cordova-plugin-android-permissions@0.6.0
	//cordova plugin add cordova-plugin-tts
	//cordova plugin add https://github.com/macdonst/SpeechRecognitionPlugin org.apache.cordova.speech.speechrecognition
	//cordova plugin add https://github.com/SandeepHooda/Speachrecognization org.apache.cordova.speech.speechrecognition
	//cordova plugin add https://github.com/katzer/cordova-plugin-background-mode.git
//	cordova plugin add cordova-plugin-http
	//cordova plugin add cordova-plugin-contacts-phonenumbers
	//cordova plugin add https://github.com/boltex/cordova-plugin-powermanagement
	//cordova plugin add https://github.com/katzer/cordova-plugin-local-notifications de.appplant.cordova.plugin.local-notification
	$scope.product = { desc: 'Britania brown bread', price: 35, image :'https://i.imgur.com/JZnDv3j.jpg' };
	$scope.allProducts = [];
	  
	  $rootScope.$on('addToCart',function(event, product, qty){
		  appData.addToCart(product, qty);
		  $scope.$emit('itemAddedToCart');
		});
	  
	  
	
	  $scope.lauchBrowser = function(){
		  window.open('https://deliveratmydoor.appspot.com/easyday25/index.html#/menu/tab/home','_system');
	 
	  }
	  $scope.getAllProducts = function(){
		  
		 
			  $http.get(appData.getHost()+'/ws/shopID/1519981368108/allProducts')
		  		.then(function(response){
					$scope.allProducts = response.data.allproducts;
				
				},
				function(response){
					$scope.isPhone=true;
					//alert('Window location '+JSON.stringify($window.location))
					
				});
		  
			  
		 
		 
		  	
		}
	  
	  }
	 
])