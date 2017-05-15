define(function (require) {
  'use strict';

  const navPanel = document.querySelector('.js-navigation');
  const searchPanel = document.querySelector('.js-search');
  const toggleMenu = document.querySelector('.js-toggleMenu');
  const toggleSearch = document.querySelector('.js-toggleSearch');
  const _menuClass = 'su-navigation__menu-secondary--show';
  const _searchClass = 'su-navigation-search--show';

  function initNavigation() {
    toggleMenu.addEventListener('click', function (e) {
      e.preventDefault();
      if (navPanel.classList.contains(_menuClass)) {
        navPanel.classList.remove(_menuClass);
        searchPanel.classList.remove(_searchClass);
      } else {
        navPanel.classList.add(_menuClass);
        searchPanel.classList.add(_searchClass);
      }
    });

    toggleSearch.addEventListener('click', function (e) {
      e.preventDefault();
      if (searchPanel.classList.contains(_searchClass)) {
        searchPanel.classList.remove(_searchClass);
      } else {
        searchPanel.classList.add(_searchClass);
      }
    });
  }

  initNavigation();

});
