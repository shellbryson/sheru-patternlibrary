define(function (require) {
  'use strict';

  const navPanel = document.querySelector('.js-nav');
  const body = document.querySelector('body');
  const searchPanel = document.querySelector('.js-search');
  const toggleNavigation = document.querySelector('.js-toggleMenu');
  const toggleSearch = document.querySelector('.js-toggleSearch');
  const _navOnClass = 'su-nav__secondary--show';
  const _searchOnClass = 'su-nav-search--show';
  const _navOnControlOnClass = 'su-nav__action--show';
  const _showMenu = 'su-menu-open';

  function initnav() {

    document.addEventListener("keydown", handleKeys, false);

    toggleNavigation.addEventListener('click', function (e) {
      e.preventDefault();
      if (navPanel.classList.contains(_navOnClass)) {
        closeNavigation();
      } else {
        openNavigation();
      }
    });

    toggleSearch.addEventListener('click', function (e) {
      e.preventDefault();
      if (searchPanel.classList.contains(_searchOnClass)) {
        closeSearch();
      } else {
        openSearch();
      }
    });
  }

  function handleKeys(e) {
    let keyCode = e.keyCode;
    if ( keyCode==27 ) {
      closeNavigation();
    }
  }

  function openNavigation() {
    navPanel.classList.add(_navOnClass);
    navPanel.setAttribute("aria-hidden", "false");
    navPanel.setAttribute("aria-expanded", "true");
    openSearch();
  }

  function closeNavigation() {
    navPanel.classList.remove(_navOnClass);
    navPanel.setAttribute("aria-hidden", "true");
    navPanel.setAttribute("aria-expanded", "false");
    closeSearch();
  }

  function openSearch() {
    searchPanel.classList.add(_searchOnClass);
    searchPanel.setAttribute("aria-hidden", "false");
    searchPanel.setAttribute("aria-expanded", "true");
    body.classList.add(_showMenu);
  }

  function closeSearch() {
    searchPanel.classList.remove(_searchOnClass);
    searchPanel.setAttribute("aria-hidden", "true");
    searchPanel.setAttribute("aria-expanded", "false");
    body.classList.remove(_showMenu);
  }

  if (navPanel) {
    initnav();
  }

});
