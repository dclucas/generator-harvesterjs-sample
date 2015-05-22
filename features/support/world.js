var app = require('../../app/api');
var cfg = require('../../app/config.js');

var server;


var World = function World(callback) {
    server = app.router.listen(cfg.port);
    this.app = app;
    this.cfg = cfg;
    this.baseUrl = 'http://localhost:' + this.cfg.port;

    this.registerHandler('AfterFeatures', function (event, done) {
        server.close();
        // todo: remove this kludge
        process.exit(0);
    });

    if (callback)
        callback();
}

module.exports = World;
