const remapify = require('remapify');
const path = require('path');

module.exports = function (grunt) {
  const copyToExternalPath = '../../../site/wordpress/wp-content/themes/sheru/ui';
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
  const sasslintIgnorePattern = ['!assets/styles/{vendor,mixins}/*.scss'];
  const sasslintPattern = stylesPattern.concat(sasslintIgnorePattern);
  const versionPath = './assets/'

  grunt.config.init({
    watch: {
      options: {
        cwd: './',
        interval: 200,
        spawn: false
      },
      fabric: {
        files: ['package.json'],
        tasks: ['version', 'copy:versionExternal']
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
    run: {
      minifyjs: {
        exec: 'uglifyjs ./dist/scripts/build.js -o ./dist/scripts/build.min.js'
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
      fabric: {
        files: [{
          expand: true,
          cwd: './assets/',
          src: 'version.txt',
          dest: './dist/'
        }]
      },
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
      versionExternal: {
        files: [{
          expand: true,
          cwd: './assets/',
          src: 'version.txt',
          dest: copyToExternalPath + "/"
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
        src: ['styles/*.css', 'fonts/**/*.css', '!styles/*.min.css'],
        dest: './dist/',
        ext: '.min.css'
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

  grunt.registerTask('version', [], () => {
    const obj = grunt.file.readJSON('package.json');
    const version = obj.version;
    const project = obj.name;
    const filePath = versionPath + "version.txt";

    grunt.log.writeln("SHERU.UK");
    grunt.log.writeln(`Project: ${project}` );
    grunt.log.writeln(`Version: ${version}` );
    grunt.log.writeln("");
    grunt.log.writeln(`Write version: ${filePath}`);
    grunt.file.write(filePath, version);
  });

  grunt.registerTask('styles', [], () => {
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.task.run('sass', 'postcss:build', 'cssmin');
  });

  grunt.registerTask('modernizr', [], () => {
    grunt.loadNpmTasks('grunt-modernizr');
    grunt.task.run('modernizr');
  });

  grunt.registerTask('scripts', [], () => {
    grunt.loadNpmTasks('grunt-run');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.task.run('requirejs', 'run:minifyjs');
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

  grunt.registerTask('default', [], () => {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.task.run('version', 'styles', 'scripts', 'modernizr', 'copy', 'watch');
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
