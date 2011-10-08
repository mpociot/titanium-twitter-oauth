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
twitter.deleteAccessToken();

// Set authorization callback
twitter.authCallback(function(){
	twitter.saveAccessToken();
});

// Try to send a tweet
twitter.send('POST','https://api.twitter.com/1/statuses/update.json',{
	status: 'This is awesome'
}, function(data){
	Ti.API.info(data);
});

// Check login status
if( !twitter.isAuthorized() ){
	twitter.authorize();
}