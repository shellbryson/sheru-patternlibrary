require.config({
  'baseUrl': '../',
  'paths': {
    // Path aliases
    'build': 'assets/scripts',

    // Client libs
    'jquery':               'assets/scripts/jquery-namespace',
    'modernizr':            'assets/scripts/libs/modernizr/modernizr',
    'TweenLite':            'assets/scripts/libs/gsap/src/minified/TweenLite.min',
    'TweenMax':             'assets/scripts/libs/gsap/src/minified/TweenMax.min',

    // Helpers
    'toggleAttribute':      'assets/scripts/toggleattribute',

    // Components
    'navigation':           'components/navigation/assets/scripts/navigation.main',
    'project-spinner':      'components/project-spinner/assets/scripts/project-spinner.main',
  },
  shim: {
    'modernizr': {
      exports: 'Modernizr'
    }
  }
});
