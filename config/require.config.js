require.config({
  'baseUrl': '../',
  'paths': {
    //  path aliases
    'build': 'assets/scripts',

    //  client libs
    'jquery':               'assets/scripts/jquery',
    'modernizr':            'assets/scripts/libs/modernizr/modernizr',
    'TweenLite':            'assets/scripts/libs/gsap/src/minified/TweenLite.min',
    'TweenMax':             'assets/scripts/libs/gsap/src/minified/TweenMax.min',
    'toggleAttribute':      'assets/scripts/toggleattribute',

    //  components
    'navigation':           'components/navigation/assets/scripts/navigation.main',
    'project-spinner':      'components/project-spinner/assets/scripts/project-spinner.main',
  },
  shim: {
    'modernizr': {
      exports: 'Modernizr'
    }
  }
});
