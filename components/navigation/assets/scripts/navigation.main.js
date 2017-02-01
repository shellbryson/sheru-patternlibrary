define(function (require) {
  'use strict';

  var $ = require('jquery');
  var $nav = $('.js-navigation');
  var $toggle = $('.js-toggle');

  function initNavigation() {
    $toggle.on('click', function (e) {
      e.preventDefault();
      $nav.toggleClass('su-navigation__menu--show');
    });
  }

  $(function () {
    if ($nav.length) {
      initNavigation();
    }
  });

});

