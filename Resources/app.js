Titanium.UI.setBackgroundColor('#000');
// Create a simple window 
var win = Titanium.UI.createWindow({  
    title:'Twitter OAuth',
    backgroundColor:'#fff'
});
win.open();

var apiKey		= 'twitter-api-key';
var apiSecret	= 'twitter-api-secret';
// Require twitter module
var twitter		= require('/lib/twitter');

// Set API credentials 
twitter.credentials(apiKey,apiSecret);
twitter.deleteAccessToken();

// Set authorization callback
twitter.authCallback(function(){
	twitter.saveAccessToken();
});

// Try to send a tweet
twitter.send('POST','https://api.twitter.com/1/statuses/update.json',{
	status: 'UTF-8 seems to work too'
}, function(data){
	Ti.API.info(JSON.parse(data));
});

// Check login status
if( !twitter.isAuthorized() ){
	twitter.authorize();
}