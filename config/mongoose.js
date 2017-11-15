var mongoose = require('mongoose');

    module.exports = (config) => {
        mongoose.connect(config.db, { useMongoClient: true });
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error...'));
        db.once('open', function callback() {
            console.log('multivision db opened');
        });
    };