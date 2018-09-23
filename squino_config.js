var config = {}

config.prodpad_url 				= 'https://app.prodpad.com';
config.prodpad_key 				= 'INSERT PRODPAD KEY';
config.helpscout_key				= 'INSERT HELPSCOUT KEY';
config.helpscout_url 				= 'https://api.helpscout.net';
config.inbound_key 				= '----';
config.youtrack_url 				= 'http://help.dbrs.local';
config.youtrack_user 				= 'Youtrack User';
config.youtrack_password 			= 'Youtrack Password';
config.youtrack_project_2			= 'ICE'; //Don't change
config.youtrack_project_2_workflow		= 407326; // Workflow id to execute
config.youtrack_default_timezone             = 'America/Toronto' //Timezone to use for printing date in Youtrack Ticket

config.port = process.env.WEB_PORT || 8000;

module.exports = config;
