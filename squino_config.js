var config = {}

config.prodpad_url = 'https://app.prodpad.com';
config.prodpad_key = 'insert key';
config.helpscout_key = 'insert key';
config.helpscout_url = 'https://api.helpscout.net';
config.inbound_key = 'insert key';
config.youtrack_url = 'http://help.dbrs.local';
config.youtrack_user = 'DBRS2\\youtrack';
config.youtrack_password = 'insert pass';

config.port = process.env.WEB_PORT || 8000;

module.exports = config;
