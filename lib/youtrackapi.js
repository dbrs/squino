var request = require( 'request');
var qs 		= require( 'querystring');

var YouTrackAPI = function(url) 
{
  	if (!url) { throw new Error('url is required'); }

  	this.url = url;
};

YouTrackAPI.prototype.setUsername = function (username) {
  this.username = username;
  return this.username;
};
YouTrackAPI.prototype.setPassword = function (password) {
  this.password = password;
  return this.password;
};
YouTrackAPI.prototype.setURL = function (URL) {
  this.url = URL;
  return this.url;
};

YouTrackAPI.prototype.login = function( username, password, cb )
{	

	request.post(
		{
			url: this.url + '/rest/user/login', 
			form: {login: username, password: password}
		}, 
		function(err, res, body) 
		{
           		if (err || res.statusCode !== 200)	
           		{
               			err = err || new Error('wrong credentials'+res.statusCode);
               			if (cb) return cb(err);
				return err;
           		}
           	
           		this.cookie = res.headers["set-cookie"]; 
           	
           		if (cb) return cb(null, this.cookie);          
    		}
    	);
}

YouTrackAPI.prototype.createIssue = function ( project, summary, description, cb )
{
	if( !this.cookie ) { throw new Error( 'The Cookie is Not Valid'); }

	var jar = request.jar( );
	jar.setCookie(  this.cookie[0] + ';' + this.cookie[1] , this.url );

	request.put (
		{
			url : this.url + '/rest/issue?project='+project+'&summary='+summary+'&description='+description+'&markdown=true',
			jar : jar
		},
		function( err, res, body )
		{
			// console.log( err + res.statusCode  + body);
			// console.log(JSON.stringify(res.headers));
			// console.log(res.headers['location']);

			var ticketUrl = res.headers['location'];

			// Move the ticket to the support swimlane

			request.post (
				{
					url : ticketUrl + '/execute',
					jar : jar,
					form: { command: "Swimlane Support Type of Support Service Request add Board ICE " }
				},
				function( err, res, body )
				{
					//console.log('Ticket moved to support swimlane')
					//console.log( err + res.statusCode  + body);
			
					if( cb ) return cb( err, body , ticketUrl);
				}
			);

			if( cb ) return cb( err, body , ticketUrl);
		}
	);
}

module.exports = YouTrackAPI;
