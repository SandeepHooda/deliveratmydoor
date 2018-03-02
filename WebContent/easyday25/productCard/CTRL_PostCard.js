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
		    setLabel: 'Set',  //Optional
		    closeLabel: 'Close',  //Optional
		    setButtonType: 'button-positive',  //Optional
		    closeButtonType: 'button-stable',  //Optional
		    callback: function (val) {    //Mandatory
		    	$scope.timePickerCallback(val);
		  }
		};
	
	$scope.timePickerCallback = function(val){
		console.log(val)
	}

	}
	 
])