define(function (require) {
  'use strict';

  const $ = require('jquery');
  const TweenMax = require('TweenMax');
  var $btnTogglePause = $(".js-pause");
  var $spinner = $('.su-project-spinner__pulse');
  var $spinnerInner = $("#pulse-inner");
  var $spinnerOuter = $("#pulse-outer");
  var $spinnerQuad = $("#pulse-quad");
  var strings = {
    buttonPause: {
      pause: "Pause animation",
      resume: "Resume animation"
    }
  }
  var state = {
    animated: true
  }

  // test

  // Creates a clone of svg element [id] as [newID]
  function cloneSVG(id, newID, x, y, parentID) {
    var node = document.getElementById(id);
    var newNode = node.cloneNode("true");
    newNode.id = newID;
    newNode.setAttributeNS(null, "cx", x);
    newNode.setAttributeNS(null, "cy", y);
    document.getElementById(parentID).appendChild(newNode);
  }

  // Creates a new svg element [id] attached to [parentID]
  function createSVGElement(id, cssClass, x, y, parentID) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg","circle");
    svg.setAttributeNS(null, "id", id);
    svg.setAttributeNS(null, "cx", x);
    svg.setAttributeNS(null, "cy", y);
    svg.setAttributeNS(null, "r", 20);
    svg.setAttributeNS(null, "fill","black");
    svg.setAttributeNS(null, "stroke","none");
    svg.setAttributeNS(null, "class", cssClass);
    document.getElementById(parentID).appendChild(svg);
  }

  // Creates a new project
  function createProject(id, x, y) {
    createSVGElement(id, "spinner__project", x, y, "Spinner")
  }

  function initSpinner() {

    // Master switches

    $btnTogglePause.text( strings.buttonPause.pause );

    $btnTogglePause.on("click", function() {
      if (state.animated) {
        state.animated = false;
        $(this).text(strings.buttonPause.resume);
        animOuterRing.pause();
        animQuad.pause();
      } else {
        state.animated = true;
        $(this).text(strings.buttonPause.pause);
        animOuterRing.play();
        animQuad.play();
      }
    });

    // Animation

    var animOuterRing = new TweenMax.to(
      $spinnerOuter, 15, {
        rotation: 360, transformOrigin:"center center", ease: Linear.easeNone, repeat:-1
      },{
        timeScale: 1
      }
    );

    var animQuad = new TweenMax.to(
      $spinnerQuad, 60, {
        rotation: 360, transformOrigin:"center center", ease: Linear.easeNone, repeat:-1
      },{
        timeScale: 1
      }
    );

    // Interactions

    $spinner.on("mouseover", function() {
        TweenLite.to(
          animOuterRing, 1, {timeScale: 10}
        );
    });

    $spinner.on("mouseout", function() {
        TweenLite.to(
          animOuterRing, 1, {timeScale: 1}
        );
    });

    // Creation

    createProject("test1", 200, 200);

    cloneSVG("test1", "test2", 300, 300, "Spinner");
    cloneSVG("test1", "test3", 300, 340, "Spinner");
    cloneSVG("test1", "test4", 300, 380, "Spinner");
  }

  initSpinner();

});
