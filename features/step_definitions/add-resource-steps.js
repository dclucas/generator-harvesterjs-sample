'use strict';
var $http = require('http-as-promised');
var Promise = require('bluebird');

module.exports = function() {
    var input;
    //this.World = require('../support/world.js').World;
    //this.World = require(process.cwd() + '/features/support/world').World;
    //var hooks = 
    //require('../support/hooks.js')();
    
    /*
    this.registerHandler('AfterFeatures', function (event, done) {
        console.log('afterHandler');
        that.app.router.close();
    });
    */
    this.Given(/^a valid person resource$/, function (callback) {
        input = require('../sample_data/valid_person_list.json');
        callback();
    });

    var responses
    
    this.When(/^I post it to its endpoint$/, function (callback) {
        /*
        responses = Promise.all(input.map(function (i) {
            console.log(i.request);
            // todo: use config here
            $http.post('http://localhost:' + World.cfg.port + '/people', i.request.body)
        }))
        .catch(function(err) {
            callback(err);
        }) ;
        */
        callback.pending();
    });
    
    this.Then(/^the resource is added to the database$/, function (callback) {
      callback.pending();
    });
};