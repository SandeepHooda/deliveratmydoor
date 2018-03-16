APP.CONTROLLERS.controller ('CTRL_HOME',['$scope','$http','$rootScope','appData','$window','$interval','dataRestore','$ionicLoading',
    function($scope, $http, $rootScope,appData,$window,$interval,dataRestore, $ionicLoading ){
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
	theCtrl.notFoundProduct = "";
	theCtrl.notFoundProductList = [];
	$scope.product = { desc: 'Britania brown bread', price: 35, image :'https://i.imgur.com/JZnDv3j.jpg' };
	$scope.shopHasOffers = true;
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
	

	
	 
	  if (!$rootScope.refresh){
			$rootScope.refresh =
			$rootScope.$on('refreshPage',function(){
				location.reload();
			});
		}
	 
	  $scope.getAllProducts = function(){
		  $scope.showBusy();
		   $http.get(appData.getHost()+'/ws/shopID/'+appData.getShopID()+'/allProducts')
		  		.then(function(response){
		  			 $scope.hideBusy();
		  			$scope.allProducts = response.data.allproducts;
		  			$scope.allActiveProducts = [];
		  			for (var i=0;i<$scope.allProducts.length;i++){
		  				if ($scope.allProducts[i].productStatus == "Active"){
		  				//splice is "Not" safe here as when it removed a element the array repositions itself
		  					$scope.allActiveProducts.push($scope.allProducts[i]);
		  				}
		  			}
		  		
		  			$scope.allProducts = $scope.allActiveProducts;
					$scope.filteredProducts = $scope.allProducts ;
					$scope.carouselSetup($scope.allProducts);
					
				},
				function(response){
					 $scope.hideBusy();
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
		  var searchArray = theCtrl.searchInput.toLowerCase().split(" ");//split the input by space
		  
		   $scope.filteredProducts = 
				  	  _.filter($scope.allProducts, function(o) {//Search in all products in DB
				  		        var matchingProduct = true;
				  		      _.forEach(searchArray, function(search){ // look for all words in search string in any order and  case insensitive
				  		    	if (o.desc.toLowerCase().indexOf(search) < 0 ) {
				  		    		matchingProduct = false;
				  				}
				  		      });
						  		
				  		      if (matchingProduct) return o;
						  });
			 
		 
		  $scope.filteredProducts = _.without($scope.filteredProducts, undefined);
		  $scope.filteredProducts = _.without($scope.filteredProducts, null);
		  if ($scope.filteredProducts.length == 0){
			  theCtrl.notFoundProductTyping = theCtrl.searchInput;
			 if (theCtrl.notFoundProduct.indexOf(theCtrl.searchInput) >=0){
				 $scope.productNotFoundInformation(theCtrl.notFoundProduct);
			 }else {
				 //Still typing
				 theCtrl.notFoundProduct = theCtrl.notFoundProductTyping;
				 
			 }
			 
			  console.log( "customer is looking for "+theCtrl.searchInput);
		  }else {
			  theCtrl.notFoundProduct = "";
		  }
		  
	  }
	  
	  $scope.productNotFoundInformation = function(product){
		 
		  var informationSent = false;
		  for (var i=0;i<theCtrl.notFoundProductList.length;i++){
			  if (theCtrl.notFoundProductList[i] == product){
				  informationSent = true;
			  }
		  }
		  if (!informationSent){
			  theCtrl.notFoundProductList.push(product);
			
			  
			  $http.get(appData.getHost()+'/ws/shopID/'+appData.getShopID()+'/productNotFound/'+product)
		  		.then(function(response){
		  			
				},
				function(response){
					
					
				});
		  }
		  
	  }
	  //carousel 
	  $scope.carouselSetup = function (allProducts){
		  var carouselEleFocus=false;
		 
		 var offerItems = [];
		 $scope.shopHasOffers = false;
		  for (var i=0;i<allProducts.length;i++){
			  
			 if (allProducts[i].offer){
				 $scope.shopHasOffers = true;
				 offerItems.push(allProducts[i]);
				 $("#jcarouselItems").append('<li><a href="#/menu/tab/offers" target="_self"><img src="'+allProducts[i].image+'"  class="imageSize" BORDER="0"/></a></li>');
				  if ($window.location.host == ""){
					  $("#jcarouselTextItems").append('<li><div  class="productDesc SparkleAndroid">'+allProducts[i].offer+' </div></li>');
				  }else {
					  $("#jcarouselTextItems").append('<li><div  class="productDesc Sparkle">'+allProducts[i].offer+' </div></li>');
				  }
			 }
			 
			  
			
		  }
		  
		  appData.setOfferItems(offerItems);
		  dataRestore.saveInCache('offerItems', offerItems);
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
	  
	  //Busy icon
	  $scope.showBusy = function() {
		    $ionicLoading.show({
		      template: 'Please wait...',
		      duration: 60000
		    }).then(function(){
		       console.log("The loading indicator is now displayed");
		    });
		  };
		  $scope.hideBusy = function(){
		    $ionicLoading.hide().then(function(){
		       console.log("The loading indicator is now hidden");
		    });
		  };
	  
	  
	  }
		
	
	 
])