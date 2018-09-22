var config = {}

config.prodpad_url 				= 'https://app.prodpad.com';
config.prodpad_key 				= 'INSERT PRODPAD KEY';
config.helpscout_key				= '2c16476d1c00e8a3fee8d1f7fab3aeb5a8c47978';
config.helpscout_url 				= 'https://api.helpscout.net';
config.inbound_key 				= 'insert key';
config.youtrack_url 				= 'http://help.dbrs.local';
config.youtrack_user 				= 'smankoo@dbrs.com';
config.youtrack_password 			= 'Sm123456';
config.youtrack_project_1			= '3 Letter Name of Project 1';
config.youtrack_project_1_workflow 		= 1; // workflow id to execute for project 1
config.youtrack_project_2			= 'ICE';
config.youtrack_project_2_workflow		= 2; // Workflow id to execute for project 2
config.youtrack_default_timezone             = 'America/Toronto' //Timezone to use for printing date in Youtrack Ticket


config.port = process.env.WEB_PORT || 8000;

module.exports = config;
