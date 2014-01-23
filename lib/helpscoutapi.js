var request = require( 'request');
var qs 		= require( 'querystring');

var HelpScoutAPI = function(url, key) 
{
  	if (!url) { url = 'https://api.helpscout.net'; }
  	if (!key) { throw new Error('key is required'); }
  	this.url = url;
  	this.key = key;
};

HelpScoutAPI.prototype.getConversation = function( conversationID, cb )
{	

	request.get (
		this.url + '/v1/conversations/'+conversationID+'.json',
		{
			'auth' : {
				'user' : this.key,
				'pass' : 'somesecret',
				'sendImmediately' : true
			}	
		},
		function( err, res, body )
		{			
			if (err || res.statusCode !== 200)	
           	{
               	err = err || new Error('Status Code:'+res.statusCode);
               	if (cb) return cb(err);
				return err;
           	}

			var obj = JSON.parse( body );

			if (cb) return cb(err, obj);   
		}
	);
}

HelpScoutAPI.prototype.executeWorkflow = function( workflowId, conversationID, cb )
{		
	request.post (
		this.url + '/v1/workflows/'+workflowId+'/conversations/'+conversationID+'.json',
		{
			'auth' : {
				'user' : this.key,
				'pass' : 'somesecret',
				'sendImmediately' : true
			}	
		},
		function( err, res, body )
		{
			if (err || res.statusCode !== 200)	
           	{
               	err = err || new Error('wrong credentials'+res.statusCode);
               	if (cb) return cb(err);
				return err;
           	}
           	           	
           	if (cb) return cb(err, body);
		}
	);
}


module.exports = HelpScoutAPI;
