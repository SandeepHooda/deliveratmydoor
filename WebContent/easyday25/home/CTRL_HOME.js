APP.CONTROLLERS.controller ('CTRL_HOME',['$scope','$http','$rootScope','appData','$window','$interval',
    function($scope, $http, $rootScope,appData,$window,$interval ){
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
	
	var theCtrl = this;
	$scope.product = { desc: 'Britania brown bread', price: 35, image :'https://i.imgur.com/JZnDv3j.jpg' };
	$scope.allProducts = [];
	theCtrl.searchInput = "";
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
					$scope.carouselSetup($scope.allProducts);
				},
				function(response){
					$scope.isPhone=true;
					//alert('Window location '+JSON.stringify($window.location))
					
				});
		  
		}
	  
	  theCtrl.filterProduts = function(){
		  console.log(theCtrl.searchInput)
	  }
	  
	  //carousel 
	  $scope.carouselSetup = function (allProducts){
		  var carouselEleFocus=false;
		  targetUrl = "https://www.stockplanconnect.com/";
		  var text = "Diwali special offer limted time only.     ";
		  for (let i=0;i<10;i++){
			 
			  $("#jcarouselItems").append('<li><a href="' + targetUrl + '" target="_blank"><img src="'+allProducts[i].image+'"  class="imageSize" BORDER="0"/></a></li>');
			  $("#jcarouselTextItems").append('<li><div  class="productDesc Sparkle">'+(i+1)+". "+text+' </div></li>');
			
		  }
		  
		  
		  $('.jcarousel')
		    .jcarousel({
		   	 	wrap: 'circular',
		   	 	animation: {
			        duration: 200,
			        easing:   'linear',
			        complete: function() {
			    	}
			    }
		    })
		    .jcarouselAutoscroll({
		        target: '+=1',
		        interval: 7000
		    });
			 
		  $('.jcarouseText')
		    .jcarousel({
		   	 	wrap: 'circular',
		   	 	animation: {
			        duration: 200,
			        easing:   'linear',
			        complete: function() {
			    	}
			    }
		    })
		    .jcarouselAutoscroll({
		        target: '+=1',
		        interval: 7000
		    });
		  
			 $('.jcarousel-pagination')
	            .on('jcarouselpagination:active', 'a', function() {
	                $(this).addClass('active');
	            })
	            .on('jcarouselpagination:inactive', 'a', function() {
	                $(this).removeClass('active');
	            })
	            .jcarouselPagination();
	            
	            $('.jcarousel-control-prev')
				.on('jcarouselcontrol:active', function() {
					$(this).removeClass('inactive');
				})
				.on('jcarouselcontrol:inactive', function() {
					$(this).addClass('inactive');
				})
				.jcarouselControl({
					target: '-=1'
				});
				
				 $('.jcarousel-control-next')
				.on('jcarouselcontrol:active', function() {
					$(this).removeClass('inactive');
				})
				.on('jcarouselcontrol:inactive', function() {
					$(this).addClass('inactive');
				})
				.jcarouselControl({
					target: '+=1'
				});
				
	            
	            $('.jcarousel').on('jcarousel:visiblein', 'li', function(event, carousel) {
					if(carouselEleFocus)
				{
				$('.jcarousel').jcarousel('fullyvisible').children('a').focus();
				carouselEleFocus=false;
					
				}
				});
	            
		 
	  	}//carousel
	  
	  
	  }
		
	
	 
])