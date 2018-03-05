APP.CONTROLLERS.controller ('PostCard',['$scope',
    function($scope ){
	$scope.numberPickerObject = {
		    inputValue: 1, //Optional
		    minValue: 1,
		    maxValue: 100,
		    precision: 3,  //Optional
		    decimalStep: 0.25,  //Optional
		    format: "WHOLE",  //Optional - "WHOLE" or "DECIMAL"
		    unit: "",  //Optional - "m", "kg", "℃" or whatever you want
		    titleLabel: 'Quantity',  //Optional
		    setLabel: 'Add',  //Optional
		    closeLabel: 'Cancel',  //Optional
		    setButtonType: 'button-positive',  //Optional
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
		    titleLabel: 'Quantity',  //Optional
		    setLabel: 'Update',  //Optional
		    closeLabel: 'Remove',  //Optional
		    setButtonType: 'button-positive',  //Optional
		    closeButtonType: 'button-stable',  //Optional
		    callback: function (val) {    //Mandatory
		    	$scope.updateCartCallBack(val, $scope);
		  }
		};
	
	$scope.addCartCallback = function(val, $scope){
		if (val && val > 0){
			$scope.$emit('addToCart', $scope.productInfo, val);
		}
	}
	
	$scope.updateCartCallBack = function(val, $scope){
		if (val == undefined){
			val = 0;//Remove from cart
		}
		$scope.numberPickerUpdateObject.inputValue = val;
		$scope.$emit('updateCart', $scope.productInfo, val);
	}

	}
	 
])