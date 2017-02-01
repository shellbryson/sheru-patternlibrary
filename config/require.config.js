require.config({
  'baseUrl': '../',
  'paths': {
    //  path aliases
    'build': 'assets/scripts',

    //  client libs
    'jquery':               'assets/scripts/jquery',
    'modernizr':            'assets/scripts/libs/modernizr/modernizr',
    'toggleAttribute':      'assets/scripts/toggleattribute',

    //  components

    'navigation':           'components/navigation/assets/scripts/navigation.main'
  },
  shim: {
    'modernizr': {
      exports: 'Modernizr'
    }
  }
});
