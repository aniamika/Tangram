$(function() {

/*** ELEMENT FIVE ***/

// remove bug - jump problems while dragging elements
  // backup original handler
  var _mouseStart = $.ui.draggable.prototype._mouseStart;
  $.ui.draggable.prototype._mouseStart = function(event) {
  //remove the transform
  var transform = this.element.css('transform');
  this.element.css('transform', 'none');
  // call original handler
  var result = _mouseStart.call(this, event);
  //restore the transform
  this.element.css('transform', transform);
  return result;
  };


// ROTATE ELEMENTS
  var degree = 15;

  $('.selectable').each(function(){
    $(this).data('rotate', degree);
    rotateElem(this);
    $(this).show();
  })

  // rotate on init
  function Rotate(elem, degrees) {
    $(elem).css({
      '-webkit-transform' : 'rotate('+ degrees +'deg)',
      '-moz-transform' : 'rotate('+ degrees +'deg)',
      '-ms-transform' : 'rotate('+ degrees +'deg)',
      'transform' : 'rotate('+ degrees +'deg)'
    });
  };

  $('.flexContainer').on('click','.rotate:not(.ui-dragable-dragging)',function() {
    rotateElem(this);
  });

  // right rotation
  function rotateElem(elem){
    rotation = $(elem).data('rotate');
    rotation += 15;
    // if the rotation is equall to 360degrees, reset(change to 0)
    if(rotation == 360) {
      rotation = 0;
    }
    $(elem).data('rotate',rotation);
    Rotate(elem,rotation);
    // console.log(rotation + " - rotation")
    }

  // left rotation
  function rotateElemLeft(elem){
    rotation = $(elem).data('rotate');
    rotation -= 15;
    // if the rotation is equall to 360degrees, reset(change to 0)
    if(rotation == 360) {
      rotation = 0;
    }
    $(elem).data('rotate',rotation);
    Rotate(elem,rotation);
    // console.log(rotation + " - rotation")
    }

  // rotate on right and left arrow keys
  $(document).keyup(function(e) {
    let selectableElements =  $('.rotate:not(.ui-dragable-dragging)');
      if (e.which === 39) {
        rotateElem(selectableElements);
        // console.log('right arrow');
      } else if (e.which === 37) {
        rotateElemLeft(selectableElements);
        // console.log('left arrow');
      }
  });

// IF YOU WIN - GO TO PAGE WITH ALL ELEMENTS
  // variable for the scores ( score 1 is 1 properly fit element, 7 or more than 7 finished )
  var score = 0;
  // go to page with another shapes to choose
  function win() {
    if(score >= 7) {
     $("body").fadeOut(1000,function(){
        window.history.back();
     })
    }
  }


/*** SQUARE ***/

  // draggable square
  $("#square").draggable({
    // after place element in the wrong position it will go back to the original position
    revert: true,
    // the value of the scope define matching element
    scope: "square",
    // limit the movement of the element only to flexContainer
    containment: '.flexContainer',
    // change coursor to move - hand
    cursor: 'move',
  });

  // droppable square
  $('#squareRight').droppable({
    hoverClass: 'active',
    scope: "square",
    drop: function (event, ui) {
      if( rotation == 75 | rotation == 165 | rotation == 255 | rotation == 345 ) {
        score = score + 1
        // console.log('square rotated right')
        console.log('score: ' + score)
        $(this).html(ui.draggable.remove().html());
        $(this).css("background-color", "black")
      } else {
        // console.log('square rotated wrong')
      }
      // if win go to page with another shapes to choose
      win()
    }
  });



/*** PARALLELOGRAM ***/

  // draggable parallelogram
  $("#parallelogram").draggable({
    revert: true,
    scope: "parallelogram",
    containment: '.flexContainer',
    cursor: 'move',
  });

  // droppable parallelogram
  $('#parallelogramRight').droppable({
    hoverClass: 'active',
    scope: "parallelogram",
    drop: function (event, ui) {
      // check if parallelogram was fit properly (if it is remove from the DOM)
      if( rotation == 45 | rotation == 225 ) {
        score = score + 1
        // console.log('parallelogram rotated right')
        console.log('score: ' + score)
        $(this).html(ui.draggable.remove().html());
        $(this).css("background-color", "black")
      } else {
        // console.log('parallelogram rotated wrong')
      }
      // if win go to page with another shapes to choose
      win()
    }
  });



/*** TRIANGLE SMALL1 & TRIANGLE SMALL2 ***/

  // draggable triangleSmall1
  $("#triangleSmall1").draggable({
    revert: true,
    scope: "triangleSmall1",
    scope: "triangleSmall2",
    containment: '.flexContainer',
    cursor: 'move',
  });

  // draggable triangleSmall2
  $("#triangleSmall2").draggable({
    revert: true,
    scope: "triangleSmall1",
    scope: "triangleSmall2",
    containment: '.flexContainer',
    cursor: 'move',
  });

  // droppable triangleSmall1
  $('#triangleSmall1Right').droppable({
    hoverClass: 'active',
    scope: "triangleSmall1",
    scope: "triangleSmall2",
    drop: function (event, ui) {
      if( rotation == 225 ) {
        score = score + 1
        // console.log('triangleSmall rotation right')
        console.log('score: ' + score)
        $(this).html(ui.draggable.remove().html());
        $(this).css("background-color", "black");
        // if you match element properly to triangleSmall1Right - disable from dropping
        $('#triangleSmall1Right').droppable( "option", "disabled", true );
      } else {
        // console.log('triangleSmall rotation wrong')
      }
      // if win go to page with another shapes to choose
      win()
    }
  });

  // droppable triangleSmall2 //
  $('#triangleSmall2Right').droppable({
    hoverClass: 'active',
    scope: "triangleSmall1",
    scope: "triangleSmall2",
    drop: function (event, ui) {
      if( rotation == 300 ) {
        score = score + 1
        // console.log('triangleSmall rotation right')
        console.log('score: ' + score)
        $(this).html(ui.draggable.remove().html());
        $(this).css("background-color", "black");
        // if you match element properly to triangleSmall2Right - disable from dropping
        $('#triangleSmall2Right').droppable( "option", "disabled", true );
      } else {
        // console.log(('triangleSmall rotation wrong')
      }
      // if win go to page with another shapes to choose
      win()
    }
  });



/*** TRIANGLE MIDDLE ***/

  // draggable triangleMiddle
  $("#triangleMiddle").draggable({
    revert: true,
    scope: "triangleMiddle",
    containment: '.flexContainer',
    cursor: 'move',
  });

  // droppable triangleMiddle
  $('#triangleMiddleRight').droppable({
    hoverClass: 'active',
    scope: "triangleMiddle",
    drop: function (event, ui) {
      // check if triangleMiddle was fit properly (if it is remove from the DOM)
      if( rotation == 15 ) {
        score = score + 1
        // console.log('triangleMiddle rotation right')
        console.log('score: ' + score)
        $(this).html(ui.draggable.remove().html());
        $(this).css("background-color", "black")
      } else {
        // console.log('triangleMiddle rotation wrong')
      }
      // if win go to page with another shapes to choose
      win()
    }
  });



/*** TRIANGLE BIG1 & BIG2 ***/

  // draggable triangleBig1
  $("#triangleBig1").draggable({
    revert: true,
    scope: "triangleBig1",
    scope: "triangleBig2",
    containment: '.flexContainer',
    cursor: 'move',
  });

  // draggable triangleBig2
  $("#triangleBig2").draggable({
    revert: true,
    scope: "triangleBig1",
    scope: "triangleBig2",
    containment: '.flexContainer',
    cursor: 'move',
  });

  // droppable triangleBig1
  $('#triangleBig1Right').droppable({
    hoverClass: 'active',
    scope: "triangleBig1",
    scope: "triangleBig2",
    drop: function (event, ui) {
      if( rotation == 150 ) {
        score = score + 1
        // console.log('triangleBig rotation right')
        console.log('score: ' + score)
        $(this).html(ui.draggable.remove().html());
        $(this).css("background-color", "black");
        // if you match element properly to triangleBig1Right - disable from dropping
        $('#triangleBig1Right').droppable( "option", "disabled", true );
      } else {
        // console.log('triangleBig rotation wrong')
      }
      // if win go to page with another shapes to choose
      win()
    }
  });

  // droppable triangleBig2
  $('#triangleBig2Right').droppable({
    hoverClass: 'active',
    scope: "triangleBig1",
    scope: "triangleBig2",
    drop: function (event, ui) {
      if( rotation == 330 ) {
        score = score + 1
        // console.log('triangleBig rotation right')
        console.log('score: ' + score)
        $(this).html(ui.draggable.remove().html());
        $(this).css("background-color", "black");
        // if you match element properly to triangleBig2Right - disable from dropping
        $('#triangleBig2Right').droppable( "option", "disabled", true );
      } else {
        // console.log('triangleBig rotation wrong')
      }
      // if win go to page with another shapes to choose
      win()
    }
  });


});
