define(function (require) {
  'use strict';

  var $ = require('jquery');
  var $nav = $('.js-navigation');
  var $search = $('.js-search');
  var $toggleMenu = $('.js-toggleMenu');
  var $toggleSearch = $('.js-toggleSearch');
  var _menuClass = 'su-navigation__menu--show';
  var _searchClass = 'su-navigation-search--show';

  function initNavigation() {
    $toggleMenu.on('click', function (e) {
      e.preventDefault();
      if ($nav.hasClass(_menuClass)) {
        $nav.removeClass(_menuClass);
        $search.removeClass(_searchClass);
      } else {
        $nav.addClass(_menuClass);
        $search.addClass(_searchClass);
      }
    });

    $toggleSearch.on('click', function (e) {
      e.preventDefault();
      $search.toggleClass(_searchClass);
    });
  }

  $(function () {
    if ($nav.length) {
      initNavigation();
    }
  });

});

