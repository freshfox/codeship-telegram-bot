var env = require('node-env-file');
var fs = require('fs');

if(fs.existsSync(__dirname + '/../.env')){
	env(__dirname + '/../.env');
}

// when you require the config dir this will return
// a neat appropriate env config object
module.exports = require('cnfg')(__dirname);