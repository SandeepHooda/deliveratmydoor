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
	$scope.filteredProducts = [];
	theCtrl.searchInput = "";
	if (!$rootScope.addToCartListner){
		$rootScope.addToCartListner =
		$rootScope.$on('addToCart',function(event, product, qty){
				  appData.addToCart(product, qty);
				  $scope.$emit('itemAddedToCart');
				});
	}
	
 $scope.getCurrentTime = function(){
	 let today = new Date();
 	let h = today.getHours();
 	let m = today.getMinutes();
 	let s = today.getSeconds();
	    m = $scope.checkTime(m);
	    s = $scope.checkTime(s);
	    let am_pm = " AM";
	    if (h>12){
	    	h -= 12;
	    	am_pm = " PM";
	    }
	 return h + ":" + m + ":" + s+am_pm;
 }
    $scope.startWatch = function() {
        $interval(function() {
        	
		    theCtrl.time= $scope.getCurrentTime();
		   
        }, 1000);
    }; 
    $scope.startWatch();
	 $scope.checkTime = function(i) {
	    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
	    return i;
	}
	
	  $scope.lauchBrowser = function(){
		  window.open('https://deliveratmydoor.appspot.com/easyday25/index.html#/menu/tab/home','_system');
	 }
	  
	  if (!$rootScope.refresh){
			$rootScope.refresh =
			$rootScope.$on('refreshPage',function(){
				location.reload();
			});
		}
	 
	  $scope.getAllProducts = function(){
		   $http.get(appData.getHost()+'/ws/shopID/1519981368108/allProducts')
		  		.then(function(response){
		  			theCtrl.refreshTime= $scope.getCurrentTime();
					$scope.allProducts = response.data.allproducts;
					$scope.filteredProducts = $scope.allProducts ;
					$scope.carouselSetup($scope.allProducts);
				},
				function(response){
					$scope.isPhone=true;
					//alert('Window location '+JSON.stringify($window.location))
					
				});
		  
		}
	  
	  /**
	   * This function takes user input 
	   * split the input by space
	   * look for all elements of search in product desc in any order -> case insensitive
	   */
	  theCtrl.filterProduts = function(){
		  
		  if (theCtrl.searchInput == ""){
			  $scope.filteredProducts = $scope.allProducts;
			  return;
		  }
		  let searchArray = theCtrl.searchInput.toLowerCase().split(" ");//split the input by space
		  
		   $scope.filteredProducts = 
				  	  _.filter($scope.allProducts, function(o) {//Search in all products in DB
				  		        let matchingProduct = true;
				  		      _.forEach(searchArray, function(search){ // look for all words in search string in any order and  case insensitive
				  		    	if (o.desc.toLowerCase().indexOf(search) < 0 ) {
				  		    		matchingProduct = false;
				  				}
				  		      });
						  		
				  		      if (matchingProduct) return o;
						  });
			 
		 
		  $scope.filteredProducts = _.without($scope.filteredProducts, undefined);
		  $scope.filteredProducts = _.without($scope.filteredProducts, null);
		 // console.log( JSON.stringify($scope.filteredProducts));
	  }
	  
	  //carousel 
	  $scope.carouselSetup = function (allProducts){
		  var carouselEleFocus=false;
		  targetUrl = "https://deliveratmydoor.appspot.com/easyday25/index.html#/menu/tab/home";
		  var text = "Diwali special offer limted time only. Buy one get 1 Free!";
		  for (let i=0;i<10;i++){
			 
			  $("#jcarouselItems").append('<li><a href="' + targetUrl + '" target="_blank"><img src="'+allProducts[i].image+'"  class="imageSize" BORDER="0"/></a></li>');
			  if ($window.location.host == ""){
				  $("#jcarouselTextItems").append('<li><div  class="productDesc SparkleAndroid">'+(i+1)+". "+text+' </div></li>');
			  }else {
				  $("#jcarouselTextItems").append('<li><div  class="productDesc Sparkle">'+(i+1)+". "+text+' </div></li>');
			  }
			  
			
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