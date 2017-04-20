define(function (require) {
  'use strict';

  var $ = require('jquery');
  var $spinner = $('.su-project-spinner__pulse');
  var TweenMax = require('TweenMax');

  var $spinnerOuter = $("#pulse-outer");

  function initSpinner() {

    var outerRing = new TweenMax.to(
      $spinnerOuter, 160, {
        rotation: 360, transformOrigin:"center center", ease: Linear.easeNone, repeat:-1
      },{
        timeScale: 1
      }
    );

    $spinner.on("mouseover", function() {
        TweenLite.to(
          outerRing, 1, {timeScale: 50}
        );
    });

    $spinner.on("mouseout", function() {
        TweenLite.to(
          outerRing, 1, {timeScale: 1}
        );
    });

  }

  initSpinner();

});
