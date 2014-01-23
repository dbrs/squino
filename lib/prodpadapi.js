var request = require( 'request');
var qs 		= require( 'querystring');

var ProdPadAPI = function(url, key) 
{
  	if (!url) { url = 'https://app.prodpad.com'; }
  	if (!key) { throw new Error('key is required'); }
  	this.url = url;
  	this.key = key;
};

ProdPadAPI.prototype.createFeedback = function( name, email, about, feedback, cb )
{	
	var post_feedback_data = '{ "name" : "' + name + '", "email" : "' + email + '", "about" : "' + about + '", "feedback" : "' 
				+ feedback + '"}';

	request.post(
		{
			url: this.url + '/api/v1/feedback/create?apikey='+this.key, 
			body: post_feedback_data
		}, 
		function(err, res, body) 
		{
			if (err || res.statusCode !== 200)	
           	{
               	err = err || new Error('Status Code:'+res.statusCode);
               	if (cb) return cb(err);
				return err;
           	}
           	           	
           	if (cb) return cb(null, body);
    	}    	
    );
}

ProdPadAPI.prototype.createIdea = function( title, summary, url, external_id, cb )
{	
	var post_create_data = '{ "title" : "'+ title+'", "summary" : "'+ summary + '", "url" : "'+ url +'", "external_id" : "'+external_id+'" }';

	request.post(
		{
			url: this.url + '/api/v1/feedback/create?apikey='+this.key, 
			body: post_create_data
		}, 
		function(err, res, body) 
		{
			if (err || res.statusCode !== 200)	
           	{
               	err = err || new Error('Status Code:'+res.statusCode);
               	if (cb) return cb(err);
				return err;
           	}
           	           	
           	if (cb) return cb(null, body);
    	}    	
    );
}

module.exports = ProdPadAPI;
