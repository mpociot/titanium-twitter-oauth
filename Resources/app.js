Titanium.UI.setBackgroundColor('#000');

var TEST_SUITE 	= 'twitter';
var RUNAPP	 	= false;

var runApp = (typeof(RUNAPP)!='undefined') ? RUNAPP : false;
if( runApp ){
	// Create a simple window 
	var win = Titanium.UI.createWindow({  
	    title:'Twitter OAuth',
	    backgroundColor:'#fff'
	});
	win.open();
	var button	= Ti.UI.createButton({
		title: 'Tweet',
		top: 10,
		left: 10,
		width: 100,
		height: 50
	});
	win.add(button);
	
	var apiKey		= 'api Key';
	var apiSecret	= 'api Secret';
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
} else {
	// Run test suite
	var win = Ti.UI.createWindow();
	win.add(Ti.UI.createLabel({
		text:'Unit tests in progress - check the console for details.',
		color:'#787878',
		bottom:20,
		right:10,
		left:10,
		font:{fontSize:12},
		height:'auto',
		textAlign:'center'
	}));
	win.open();
	
	//Include tests
	Ti.include(
		'/tests/helium.js',
		'/tests/twitter.js'
	);
	var suite = (typeof(TEST_SUITE)!='undefined') ? TEST_SUITE : '';
	he.test.run(suite);
}