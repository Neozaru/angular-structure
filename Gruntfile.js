module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            min: {
                files: grunt.file.expandMapping(['app/**/*.js'], 'build/', {
                    rename: function(destBase, destPath) {
                        return destBase + destPath.replace('.js', '.min.js');
                    }
                })
            },
        },
        copy: {
            main: {
                files: [
                    // Includes files within path and its sub-directories
                    {
                        expand: true,
                        src: ['index.html', 'main.js', 'require-common.js', 'app/**/*.html', 'bower_components/**/*.js'],
                        dest: 'build/'
                    },
                ],
            },
        },
        jshint: {
            all: ['main.js', 'require-common.js', 'app/**/*.js']
        },
        htmlangular: {
            options: {
                tmplext: 'html'
            },
            files: {
                src: ['app/**/*.html']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-html-angular-validate');

    grunt.registerTask('validatehtml', ['htmlangular']);
    grunt.registerTask('validatejs', ['jshint']);
    grunt.registerTask('buildhtml', ['validatehtml', 'copy']);
    grunt.registerTask('buildjs', ['validatejs', 'uglify']);

    // Default task(s).
    grunt.registerTask('default', ['buildjs', 'buildhtml']);


};