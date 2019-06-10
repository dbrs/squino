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

	//console.log('Will try to GET:' + this.url + '/v1/conversations/'+conversationID+'.json')
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
	var workflowurl = this.url + '/v1/workflows/'+workflowId+'/conversations/'+conversationID+'.json';
	console.log (workflowurl);

	//-----------------------

	var headers = {
		'Content-Type': 'application/json'
	};

	var dataString = '{}';

	var options = {
		url: workflowurl,
		method: 'POST',
		headers: headers,
		body: dataString,
		auth: {
			'user': this.key,
			'pass': 'x'
		}
	};

	function callback(error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log(body);
		} else {
            var err = err || new Error('ERRORRRRR: '+response.statusCode);
            if (cb) return cb(err);
				return err;
		}
	}

	request(options, callback);


	//-----------------------

}


module.exports = HelpScoutAPI;
