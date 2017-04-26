define(function (require) {
  'use strict';

  const navPanels = document.getElementsByClassName('js-navigation');
  const searchPanels = document.getElementsByClassName('js-search');
  const toggleMenu = document.getElementsByClassName('js-toggleMenu');
  const toggleSearch = document.getElementsByClassName('js-toggleSearch');
  const _menuClass = 'su-navigation__menu--show';
  const _searchClass = 'su-navigation-search--show';

  const navPanelEl = navPanels[0];
  const searchPanelEl = searchPanels[0];

  function initNavigation() {
    toggleMenu[0].addEventListener('click', function (e) {
      e.preventDefault();
      if (navPanelEl.classList.contains(_menuClass)) {
        navPanelEl.classList.remove(_menuClass);
        searchPanelEl.classList.remove(_searchClass);
      } else {
        navPanelEl.classList.add(_menuClass);
        searchPanelEl.classList.add(_searchClass);
      }
    });

    toggleSearch[0].addEventListener('click', function (e) {
      e.preventDefault();
      if (searchPanelEl.classList.contains(_searchClass)) {
        searchPanelEl.classList.remove(_searchClass);
      } else {
        searchPanelEl.classList.add(_searchClass);
      }
    });
  }

  initNavigation();

});
