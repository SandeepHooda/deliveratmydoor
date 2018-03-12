APP.CONTROLLERS.controller ('PostCard',['$scope', '$ionicLoading',
    function($scope, $ionicLoading ){
	$scope.numberPickerObject = {
		    inputValue: 1, //Optional
		    minValue: 1,
		    maxValue: 100,
		    precision: 3,  //Optional
		    decimalStep: 0.25,  //Optional
		    format: "WHOLE",  //Optional - "WHOLE" or "DECIMAL"
		    unit: "",  //Optional - "m", "kg", "℃" or whatever you want
		    titleLabel: 'Select Quantity',  //Optional
		    setLabel: 'Add',  //Optional
		    closeLabel: 'Cancel',  //Optional
		    setButtonType: 'button-balanced',  //Optional
		    closeButtonType: 'button-stable',  //Optional
		    callback: function (val) {    //Mandatory
		    	$scope.addCartCallback(val, $scope);
		  }
		};
	$scope.numberPickerUpdateObject =  {
		    inputValue: $scope.productInfo.qty, //Optional
		    minValue: 0,
		    maxValue: 100,
		    precision: 3,  //Optional
		    decimalStep: 0.25,  //Optional
		    format: "WHOLE",  //Optional - "WHOLE" or "DECIMAL"
		    unit: "",  //Optional - "m", "kg", "℃" or whatever you want
		    titleLabel: 'Update Quantity',  //Optional
		    setLabel: 'Update',  //Optional
		    closeLabel: 'Remove',  //Optional
		    setButtonType: 'button-balanced',  //Optional
		    closeButtonType: 'button-stable icon ion-trash-b',  //Optional
		    callback: function (val) {    //Mandatory
		    	$scope.updateCartCallBack(val, $scope);
		  }
		};
	
	$scope.addCartCallback = function(val, $scope){
		if (val && val > 0){
			$scope.$emit('addToCart', $scope.productInfo, val);
			$ionicLoading.show({
			      template: 'Item added to cart',
			      duration: 1100
			    })
		}
	}
	
	$scope.updateCartCallBack = function(val, $scope){
		if (val == undefined){
			val = 0;//Remove from cart
		}
		$scope.numberPickerUpdateObject.inputValue = val;
		 $ionicLoading.show({
		      template: 'Cart updated',
		      duration: 1100
		    })
		$scope.$emit('updateCart', $scope.productInfo, val);
	}

	}
	 
])