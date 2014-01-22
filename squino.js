/*
	npm install express
*/

var express 	= require('express');
var https 		= require('https');
var url 		= require('url');
var config	    = require('./squino_config');

var app = express();

var HELPSCOUT_USER_AGENT = 'Help Scout API / nodejs Client v0';

app.use(express.logger());

app.get( '/api', function( req, res ) {
	runAPI( req, res );
});

app.listen( config.port );
console.log( 'Started Squino Server');

function runAPI( servRequest, servResponse )
{

	servResponse.header( "Content-Type", "application/json");

	
	var options = {
   		host: 'api.helpscout.net',
		port: 443,
		path: '/v1/conversations/'+servRequest.query.id+'.json',
		// authentication headers
		headers: {
			'Authorization': 'Basic ' + new Buffer(config.helpscout_key + ':SortOfSecret').toString('base64')
		}   	
	};

	request = https.get( options, function( res ) {
		var body="";
		res.on('data', function( data ) {
			body += data;
		});

		res.on('end', function( ) {
			console.log( 'complete for '+servRequest.query.id );
			//servResponse.send( '<p>got it</p>');

			var obj = JSON.parse( body );

			console.log( obj );
			console.log( obj.item.subject + ' :: '+ obj.item.preview );
			
			var ideaTitle = obj.item.subject;
			var ideaSummary = obj.item.preview;
			var ideaUrl = 'https://secure.helpscout.net/conversation/'+servRequest.query.id;
			var ideaID = servRequest.query.id ;
			var feedbackName = obj.item.customer.firstName + ' ' + obj.item.customer.lastName;
			var feedbackEmail = obj.item.customer.email;

			// { "name" : "Bill Mahon" , "email" : "bill@example.come", "about" : "Signup after a trade exhibition", "feedback" : "love this product but it would be great if it rotated left as well', }

			var post_feedback_data = '{ "name" : "' + feedbackName + '", "email" : "' + feedbackEmail + '", "about" : "' + idealTitle + '", "feedback" : "' 
				+ ideaSummary + '<br/><a href='+ideaUrl+'>Link to Help Scout</a>"}';

			var post_create_data = '{ "title" : "'+ ideaTitle+'", "summary" : "'+ ideaSummary + '", "url" : "'+ ideaUrl +'", "external_id" : "'+ideaID+'" }';
			var options2 = {
				hostname: 'app.prodpad.com',
				port: 443,
				//path: '/api/v1/idea/create?apikey='+config.prodpad_key,
				path: 'api/v1/feedback/create?apikey='+config.prodpad_key,
				method: 'POST',
				headers: {
          			'Content-Type': 'raw',
          			'Content-Length': post_feedback_data.length
      			}
			};

			var req = https.request(options2, function(resInner) {
				var innerBody = "";

	  			console.log('STATUS: ' + resInner.statusCode);
  				resInner.setEncoding('utf8');
  				resInner.on('data', function (chunk) {
	    			innerBody += chunk;   			
	    			console.log( chunk );
  				});
  			
  				resInner.on( 'end', function( ) {
  					servResponse.send(  						
  					 	"response was: " + resInner.statusCode 
  					 );
  				} );		
								
			});

			req.on('error', function(e) {
  				console.log('problem with request: ' + e.message);
  			});

			console.log( post_feedback_data );
			// write data to request body
			req.write( post_feedback_data );
			req.end();			

			/*{ "title" :"testing titles", "summary" : "FWD: Magellen - IM BCG RMBS 2, FTA - European RMBS Transaction :: Hey Zac - still working out the kinks with Kev and the EU folks", "url" : "https://secure.helpscout.net/conversation/15688980", "external_id" : "15688980" }*/

		});

		res.on( 'error', function( e ) {
			console.log( 'Got error:'+e.message );			
		});
	});


	//servResponse.send( '<b>Hello World</b>');
}

function createProdPadIdea( ideaSummary, ideaUrl, ideaID )
{
	var options = {
		hostname: 'app.prodpad.com',
		port: 443,
		path: '/api/v1/idea/create?apikey='+PRODPAD_API_KEY,
		method: 'POST'
	};

	var req = https.request(options, function(res) {
  			console.log('STATUS: ' + res.statusCode);
  			console.log('HEADERS: ' + JSON.stringify(res.headers));
  			res.setEncoding('utf8');
  			res.on('data', function (chunk) {
    			console.log('BODY: ' + chunk);
  			});
	});

	req.on('error', function(e) {
  		console.log('problem with request: ' + e.message);
	});

	// write data to request body
	req.write('{ "summary" : "'+ ideaSummary + '", "url" : "'+ ideaUrl +'", "external_id" : "'+ideaID+'" }');
	req.end();
}
