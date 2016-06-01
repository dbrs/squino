var config = {}

config.prodpad_url 				= 'https://app.prodpad.com';
config.prodpad_key 				= 'INSERT PRODPAD KEY';
config.helpscout_key				= 'INSERT HELPSCOUT KEY';
config.helpscout_url 				= 'https://api.helpscout.net';
config.inbound_key 				= 'insert key';
config.youtrack_url 				= 'http://youtrack.com/url/';
config.youtrack_user 				= 'YOUTRACK_USER';
config.youtrack_password 			= 'YOUTRACK_PASS';
config.youtrack_project_1			= '3 Letter Name of Project 1';
config.youtrack_project_1_workflow 		= 1; // workflow id to execute for project 1
config.youtrack_project_2			= '3 Letter Name of Project 2';
config.youtrack_project_2_workflow		= 2; // Workflow id to execute for project 2

config.port = process.env.WEB_PORT || 8000;

module.exports = config;
