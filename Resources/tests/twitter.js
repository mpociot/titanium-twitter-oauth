(function() {
	// twitter api require
	var TwitterAPI		= require('/lib/twitter').twitterAPI;
	
	he.test.add({
		name:'Testing API constructor',
		suite:'twitter',
		unit: function() {
			var twitter 		= new TwitterAPI('apiKey', 'apiSecret');
			he.test.assert(twitter.consumerKey()=='apiKey','Testing consumerKey setter in constructor');
			he.test.assert(twitter.consumerSecret()=='apiSecret','Testing consumerSecret setter in constructor');
			he.test.assert(twitter.consumerKey!='apiKey','no direct access to object instance variables');
			he.test.assert(twitter.consumerSecret!='apiSecret','no direct access to object instance variables');
		}
	});
	
	he.test.add({
		name: 'Testing API setter and getter',
		suite: 'twitter',
		unit: function(){
			var twitter 		= new TwitterAPI('', '');
			twitter.selectConsumerKey('apiKey');
			he.test.assert(twitter.consumerKey() == 'apiKey', 'Testing consumerKey setter');
			twitter.selectConsumerSecret('apiSecret');
			he.test.assert(twitter.consumerSecret() == 'apiSecret', 'Testing apiSecret setter');
			
			twitter.credentials('apiKey2','apiSecret2');
			he.test.assert(twitter.consumerKey() == 'apiKey2', 'Testing credentials function setter for consumerKey');
			he.test.assert(twitter.consumerSecret() == 'apiSecret2', 'Testing credentials function setter for consumerSecret');
		}
	});
	
})();