define(function (require) {
  'use strict';

  var $ = require('jquery');
  var TweenMax = require('TweenMax');
  var $spinner = $('.su-project-spinner__pulse');

  var $spinnerOuter = $("#pulse-outer");

  function cloneSVG(id, newID, x, y) {
    var node = document.getElementById(id);
    var newNode = node.cloneNode("true");
    newNode.id = newID;
    newNode.setAttributeNS(null, "cx", x);
    newNode.setAttributeNS(null, "cy", y);
    document.getElementById("Home").appendChild(newNode);
  }

  function createProject(id, x, y) {
    var project = document.createElementNS("http://www.w3.org/2000/svg","circle");
    project.setAttributeNS(null, "id", id);
    project.setAttributeNS(null, "cx", x);
    project.setAttributeNS(null, "cy", y);
    project.setAttributeNS(null, "r", 20);
    project.setAttributeNS(null, "fill","black");
    project.setAttributeNS(null, "stroke","none");
    project.setAttributeNS(null, "class","spinner__project");
    document.getElementById("Home").appendChild(project);
  }

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

    createProject("test1", 200, 200);

    cloneSVG("test1", "test2", 300, 300);
    cloneSVG("test1", "test3", 300, 340);
    cloneSVG("test1", "test4", 300, 380);
  }

  initSpinner();

});
