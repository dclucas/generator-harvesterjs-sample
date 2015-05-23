/*
'use strict';
var $http = require('http-as-promised');
var Promise = require('bluebird');

module.exports = function() {
    var input;
    //this.World = require('../support/world.js').World;
    this.World = require(process.cwd() + '/features/support/world').World;
    //var hooks = 
    //require('../support/hooks.js')();
    
    this.Given(/^a valid person resource$/, function (callback) {
        callback();
    });

    var responses
    
    this.When(/^I post it to its endpoint$/, function (callback) {
        responses = Promise.all(input.map(function (i) {
            console.log(i.request);
            // todo: use config here
            $http.post('http://localhost:' + World.cfg.port + '/people', i.request.body)
        }))
        .catch(function(err) {
            callback(err);
        }) ;
        callback.pending();
    });
    
    this.Then(/^the resource is added to the database$/, function (callback) {
      callback.pending();
    });
};
*/

var chai = require('chai');
var should = chai.should();
chai.use(require('chai-http'));
chai.use(require('chai-things'));

var Promise = require('bluebird');
var cfg = require('../app/config');

var app = require('../app/api');
var server;

if (!global.Promise) {
  //var q = require('q');
  chai.request.addPromises(Promise.Promise);
}

before(function() {
    //server = app.router.listen(cfg.port);
    app.listen(cfg.port);
})

after(function() {
    //server.close();
})

var validPersonBody = { "people": [{ "name": "John Doe", "email": "john.doe@email.com" }]};

describe('Given a valid person resource', function(){
    describe('When I post it to the people/ endpoint', function(){
        var responsePromise;
        var response;
        it('Then I receive a 201 status code', function() {
            responsePromise = chai.request(app.router)
                .post('/people')
                .set('Content-type', 'application/json')
                .send(validPersonBody)
                .then(function(res) {
                    response = res;
                    res.should.have.status(201);
                    return res;
                });
            
            return responsePromise;
        })
        
        it('And the response contains the newly created resource', function() {
            return responsePromise.then(function() {
                response.should.exist;
                response.body.should.exist;
                response.body.people[0].id.should.exist;
                var expected = JSON.parse(JSON.stringify(validPersonBody));
                expected.people[0].id = response.body.people[0].id;
                response.body.should.deep.equal(expected);
            });
        });
    })
})