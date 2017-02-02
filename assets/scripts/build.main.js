define(function (require) {
  'use strict';

  require('toggleAttribute');
  require('navigation');

  // TODO Remove this font hack once Fabric supports fully custom headers
  if (location.hostname === 'localhost' ||
      location.hostname === '127.0.0.1' ||
      location.hostname === 'sheru.local'
  ) {
    $('head').append('<link href="https://fonts.googleapis.com/css?family=Overpass" rel="stylesheet">');
    $('head').append('<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">');
  }

});
