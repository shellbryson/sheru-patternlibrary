define(function (require) {
  'use strict';

  var $ = require('jquery');
  var $nav = $('.js-navigation');
  var $toggleMenu = $('.js-toggleMenu');
  var $toggleSearch = $('.js-toggleSearch');

  function initNavigation() {

    $toggleMenu.on('click', function (e) {
      e.preventDefault();
      $nav.toggleClass('su-navigation__menu--show');
    });

    $toggleSearch.on('click', function (e) {
      e.preventDefault();
      $nav.toggleClass('su-search--show');
    });
  }

  $(function () {
    if ($nav.length) {
      initNavigation();
    }
  });

});

