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
        },
        git_changelog: {
            minimal: {
                options: {
                    repo_url: 'https://github.com/oscarteston/pruebaChangelog',
                    appName: 'pruebaChangelog'
                }
            },
            extended: {
                options: {
                    repo_url: 'https://github.com/oscarteston/pruebaChangelog',
                    appName: 'pruebaChangelog extended',
                    file: 'EXTENDEDCHANGELOG.md',
                    grep_commits: '^fix|^feat|^docs|^refactor|^chore|BREAKING'
                }
            }
        },
        changelog: {
            options: {}
        },
    });

    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });


    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('git-changelog');
    runt.loadNpmTasks('grunt-changelog');


    grunt.registerTask('server', ['connect:server', 'open', 'watch', 'changelog']);

};
