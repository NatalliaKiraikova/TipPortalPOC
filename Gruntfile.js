// Generated on 2015-08-13 using generator-angular 0.11.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  //Custom nuget
  require('./grunt/tip-install/tasks/tip-cli')(grunt);




  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);



  // Configurable paths for the application
  var appConfig = {
    app: 'app',
    root: '.',
    dist: 'dist',
    scss: './scss',
    packages: './packages',
    assets: './assets'
  };
  appConfig.pkg = require('./tip.pckg.json');
  // Define the configuration for all the tasks
  grunt.initConfig({
    // Project settings
    tipmodule: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= tipmodule.app %>/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['app/{,*!/}*.spec.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['<%= tipmodule.scss %>/scss/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= tipmodule.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= tipmodule.assets %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('assets'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/scss',
                connect.static('./scss')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      package: {
        options: {
          port: 9002,
          open: true,
          target: 'http://localhost:9002/index_package.html',
          base: '<%= tipmodule.app %>',
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app),
              connect.static('./dist')
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= tipmodule.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= tipmodule.app %>/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= tipmodule.dist %>/{,*/}*',
            '!<%= tipmodule.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp',
      nuget: ["<%= tipmodule.packages %>",'packages.config'],
      install: ["<%= tipmodule.packages %>",'packages.config','bower.json','bower_components']
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      server: {
        options: {
          map: true,
        },
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },
    // Automatically inject Nuget components into the app
    /*injector: {
      options: {},
      nuget_dependencies: {
        files: {
          '<%= tipmodule.app %>/index.html': ['<%= tipmodule.packages %>/!**!/!*.js', '<%= tipmodule.packages %>/!**!/!*.css']
        }
      }
    },*/
    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= tipmodule.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath:  /\.\.\//,
        fileTypes:{
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
              detect: {
                js: /'(.*\.js)'/gi
              },
              replace: {
                js: '\'{{filePath}}\','
              }
            }
          }
      },
      sass: {
        src: ['<%= tipmodule.root %>/scss/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= tipmodule.root %>/scss',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= tipmodule.assets %>/images/',
        javascriptsDir: '<%= tipmodule.app %>',
        fontsDir: '<%= tipmodule.app %>/scss/fonts',
        importPath: './bower_components',
        httpImagesPath: '/assets/images/',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/scss/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= tipmodule.dist %>/images/generated'
        }
      },
      server: {
        options: {
          sourcemap: true
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= tipmodule.dist %>/scripts/{,*/}*.js',
          '<%= tipmodule.dist %>/styles/{,*/}*.css',
          '<%= tipmodule.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= tipmodule.dist %>/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= tipmodule.app %>/index.html',
      options: {
        dest: '<%= tipmodule.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= tipmodule.dist %>/{,*/}*.html'],
      css: ['<%= tipmodule.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: [
          '<%= tipmodule.dist %>',
          '<%= tipmodule.dist %>/images',
          '<%= tipmodule.dist %>/styles'
        ]
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
     /*cssmin: {
       dist: {
         files: {
           '<%= tipmodule.dist %>/styles/main.css': [
             '.tmp/styles/{,*!/}*.css'
           ]
         }
       },
       package: {
         files: {
           '<%= tipmodule.dist %>/<%= tipmodule.pkg.name %>.min.css': [
             '.tmp/styles<%= tipmodule.pkg.name %>.css'
           ]
       }
       }
     },
     uglify: {
       dist: {
         files: {
           '<%= tipmodule.dist %>/scripts.js': [
             '.tmp/concat/scripts/<%= tipmodule.pkg.name %>.js'
           ]
         }
       },
       package: {
         files: {
           '<%= tipmodule.dist %>/<%= tipmodule.pkg.name %>.min.js': [
             '.tmp/concat/scripts/<%= tipmodule.pkg.name %>.js'
           ]
         }
       }
    },*/
    // concat: {
    //   dist: {}
    // },
    uglify: {
      dist: {
        files: {
          '<%= tipmodule.dist %>/scripts/<%= tipmodule.pkg.name %>.js': [
            '<%= tipmodule.dist %>/scripts/<%= tipmodule.pkg.name %>.js'
          ]
        }
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= tipmodule.assets %>/images/',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= tipmodule.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= tipmodule.assets %>/images/',
          src: '{,*/}*.svg',
          dest: '<%= tipmodule.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= tipmodule.dist %>',
          src: ['*.html'],
          dest: '<%= tipmodule.dist %>'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= tipmodule.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= tipmodule.root %>',
          dest: '<%= tipmodule.dist %>',
          src: [
            '<%= tipmodule.app %>/*.{ico,png,txt}',
            '<%= tipmodule.assets %>/images/{,*/}*.{webp}',
            '<%= tipmodule.assets %>/fonts/{,*/}*.*'
          ]
        },
          {
            expand: true,
            cwd: '<%= tipmodule.app %>',
            src: '*.html',
            dest: '<%= tipmodule.dist %>'
          },
          {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= tipmodule.dist %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '.',
          src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
          dest: '<%= tipmodule.dist %>'
        }]
      },
      js: {
        files: [{
        expand: true,
        cwd: '.tmp/concat/scripts',
        dest: '<%= tipmodule.dist %>',
        src: '<%= tipmodule.pkg.name %>.js'
        }]
      },
      css: {
        expand: true,
        cwd: '.tmp/styles/',
        dest: '<%= tipmodule.dist %>',
        src: '<%= tipmodule.pkg.name %>.css'
      },
      styles: {
        expand: true,
        cwd: '<%= tipmodule.root %>/scss',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      pckg: {
        expand: true,
        cwd: '<%= tipmodule.root %>',
        dest: '<%= tipmodule.dist %>',
        src: 'tip.pckg.json'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    html2js: {
      options: {
        base: 'app',
        rename:function (moduleName) {
          return '/' + moduleName;
        },
        module: '<%= tipmodule.pkg.name %>.templates',
        singleModule: true,
        useStrict: true,
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        }
      },
      main: {
        src: ['app/**/*.html'],
        dest: '<%= tipmodule.dist %>/<%= tipmodule.pkg.name %>.templates.js'
      }
    },

    ngconstant: {
      options: {
        deps:null,
        wrap: true,
        dest: 'app/<%= tipmodule.pkg.name %>/services/<%= tipmodule.pkg.name %>.config.srv.js',
        name: '<%= tipmodule.pkg.name %>'
      },
      package: {
        constants: 'config.json'
      }
    },
    'tip-install': {
    },
    'tip-nuspec':{

    },
    'bower-install-simple': {
      "dev": {
        options: {
          production: false
        }
      }
    }

  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }
    if (target === 'package') {
      return grunt.task.run(['package', 'connect:package:keepalive']);
    }
    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'autoprefixer:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'wiredep',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'ngconstant',
    'concat',
    'ngAnnotate',
    'copy:dist',

    'cssmin',
    'uglify',

    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('package', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'html2js:main',
    'ngconstant',
    'concat',
    'ngAnnotate',
    'copy:css',
    'cssmin:package',
    'copy:js',
    'copy:pckg',
    'tip-nuspec',
    'uglify:package',
    'usemin'
  ]);

  grunt.registerTask('install', 'Installs dependencies', function (target) {
    grunt.task.run([
      'clean:install'
    ]);
    if (target === 'prod') {
      grunt.task.run(['tip-install:prod']);
    }else{
      grunt.task.run(['tip-install:dev']);
    }
    grunt.task.run([
      'bower-install-simple',
      'clean:nuget'
    ]);
  });

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
