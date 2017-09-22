$(function() {

/*** ELEMENT ONE ***/

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


// ROTATE ELEMENTS //

  // draw degree of left elements (every 15 degrees)
  var degree = (Math.floor(Math.random()*24)* 15);
  $('.selectable').each(function(){
    $(this).data('rotate', degree);
    rotateElem(this);
    $(this).show();
  })
  console.log(degree + " this is Match.random degree")

  // Rotate on init
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


// variable for the scores ( score 1 is 1 properly fit element, 7 or more than 7 finished )
var score = 0;

  function rotateElem(elem){
    rotation = $(elem).data('rotate');
    rotation += 15;
    // jesli dojdzie do 360stopni to zresetuj
    if(rotation == 360) {
      rotation = 0;
    }
    $(elem).data('rotate',rotation);
    Rotate(elem,rotation);
    console.log(rotation + " - rotation")
  }



/*** SQUARE ***/
    // draggable square
    $("#square").draggable({
      // po puszczeniu kursora element wraca na swoje miejsce
      revert: true,
      scope: "square",
      //okresla miejsca w jakim moze sie poruszac dany ksztalt - zeby nie dalo sie go przesuwac dalej niz w obrebie rodzica, czyli flexContainera - limit the movement only to flexContainer
      containment: '.flexContainer',
      // lapka zamiast strzałki na kursorze podczas przesuwania
      cursor: 'move',
      // // jak przesuwamy element to jquery draggable nadaje mu klase ui-dragable-dragging
      // // what is the position of the element?:
      // create: eventHandler1,
      // // start is fired when whe user drag the element
      // start: eventHandler2,
      // drag: eventHandler3,
      // stop: eventHandler4
    });
    // // ui - represented drag element
    // function eventHandler1(event, ui) {
    //   console.log('element created!')
    // }
    // function eventHandler2(event, ui) {
    //   console.log('user start dragging the element!')
    // }
    // function eventHandler3(event, ui) {
    //   // offset relative to the document
    //   let offsetLeft = parseInt(ui.offset.left);
    //   let offsetTop = parseInt(ui.offset.top);
    //   console.log(':::left position: ' + offsetLeft + ' :::top position: ' + offsetTop)
    // }
    // function eventHandler4(event, ui) {
    //   console.log('stopped');
    // }

  // droppable square
  $('#squareRight').droppable({
    hoverClass: 'active',
    scope: "square",
    drop: function (event, ui) {
      if( rotation == 0 | rotation == 90 | rotation == 180 | rotation == 270) {
        score = score + 1
        console.log('dobra rotacja')
        console.log('score: ' + score)
        $(this).html(ui.draggable.remove().html());
        $(this).css("background-color", "black")
      } else {
      console.log('zla rotacja')
      }
      }
    });


/*** TRIANGLE SMALL1 & TRIANGLE SMALL2 ***/
    // draggable triangleSmall1
    $("#triangleSmall1").draggable({
      revert: true,
      scope: "triangleSmall",
      containment: '.flexContainer',
      cursor: 'move',
    });

      $("#triangleSmall2").draggable({
        revert: true,
        scope: "triangleSmall",
        containment: '.flexContainer',
        cursor: 'move',
      });

    // droppable triangleSmall1
    $('#triangleSmall1Right').droppable({
      hoverClass: 'active',
      scope: "triangleSmall",
      drop: function (event, ui) {
        if( rotation == 135 ) {
        console.log('dobra rotacja')
        $(this).html(ui.draggable.remove().html());
        $(this).css("background-color", "black")
        } else {
        console.log('zla rotacja')
        }

        // check if triangleSmall1 or triangleSmall2 was fit properly (if it is remove from the DOM)
        if($('#triangleSmall1').length !== 1 | $('#triangleSmall2').length !== 1) {
          score = score + 1
        }
        console.log("score is " + score)

        // go to page with another shapes to choose
        if(score >= 7) {
          $(function(){
             $("body").fadeOut(1000,function(){
                window.location.href = 'allElements.html';
             })
          });
        }

      }
    });

  // droppable triangleSmall2 //
  $('#triangleSmall2Right').droppable({
    hoverClass: 'active',
    scope: "triangleSmall",
    drop: function (event, ui) {
      if( rotation == 0 ) {
      console.log('dobra rotacja')
      $(this).html(ui.draggable.remove().html());
      $(this).css("background-color", "black")
      } else {
      console.log('zla rotacja')
      }

      // check if triangleSmall1 or triangleSmall2 was fit properly (if it is remove from the DOM)
      if($('#triangleSmall1').length !== 1 | $('#triangleSmall2').length !== 1) {
        score = score + 1
      }
      console.log("score is " + score)

      // // go to page with another shapes to choose
      // if(score >= 7) {
      //   $(function(){
      //      $("body").fadeOut(1000,function(){
      //         window.location.href = 'allElements.html';
      //      })
      //   });
      // }

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
      if( rotation == 0 | rotation == 180 ) {
        score = score + 1
        console.log('dobra rotacja')
        console.log('score: ' + score)
        $(this).html(ui.draggable.remove().html());
        $(this).css("background-color", "black")
      } else {
        console.log('zla rotacja')
      }
      // // go to page with another shapes to choose
      // if(score >= 7) {
      //   $(function(){
      //      $("body").fadeOut(1000,function(){
      //         window.location.href = 'allElements.html';
      //      })
      //   });
      // }

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
        if( rotation == 90 ) {
          score = score + 1
          console.log('dobra rotacja')
          console.log('score: ' + score)
          $(this).html(ui.draggable.remove().html());
          $(this).css("background-color", "black")
        } else {
          console.log('zla rotacja')
        }
      }
      });

// droppable triangleBig2
  $('#triangleBig2Right').droppable({
    hoverClass: 'active',
    scope: "triangleBig1",
    scope: "triangleBig2",
    drop: function (event, ui) {
      if( rotation == 45 ) {
        score = score + 1
        console.log('dobra rotacja')
        console.log('score: ' + score)
        $(this).html(ui.draggable.remove().html());
        $(this).css("background-color", "black")
      } else {
      console.log('zla rotacja')
      }
    },
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
      if( rotation == 135 | rotation == 315 ) {
        score = score + 1
        console.log('dobra rotacja')
        console.log('score: ' + score)
        $(this).html(ui.draggable.remove().html());
        $(this).css("background-color", "black")
      } else {
        console.log('zla rotacja')
      }
    }
  });


// go to page with another shapes to choose
if(score >= 7) {
  $(function(){
     $("body").fadeOut(1000,function(){
        window.location.href = 'allElements.html';
     })
  });
}


});
