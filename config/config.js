var path = require('path');
var rootPath = path.normalize(__dirname +'/../../');

module.exports = {
	development: {
		rootPath: rootPath,
		db: 'mongodb://localhost/angular-initial-template',
		port: process.env.PORT || 3030
	},
	/* production: {
		rootPath: rootPath,
		db: 'mongodb://Gowtham:mean-basic@ds131384.mlab.com:31384/mean-basic',
		port: process.env.PORT || 80
	} */
}