var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('mongo-eval', function() {
    var Db = require('mongodb').Db,
        Server = require('mongodb').Server,
        assert = require('assert');
    
    var db = new Db('local', new Server('localhost', 27017), {safe:true});
    // Establish connection to db
    db.open(function(err, db) {
        if (err) {
            gutil.log('error:' + err);
        }
        else { 
            db.eval('rs.conf()', function(err, result) {
                if (err) { 
                    gutil.log('error:' + err) 
                }
                else { 
                    if (! result) {
                        db.eval('db.collection.find()', function(err, result) {
                            gutil.log(result);
                        });
                    }
                }
                db.close();
            });
        }
    });  
});