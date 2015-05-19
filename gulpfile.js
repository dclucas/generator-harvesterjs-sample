var gulp = require('gulp');

gulp.task('db', function(next) {
    // Load all config files including your main DB handler 
    config = require('./app/config');

    // Load all modules 
    require('./models/users');
    require('./models/projects');
    require('./models/products');
    require('./models/productCategories');
 
    // Slurp in all the .json files located in models/scenarios and run them though mongoose-scenario 
 
    var scenario = require('gulp-mongoose-scenario');
    gulp.src('models/scenarios/setup.json')
        .pipe(scenario({connection: config.connectionString, nuke: true}))
        .on('end', function(err) {
            if (err) return next(err);
            next();
        });
});