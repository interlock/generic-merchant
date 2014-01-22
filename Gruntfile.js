module.exports = function(grunt) {

  // Load Grunt Tasks
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          clearRequireCache: true,
          require: 'coverage/blanket'
        },
        src: ['test/**/*.js']
      },
      coverage: {
        options: {
          reporter: 'html-cov',
          // use the quiet flag to suppress the mocha console output
          quiet: true,
          // specify a destination file to capture the mocha
          // output (the quiet option does not suppress this)
          captureFile: 'coverage.html'
        },
        src: ['test/**/*.js']
      }
    },
    watch: {
      js: {
        options: {
          spawn: false,
        },
        files: ['lib/**/*.js','test/**/*.js'],
        tasks: ['mochaTest']
      }
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['mochaTest']);

};
