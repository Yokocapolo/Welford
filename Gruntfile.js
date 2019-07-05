module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

  //Tasks
    sass: {
      dist: {
        options: {
          sourcemap: false
        },
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['**/*.sass'],
          dest: 'stylesheets',
          ext: '.css'
        }]
      },
    },

    cssmin: {
      options: {
        banner: '/*Contains index.css -- Author: <%= pkg.author %> -- v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>*/',
        noAdvanced: true
      },
      combine: {
        files: {
          'stylesheets/css-min.css': [
            'stylesheets/*.css',
            '!stylesheets/*map',
            '!stylesheets/css-min.css',
            '!stylesheets/mixins.css',
            '!stylesheets/media-queries.css'
          ]
        }
      }
    },

    watch: {
      sass: {
        files: ['sass/*.sass'],
        tasks: ['sass']
      },
      css: {
        files: [
          'stylesheets/index.css',
          '!stylesheets/css-min.css',
          '!stylesheets/ie.css',
          '!stylesheets/print.css',
          '!stylesheets/screen.css'
        ],
        tasks: ['cssmin']
      },
    }
  });
    // Load the plugins.
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');

  // Default task(s).
  grunt.registerTask('default', ['watch']);
};