/*jslint node:true */


module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    port: 9000,
                    middleware: function(connect) {
                        return [
                            require('connect-livereload')(),
                            connect['static'](__dirname)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:9000'
            }
        },
        watch: {
            prueba: {
                options: {
                    livereload: true
                },
                files: ['/**/*.js']
            }
        }
    });

    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });


    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');
    

    grunt.registerTask('server', ['connect:server', 'open', 'watch']);

};
