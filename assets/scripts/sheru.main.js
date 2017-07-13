define(function (require) {
  'use strict';

  require('navigation');
  require('project-spinner');

  const body = document.querySelector('body');

  // TODO Remove this font hack once Fabric supports fully custom headers
  if (location.hostname === 'localhost' ||
      location.hostname === '127.0.0.1' ||
      location.hostname === 'sheru.local'
  ) {
    const head = document.querySelector("head");
    const font = document.createElement("link");
    const icons = document.createElement("link");

    font.setAttribute("href", "https://fonts.googleapis.com/css?family=Overpass:300,400,600");
    font.setAttribute("rel", "stylesheet");
    icons.setAttribute("href", "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
    icons.setAttribute("rel", "stylesheet");

    head.append(font);
    head.append(icons);
  }

});
