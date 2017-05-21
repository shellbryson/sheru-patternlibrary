define(function (require) {
  'use strict';

  const navPanel = document.querySelector('.js-nav');
  const navPanelControls = document.querySelector('.js-nav-control');
  const searchPanel = document.querySelector('.js-search');
  const toggleMenu = document.querySelector('.js-toggleMenu');
  const toggleSearch = document.querySelector('.js-toggleSearch');
  const _navOnClass = 'su-nav__secondary--show';
  const _searchOnClass = 'su-nav-search--show';

  const pagePanel = document.querySelector(".js-wrapper");
  const _pageMenuOnClass = "su-wrapper--menu-open";

  function initnav() {
    toggleMenu.addEventListener('click', function (e) {
      e.preventDefault();
      if (navPanel.classList.contains(_navOnClass)) {
        // hide
        navPanel.classList.remove(_navOnClass);
        navPanel.setAttribute("aria-hidden", "true");
        navPanel.setAttribute("aria-expanded", "false");

        searchPanel.classList.remove(_searchOnClass);
        searchPanel.setAttribute("aria-hidden", "true");
        searchPanel.setAttribute("aria-expanded", "false");

        pagePanel.classList.remove(_pageMenuOnClass);
      } else {
        // show
        navPanel.classList.add(_navOnClass);
        navPanel.setAttribute("aria-hidden", "false");
        navPanel.setAttribute("aria-expanded", "true");

        searchPanel.classList.add(_searchOnClass);
        searchPanel.setAttribute("aria-hidden", "false");
        searchPanel.setAttribute("aria-expanded", "true");

        pagePanel.classList.add(_pageMenuOnClass);
      }
    });

    toggleSearch.addEventListener('click', function (e) {
      e.preventDefault();
      if (searchPanel.classList.contains(_searchOnClass)) {
        // hide
        searchPanel.classList.remove(_searchOnClass);
        searchPanel.setAttribute("aria-hidden", "true");
        searchPanel.setAttribute("aria-expanded", "false");

        pagePanel.classList.remove(_pageMenuOnClass);
      } else {
        // show
        searchPanel.classList.add(_searchOnClass);
        searchPanel.setAttribute("aria-hidden", "false");
        searchPanel.setAttribute("aria-expanded", "true");

        pagePanel.classList.add(_pageMenuOnClass);

      }
    });
  }

  initnav();

});
