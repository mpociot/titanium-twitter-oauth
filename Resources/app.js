Titanium.UI.setBackgroundColor('#000');
// Create a simple window 
var win = Titanium.UI.createWindow({  
    title:'Twitter OAuth',
    backgroundColor:'#fff'
});
win.open();

var apiKey		= 'api key';
var apiSecret	= 'api secret';
// Require twitter module
var TwitterAPI		= require('/lib/twitter').twitterAPI;

var twitter = 		new TwitterAPI(apiKey, apiSecret);
twitter.autoAuthorize(true);
twitter.deleteAccessToken();

// Set authorization callback
twitter.authCallback(function(){
	/**
	 * This function gets called every time you authorize 
	 * with the twitter api
	 */
	twitter.saveAccessToken();
});

// Set offline callback
twitter.offlineCallback(function(){
	/**
	 * This is a global offline / error callback which gets invoked
	 * when an API call fails
	 */
});

button.addEventListener('click',function(e){
	// Try to send a tweet
	twitter.send('POST','https://api.twitter.com/1/statuses/update.json',{
		status: 'Titanium Rocks'
	}, function(data){
		// Success callback
		Ti.API.info(data);
	},function(data){
		/**
		 * Custom error callback
		 * If no custom error callback is defined, the global
		 * will be fired (if set)
		 */
	});
	
	/**
	 * Check authentication status
	 * this doesn't get called, when autoAuthorize is set true
	 */
	if( !twitter.isAuthorized() ){
		twitter.authorize();
	}
	
});