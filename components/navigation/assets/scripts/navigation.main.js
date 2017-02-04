define(function (require) {
  'use strict';

  var $ = require('jquery');
  var $nav = $('.js-navigation');
  var $search = $('.js-search');
  var $toggleMenu = $('.js-toggleMenu');
  var $toggleSearch = $('.js-toggleSearch');

  function initNavigation() {
    $toggleMenu.on('click', function (e) {
      e.preventDefault();
      $nav.toggleClass('su-navigation__menu--show');
      $search.toggleClass('su-navigation-search--show');
    });

    $toggleSearch.on('click', function (e) {
      e.preventDefault();
      $search.toggleClass('su-navigation-search--show');
    });
  }

  $(function () {
    if ($nav.length) {
      initNavigation();
    }
  });

});

