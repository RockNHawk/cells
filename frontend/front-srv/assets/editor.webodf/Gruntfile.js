module.exports = function(grunt) {

    const {Externals} = require('../libdefs.js');

    grunt.initConfig({
        babel: {
            options: {
                optional: ['es7.decorators'],
            },

            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'res/js/',
                        src: ['**/*.js'],
                        dest: 'res/build/PydioWebODF/',
                        ext: '.js'
                    }
                ]
            }
        },
        browserify: {
            ui : {
                options: {
                    external: Externals,
                    browserifyOptions:{
                        standalone: 'PydioWebODF',
                        debug:true
                    }
                },
                files: {
                    'res/build/PydioWebODF.js':'res/build/PydioWebODF/index.js'
                }
            }
        },
        compress: {
            options: {
                mode: 'gzip',
                level:9,
            },
            js: {
                expand: true,
                cwd: 'res/build/',
                src: ['PydioWebODF.js'],
                dest: 'res/build/',
                ext: '.js.gz'
            },
        },
        watch: {
            js: {
                files: [
                    "res/**/*"
                ],
                tasks: ['babel', 'browserify:ui', 'compress'],
                options: {
                    spawn: false
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.registerTask('default', ['babel', 'browserify:ui', 'compress']);

};
