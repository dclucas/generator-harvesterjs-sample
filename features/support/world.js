var app = require('../../app/api');
var cfg = require('../../app/config.js');

var server;


var World = function World(callback) {
    if (server == null) {
        console.log('world');
        server = app.router.listen(cfg.port);
        this.app = app;
        this.cfg = cfg;
        this.baseUrl = 'http://localhost:' + this.cfg.port;
    
        this.registerHandler('AfterFeatures', function (event, done) {
            server.close();
            // todo: remove this kludge
            process.exit(0);
        });

        process.on('exit', function() {
            console.log('exit');
        });
    }
    
    if (callback)
        callback();
}

module.exports.World = World;
