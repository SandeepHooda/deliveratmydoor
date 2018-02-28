APP.CONTROLLERS.controller ('CTRL_HOME',['$scope','$ionicSideMenuDelegate','$http','$rootScope','appData',
    function($scope,$ionicSideMenuDelegate, $http, $rootScope,appData ){
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
	//cordova plugin add cordova-plugin-whitelist
	//cordova plugin add cordova-plugin-contacts-phonenumbers
	//cordova plugin add https://github.com/boltex/cordova-plugin-powermanagement
	//cordova plugin add https://github.com/katzer/cordova-plugin-local-notifications de.appplant.cordova.plugin.local-notification
	
	$scope.name ="Sandeep";
	$scope.showMenu = function () {
	    $ionicSideMenuDelegate.toggleLeft();
	  };
	  $scope.emitSMSEvent = function(){
		  $scope.$emit('sendSMS');
	  }
	  $rootScope.$on('sendSMS',function(){
			alert('response received')
		});
	
	  $scope.callHttp = function(){
		  $http.get(appData.getHost()+'/ws/poc/pocendpoint').then(function(response){
				if (response.data.showButtonFlag){
					$scope.name = response.data.showButtonFlag;
					
				}
				$scope.emitSMSEvent();

				},function(response){
					alert('response received:: failure')
				});
		  	
		}
	  }
	 
])