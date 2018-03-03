APP.SERVICES.service ('appData',['$window',
    function( $window){
	
	this.getHost = function () {
		var host = "https://deliveratmydoor.appspot.com";
		/*if ($window.location.host == ""){
			host = "phone";
			host = "https://deliveratmydoor.appspot.com";
		}else*/ if ($window.location.host.indexOf("localhost:8080") >=0 ){
			host = "";
		}
		return host;
	}
	
}

]);