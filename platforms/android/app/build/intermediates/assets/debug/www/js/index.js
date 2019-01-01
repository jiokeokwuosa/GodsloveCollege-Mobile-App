var cvaReady;
var Ref;
(function() {
    
    var onDeviceReady = function() {
		console.log("Entering onDeviceReady");
		//Let the user know that the deviceReady event has fired
		//alert('ready');
		//Set the variable that lets other parts of the program
		//know that Cordova has initialized
		cvaReady = true;
		//===================================================
		//Do whatever other stuff you want to do on startup
		//===================================================
		console.log("Leaving onDeviceReady");
	};
    
	//add an event listener for the Cordova deviceReady event.
	document.addEventListener('deviceready', onDeviceReady, false);
    document.addEventListener('deviceready', startProcess, false);
    document.addEventListener('backbutton', goodbye, false);
}());

function checkConnection() {
	if (cvaReady) {
	   if(navigator.connection.type){
    		var networkState = navigator.connection.type;
    		var states = {};
    		states[Connection.UNKNOWN] = 'Unknown connection';
    		states[Connection.ETHERNET] = 'Ethernet connection';
    		states[Connection.WIFI] = 'WiFi connection';
    		states[Connection.CELL_2G] = 'Cell 2G connection';
    		states[Connection.CELL_3G] = 'Cell 3G connection';
    		states[Connection.CELL_4G] = 'Cell 4G connection';
    		states[Connection.CELL] = 'Cell generic connection';
    		states[Connection.NONE] = 'No network connection';
    		return states[networkState];
            
        }else{
            alert("Sorry the connection plugin is not supported");
            }    
	} else {
		alert("device is not ready");
	}
}

function startProcess(){
    if(checkConnection()=='No network connection'){
        navigator.notification.alert('No Network Connection',null,'Network Error','Close');    
        document.addEventListener('online', startProcess, false);
    }else{
       browser(); 
        
    }
}



function browser() {    
    var target = "_blank";
    var options = "location=no,hidden=yes, fullscreen=yes, zoom=no";
    Ref=cordova.InAppBrowser.open('https://www.google.com', target, options);
    Ref.addEventListener('loadstart', loadStartCallBack);
    Ref.addEventListener('loadstop', loadStopCallBack);
    Ref.addEventListener('loaderror', loadErrorCallBack);
    Ref.addEventListener('exit', goodbye);

}

function loadStartCallBack() {
    var loading = document.getElementById('loading');
    loading.style.display="";
}

function loadStopCallBack() {     
    show(); 
    var loading = document.getElementById('loading');
    loading.style.display="none"; 
    document.removeEventListener('deviceready', startProcess, false); 
         
}

function show(){
    Ref.show();
     
       
}

function loadErrorCallBack(params) {
    var loading = document.getElementById('loading');
    loading.style.display="none";
    navigator.notification.alert('Sorry, We could not connect to the webpage, check your network connection and try again.',startProcess,'Connection Error','Ok'); 
    Ref.close();  

}

function goodbye(){
     navigator.notification.confirm('Do you want to Exit?',doContinue,'Please Confirm',['Yes','No']);     
}

function doContinue(button){
  var buttonNum=button;
  if(buttonNum=="1" || buttonNum==1 && navigator.app){
    navigator.app.exitApp();
  }else if(buttonNum=="1" || buttonNum==1 && navigator.device){
    navigator.device.exitApp();
    }else if(buttonNum=="2" || buttonNum==2){
       document.addEventListener('deviceready', startProcess, false);
      }
}


