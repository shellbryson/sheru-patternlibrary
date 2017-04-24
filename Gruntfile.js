const remapify = require('remapify');
const path = require('path');

module.exports = function (grunt) {
  const copyToExternalPath = '../../../site/wordpress/wp-content/themes/sheru/fabric';
  const scriptsPattern = [
    'patterns/**/*.js',
    'components/**/*.js',
    'assets/scripts/*.js'
  ];
  const stylesPattern = [
    'patterns/**/*.scss',
    'components/**/*.scss',
    'assets/styles/**/*.scss'
  ];
  const imagesPattern = ['assets/images/**/*'];
  const iconsPattern =  ['assets/icons/**/*'];
  const fontsPattern = ['assets/fonts/**/*'];
  const stylesPatternMain = ['./assets/styles/build.scss'];
  const stylesPatternDist = ['./dist/styles/build.css'];
  const scriptsPatternDist = ['./dist/scripts/build.js'];
  const svgPattern = ['assets/icons/svg/*.svg'];
  const sasslintIgnorePattern = ['!assets/styles/{vendor,mixins}/*.scss'];
  const sasslintPattern = stylesPattern.concat(sasslintIgnorePattern);

  grunt.config.init({
    watch: {
      options: {
        cwd: './',
        interval: 200,
        spawn: false
      },
      scripts: {
        files: scriptsPattern,
        tasks: ['scripts', 'copy:scriptsExternal']
      },
      styles: {
        files: stylesPattern,
        tasks: ['styles', 'copy:stylesExternal']
      },
      fonts: {
        files: fontsPattern,
        tasks: ['copy:fonts', 'copy:fontsExternal']
      },
      images: {
        files: imagesPattern,
        tasks: ['copy:images','copy:imagesExternal']
      },
      icons: {
        files: iconsPattern,
        tasks: ['copy:icons', 'copy:iconsExternal']
      },
      sasslint: {
        files: sasslintPattern
      },
      jscs: {
        files: scriptsPattern
      }
    },
    sass: {
      build: {
        files: {
          './dist/styles/build.css': stylesPatternMain
        }
      }
    },
    /*
     Copy files to dist folder
     */
    copy: {
      fonts: {
        files: [{
          expand: true,
          cwd: './assets/fonts/',
          src: '**/*',
          dest: './dist/fonts/'
        }]
      },
      images: {
        files: [{
          expand: true,
          cwd: './assets/images/',
          src: '**/*',
          dest: './dist/images/'
        }]
      },
      icons: {
        files: [{
          expand: true,
          cwd: './assets/icons/',
          src: '**/*',
          dest: './dist/icons/'
        }]
      },
      scripts: {
        files: [{
          expand: true,
          cwd: './assets/scripts/libs/',
          src: '**/*',
          dest: './dist/scripts/libs/'
        }]
      },
      stylesExternal: {
        files: [{
          expand: true,
          cwd: './dist/styles/',
          src: '**/*',
          dest: copyToExternalPath + "/styles/"
        }]
      },
      scriptsExternal: {
        files: [{
          expand: true,
          cwd: './dist/scripts/',
          src: '**/*',
          dest: copyToExternalPath + "/scripts/"
        }]
      },
      scriptsAllExternal: {
        files: [{
          expand: true,
          cwd: './dist/scripts/',
          src: '**/*',
          dest: copyToExternalPath + "/scripts/"
        }]
      },
      fontsExternal: {
        files: [{
          expand: true,
          cwd: './dist/fonts/',
          src: '**/*',
          dest: copyToExternalPath + "/fonts/"
        }]
      },
      imagesExternal: {
        files: [{
          expand: true,
          cwd: './dist/images/',
          src: '**/*',
          dest: copyToExternalPath + "/images/"
        }]
      },
      iconsExternal: {
        files: [{
          expand: true,
          cwd: './dist/icons/',
          src: '**/*',
          dest: copyToExternalPath + "/icons/"
        }]
      }
    },
    /*
     Apply vendor prefixed properties to generated css using 'Can I use' db
     */
    postcss: {
      options: {
        processors: [
          require('autoprefixer')({ browsers: ['> 3%', 'last 2 versions'] })
        ]
      },
      build: {
        src: stylesPatternDist
      }
    },
    /*
     Minify css - keep fonts and build separate for now
     */
    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      dist: {
        expand: true,
        cwd: './dist/',
        src: ['styles/*.css', 'fonts/**/*.css'],
        dest: './dist/',
        ext: '.css'
      }
    },
    /*
     Build JS bundle using requiresJS optimizer
     */
    requirejs: {
      dev: {
        options: {
          optimize: 'none',
          mainConfigFile: 'config/require.config.js',
          name: 'node_modules/almond/almond',
          include: ['assets/scripts/build.main'],
          insertRequire: ['assets/scripts/build.main'],
          out: 'dist/scripts/build.js'
        }
      }
    },
    /*
     Minify JS - only does the build file until a decision is made on browserify/RequireJS
     */
    uglify: {
      dist: {
        files: {
          './dist/scripts/build.js': [scriptsPatternDist]
        }
      }
    },
    /*
     Generate a modernizr build based on requirements
     */
    modernizr: {
      dist: {
        'dest': './dist/scripts/modernizr.custom.js',
        'parseFiles': true,
        'crawl': true,
        'cache': true,
        'files': {
          'src': ['./dist/scripts/build.js', './dist/styles/build.css']
        },
        'enableJSClass': true,
        'customTests': [],
        'tests': [],
        'excludeTests': ['hidden'],
        'options': [
          'setClasses',
          'domPrefixes',
          'mq'
        ],
        'uglify': true
      }
    },
    /*
     Generate us some svg icons
     */
    svgstore: {
      options: {
        prefix: 'icon-',
        cleanup: true,
        cleanupdefs: true,
        includeTitleElement: false,
        svg: {
          viewBox: '0 0 100 100',
          xmlns: 'http://www.w3.org/2000/svg'
        },
        formatting: {
          indent_size: 2
        }
      },
      your_target: {
        files: {
          'assets/icons/svg/dist/defs.svg': [svgPattern]
        }
      }
    },
    /*
     * JSCS Linting - for definition's see config and http://jscs.info/rules
     */
    jscs: {
      src: '{components,patterns}/**/assets/scripts/**.main.js',
      options: {
        config: 'config/.jscsrc',
        fix: false,
        force: true
      }
    },
    /*
     Quality check for SCSS
     */
    sasslint: {
      options: {
        target: sasslintPattern,
        configFile: '.scss-lint.yml'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('styles', [], () => {
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.task.run('sass', 'postcss:build');
  });

  grunt.registerTask('modernizr', [], () => {
    grunt.loadNpmTasks('grunt-modernizr');
    grunt.task.run('modernizr');
  });

  grunt.registerTask('scripts', [], () => {
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.task.run('requirejs');
  });

  grunt.registerTask('dist', [], () => {
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.task.run(
      'styles', 'cssmin', 'scripts', 'modernizr', 'uglify', 'copy',
      'copy:stylesExternal',
      'copy:scriptsExternal',
      'copy:fontsExternal',
      'copy:imagesExternal'
    );
  });

  grunt.registerTask('lintjs', [], () => {
    grunt.loadNpmTasks('grunt-jscs');
    grunt.task.run('jscs');
  });

  grunt.registerTask('lintscss', [], () => {
    grunt.loadNpmTasks('grunt-sass-lint');
    grunt.task.run('sasslint');
  });

  grunt.registerTask('lint', [], () => {
    grunt.task.run('lintscss', 'lintjs');
  });

  grunt.registerTask('svg', [], () => {
    grunt.loadNpmTasks('grunt-svgstore');
    grunt.task.run('svgstore');
  });

  grunt.registerTask('default', [], () => {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.task.run('styles', 'scripts', 'modernizr', 'copy', 'watch');
  });

  /*
   * With SCSS/JSCS linting enabled, we want to only check the currently changed file/s
   */
  let changed_files = Object.create(null);
  let onChange = grunt.util._.debounce( (ext) => {
    if (ext === '.scss') {
      let target = Object.keys(changed_files).concat(sasslintIgnorePattern);
      grunt.config('sasslint.target', target);
      grunt.task.run('lintscss');
    }

    if (ext === '.js') {
      grunt.config('jscs.src', Object.keys(changed_files));
      grunt.task.run('lintjs');
    }

    changed_files = Object.create(null);
  }, 200);

  grunt.event.on('watch', ( action, filepath ) => {
    let ext = path.extname(filepath);
    changed_files[filepath] = action;
    onChange(ext);
  });
};

/*
 set up aliases used in build process
 */
function preBrowserifyBundle(b) {
  b.plugin(remapify, [
    {
      cwd: './assets/scripts/',
      src: '**/*.js',
      expose: 'build'
    },
    {
      cwd: './components/',
      src: '**/*.main.js',
      expose: 'component'
    },
    {
      cwd: './patterns/',
      src: '**/*.main.js',
      expose: 'pattern'
    }
  ]);
}
