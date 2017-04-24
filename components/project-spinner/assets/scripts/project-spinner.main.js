define(function (require) {
  'use strict';

  const $ = require('jquery');
  const TweenMax = require('TweenMax');
  const $btnTogglePause = $('.js-pause');
  const $spinner = $('.su-project-spinner__pulse');
  const $spinnerInner = $('#pulse-inner');
  const $spinnerOuter = $('#pulse-outer');
  const $spinnerQuad = $('#pulse-quad');
  const strings = {
    buttonPause: {
      pause: 'Pause animation',
      resume: 'Resume animation'
    }
  };
  const state = {
    animated: true
  };

  // Creates a new svg element [id] attached to [parentID]
  class SVGElement {
    constructor(id, cssClass, x, y) {
      let _svg = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      _svg.setAttributeNS(null, 'id', id);
      _svg.setAttributeNS(null, 'cx', x);
      _svg.setAttributeNS(null, 'cy', y);
      _svg.setAttributeNS(null, 'r', 20);
      _svg.setAttributeNS(null, 'fill', 'black');
      _svg.setAttributeNS(null, 'stroke', 'none');
      _svg.setAttributeNS(null, 'class', cssClass);
      this.svg = _svg;
    }
  }

  // Creates a clone of svg element [id] as [newID]
  function cloneSVG(id, newID, x, y, parentID) {
    const node = document.getElementById(id);
    const newNode = node.cloneNode('true');
    newNode.id = newID;
    newNode.setAttributeNS(null, 'cx', x);
    newNode.setAttributeNS(null, 'cy', y);
    document.getElementById(parentID).appendChild(newNode);
  }

  // Creates a new project
  function createProject(id, x, y) {
    let project = new SVGElement(id, 'spinner__project', x, y, 'Spinner');
    let parent = document.getElementById('Spinner');
    parent.appendChild(project.svg);
  }

  function initSpinner() {

    // Master switches

    $btnTogglePause.text( strings.buttonPause.pause );

    $btnTogglePause.on('click', function () {
      if ( state.animated ) {
        $( this ).text( strings.buttonPause.resume );
        animOuterRing.pause();
        animQuad.pause();
        state.animated = false;
      } else {
        $( this ).text( strings.buttonPause.pause );
        animOuterRing.play();
        animQuad.play();
        state.animated = true;
      }
    });

    // Animation

    let animOuterRing = new TweenMax.to(
      $spinnerOuter, 15, {
        rotation: 360, transformOrigin: 'center center', ease: Linear.easeNone, repeat:-1
      }, {
        timeScale: 1
      }
    );

    let animQuad = new TweenMax.to(
      $spinnerQuad, 60, {
        rotation: 360, transformOrigin: 'center center', ease: Linear.easeNone, repeat:-1
      }, {
        timeScale: 1
      }
    );

    // Interactions

    $spinner.on('mouseover', () => {
        TweenLite.to(
          animOuterRing, 1, { timeScale: 10 }
        );
    });

    $spinner.on('mouseout', () => {
        TweenLite.to(
          animOuterRing, 1, { timeScale: 1 }
        );
    });

    // Creation

    createProject( 'test1', 200, 200 );

    cloneSVG( 'test1', 'test2', 300, 300, 'Spinner' );
    cloneSVG( 'test1', 'test3', 300, 340, 'Spinner' );
    cloneSVG( 'test1', 'test4', 300, 380, 'Spinner' );
  }

  initSpinner();

});
