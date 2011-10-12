(function() {
	// twitter api require
	var TwitterAPI		= require('/lib/twitter').twitterAPI;
	// Constructor tests
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
	// Setter & Getter tests
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
			
			var result = twitter.authCallback('not a function');
			he.test.assert(result !== true, 'Testing authCallback setter accepting only functions');
			var result = twitter.authCallback(function(){});
			he.test.assert(result === true, 'Testing authCallback setter accepting only functions');
			
			var result = twitter.offlineCallback('not a function');
			he.test.assert(result !== true, 'Testing offlineCallback setter accepting only functions');
			var result = twitter.offlineCallback(function(){});
			he.test.assert(result === true, 'Testing offlineCallback setter accepting only functions');
			
			var result	= twitter.autoAuthorize('not boolean');
			he.test.assert(result !== true, 'Testing auto authorize setter only accepting boolean');
			var result	= twitter.autoAuthorize(true);
			he.test.assert(result === true, 'Testing auto authorize setter only accepting boolean');
		}
	});
	
	// API tests
	he.test.add({
		name: 'Testing twitter API functions based on the twitter online examples',
		suite: 'twitter',
		unit: function(){
			/**
			 * Example data taken from twitters OAuth example page 
			 */
			var exampleObject	= {
				oauth_callback : 'http://localhost:3005/the_dance/process_callback?service_provider_id=11',
				oauth_consumer_key : 'GDdmIQH6jhtmLUypg82g',
				oauth_nonce : 'QP70eNmVz8jvdPevU3oJD2AfF7R7odC2XJcn4XlZJqk',
				oauth_signature_method : 'HMAC-SHA1',
				oauth_timestamp : '1272323042',
				oauth_version : '1.0'
			};
			var consumerKey		= 'GDdmIQH6jhtmLUypg82g';
			var consumerSecret	= 'MCD8BKwGdgPHvAuvgvz4EQpqDAtx89grbuNMRd7Eh98';
			var twitter 		= new TwitterAPI(consumerKey,consumerSecret);
			var baseString	= twitter.buildBaseString('POST','https://api.twitter.com/oauth/request_token', exampleObject);
			var expectedBaseString = 'POST&https%3A%2F%2Fapi.twitter.com%2Foauth%2Frequest_token&oauth_callback%3Dhttp%253A%252F%252Flocalhost%253A3005%252Fthe_dance%252Fprocess_callback%253Fservice_provider_id%253D11%26oauth_consumer_key%3DGDdmIQH6jhtmLUypg82g%26oauth_nonce%3DQP70eNmVz8jvdPevU3oJD2AfF7R7odC2XJcn4XlZJqk%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1272323042%26oauth_version%3D1.0';
			he.test.assert(baseString === expectedBaseString,'Testing Base String function');
			
			var signingKey	= twitter.buildSigningKey('');
			var expectedSigningKey = 'MCD8BKwGdgPHvAuvgvz4EQpqDAtx89grbuNMRd7Eh98&';
			he.test.assert(signingKey === expectedSigningKey, 'Testing buildSigningKey function');
			
			var signature	= twitter.buildSignature(baseString,signingKey);
			var expectedSignature = '8wUi7m5HFQy76nowoCThusfgB+Q=';
			he.test.assert(signature === expectedSignature, 'Testing buildSignature function');
		}
	});
	
})();