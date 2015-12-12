module.exports = function(grunt) {
  
  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', '*.js']
    },
    watch: {
      files: ['*.js'],
      tasks: ['jshint', 'mochaTest'],
      options: {
        atBegin: true
      }
    },
    mochaTest: {
      src: ['tests.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', ['jshint']);
};