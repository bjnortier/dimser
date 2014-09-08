'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js'],
      },
      demo: {
        src: ['demo/js/src/**/*.js'],
      },
    },

    webpack: {
      demo: {
        entry: "./demo/js/src/demo.js",
        output: {
          path: "demo/js",
          filename: "demo.app.js",
        },
        devtool: "#inline-source-map",
      },
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile'],
      },
      lib: {
        files: ['<%= jshint.lib.src %>'],
        tasks: ['jshint:lib', 'webpack'],
      },
      demo: {
        files: ['<%= jshint.demo.src %>'],
        tasks: ['jshint:demo', 'webpack'],
      },
    },

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-webpack');

  grunt.registerTask('default', ['jshint', 'webpack']);

};
