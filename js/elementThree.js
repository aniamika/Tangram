$(function() {

/*** ELEMENT THREE ***/
// $("body").hide();
// $("body").fadeIn(1000);

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


// rotate elements
  // draw degree of left elements (every 15 degrees)
  var degree = (Math.floor(Math.random()*24)* 15);
  $('.selectable').each(function(){
      console.log(degree)
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
    console.log('rotate');
    rotateElem(this);
  });


// variable for the scores ( score 1 is 1 properly fit element, 7 or more than 7 finished )
var score = 0;


  function rotateElem(elem){
    var rotation1 = $(elem).data('rotate');
    rotation1 += 15;
    // jesli dojdzie do 360stopni to zresetuj
    if(rotation1 == 360) {
      rotation1 = 0;
    }
    $(elem).data('rotate',rotation1);
    Rotate(elem,rotation1);
    // // takie jak ponizej powinno byc zakonczenie funkcji ale musialam przeneisc je dalej bo nie moglam uzyc rotation
    // console.log(rotation1)
    // }


/*** SQUARE ***/
$(function() {
    // draggable square //
    $("#square").draggable({
      revert: true,
      scope: "square",
      //okresla miejsca w jakim moze sie poruszac dany ksztalt - zeby nie dalo sie go przesuwac dalej niz w obrebie rodzica, czyli flexContainera - limit the movement only to flexContainer
      containment: '.flexContainer',
      // lapka zamiast strzałki na kursorze podczas przesuwania
      cursor: 'move',
      // po puszczeniu kursora element wraca na swoje miejsce
      // revert: true
      // jak przesuwamy element to jquery draggable nadaje mu klase ui-dragable-dragging
      // what is the position of the element?:
      create: eventHandler1,
      // start is fired when whe user drag the element
      start: eventHandler2,
      drag: eventHandler3,
      stop: eventHandler4
    });
    // ui - represented drag element
    function eventHandler1(event, ui) {
      console.log('element created!')
    }
    function eventHandler2(event, ui) {
      console.log('user start dragging the element!')
    }
    function eventHandler3(event, ui) {
      // offset relative to the document
      let offsetLeft = parseInt(ui.offset.left);
      let offsetTop = parseInt(ui.offset.top);
      console.log(':::left position: ' + offsetLeft + ' :::top position: ' + offsetTop)
    }
    function eventHandler4(event, ui) {
      console.log('stopped');
    }

  // droppable square //
  $('#squareRight').droppable({
    hoverClass: 'active',
    accept: '#square',
    scope: "square",
    drop: function (event, ui) {
      if( rotation1 == 30 | rotation1 == 120 | rotation1 == 210 | rotation1 == 300 | degree == 15 | degree == 105 | degree == 195 | degree == 285 ) {
      console.log('dobra rotacja')
      $(this).html(ui.draggable.remove().html());
      $(this).css("background-color", "black")
      } else {
      console.log('zla rotacja')
      }

      // check if square was fit properly (if it is remove from the DOM)
      if($('#square').length !== 1) {
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
});


/*** TRIANGLE SMALL1 & TRIANGLE SMALL2 ***/
$(function() {
    // draggable triangleSmall1 //
    $("#triangleSmall1").draggable({
      revert: true,
      scope: "triangleSmall",
      containment: '.flexContainer',
      cursor: 'move',
      create: eventHandler1,
      start: eventHandler2,
      drag: eventHandler3,
      stop: eventHandler4
    });
    // ui - represented drag element
    function eventHandler1(event, ui) {
      console.log('element created!')
    }
    function eventHandler2(event, ui) {
      console.log('user start dragging the element!')
    }
    function eventHandler3(event, ui) {
      // offset relative to the document
      let offsetLeft = parseInt(ui.offset.left);
      let offsetTop = parseInt(ui.offset.top);
      console.log(':::left position: ' + offsetLeft + ' :::top position: ' + offsetTop)
    }
    function eventHandler4(event, ui) {
      console.log('stopped');
    }

      $("#triangleSmall2").draggable({
        revert: true,
        scope: "triangleSmall",
        containment: '.flexContainer',
        cursor: 'move',
        create: eventHandler1,
        start: eventHandler2,
        drag: eventHandler3,
        stop: eventHandler4
      });
      // ui - represented drag element
      function eventHandler1(event, ui) {
        console.log('element created!')
      }
      function eventHandler2(event, ui) {
        console.log('user start dragging the element!')
      }
      function eventHandler3(event, ui) {
        // offset relative to the document
        let offsetLeft = parseInt(ui.offset.left);
        let offsetTop = parseInt(ui.offset.top);
        console.log(':::left position: ' + offsetLeft + ' :::top position: ' + offsetTop)
      }
      function eventHandler4(event, ui) {
        console.log('stopped');
      }

    // droppable triangleSmall1 //
    $('#triangleSmall1Right').droppable({
      hoverClass: 'active',
      // accept: '#triangleSmall1',
      scope: "triangleSmall",
      drop: function (event, ui) {
        if( rotation1 == 180 | degree == 165 ) {
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
    // accept: '#triangleSmall2',
    scope: "triangleSmall",
    drop: function (event, ui) {
      if( rotation1 == 180 | degree == 165 ) {
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
});


/*** TRIANGLE MIDDLE ***/
$(function() {
    // draggable elements //
    $("#triangleMiddle").draggable({
      revert: true,
      scope: "triangleMiddle",
      containment: '.flexContainer',
      cursor: 'move',
      create: eventHandler1,
      start: eventHandler2,
      drag: eventHandler3,
      stop: eventHandler4
    });
    // ui - represented drag element
    function eventHandler1(event, ui) {
      console.log('element created!')
    }
    function eventHandler2(event, ui) {
      console.log('user start dragging the element!')
    }
    function eventHandler3(event, ui) {
      // offset relative to the document
      let offsetLeft = parseInt(ui.offset.left);
      let offsetTop = parseInt(ui.offset.top);
      console.log(':::left position: ' + offsetLeft + ' :::top position: ' + offsetTop)
    }
    function eventHandler4(event, ui) {
      console.log('stopped');
    }

  // droppable elements //
  $('#triangleMiddleRight').droppable({
    // hoverClass: 'active',
    accept: '#triangleMiddle',
    scope: "triangleMiddle",
    drop: function (event, ui) {
      if( rotation1 == 135 | degree == 120 ) {
      console.log('dobra rotacja')
      $(this).html(ui.draggable.remove().html());
      $(this).css("background-color", "black")
      } else {
      console.log('zla rotacja')
      }

      // check if triangleMiddle was fit properly (if it is remove from the DOM)
      if($('#triangleMiddle').length !== 1) {
        score = score + 1
      }
      console.log("score " + score)

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
});

/*** TRIANGLE BIG1 & BIG2 ***/
$(function() {
  // draggable triangleBig1 i triangleBig2 //
  $("#triangleBig1").draggable({
    revert: true,
    scope: "triangleBig",
    containment: '.flexContainer',
    cursor: 'move',
    create: eventHandler1,
    start: eventHandler2,
    drag: eventHandler3,
    stop: eventHandler4
  });
  // ui - represented drag element
  function eventHandler1(event, ui) {
    console.log('element created!')
  }
  function eventHandler2(event, ui) {
    console.log('user start dragging the element!')
  }
  function eventHandler3(event, ui) {
    // offset relative to the document
    let offsetLeft = parseInt(ui.offset.left);
    let offsetTop = parseInt(ui.offset.top);
    console.log(':::left position: ' + offsetLeft + ' :::top position: ' + offsetTop)
  }
  function eventHandler4(event, ui) {
    console.log('stopped');
  }

  $("#triangleBig2").draggable({
    revert: true,
    scope: "triangleBig",
    containment: '.flexContainer',
    cursor: 'move',
    create: eventHandler1,
    start: eventHandler2,
    drag: eventHandler3,
    stop: eventHandler4
  });
  // ui - represented drag element
  function eventHandler1(event, ui) {
    console.log('element created!')
  }
  function eventHandler2(event, ui) {
    console.log('user start dragging the element!')
  }
  function eventHandler3(event, ui) {
    // offset relative to the document
    let offsetLeft = parseInt(ui.offset.left);
    let offsetTop = parseInt(ui.offset.top);
    console.log(':::left position: ' + offsetLeft + ' :::top position: ' + offsetTop)
  }
  function eventHandler4(event, ui) {
    console.log('stopped');
  }


// droppable triangleBig //
$('#triangleBig1Right').droppable({
  hoverClass: 'active',
  scope: "triangleBig",
  drop: function (event, ui) {
    if( rotation1 == 225 | degree == 210 ) {
    console.log('dobra rotacja')
    $(this).html(ui.draggable.remove().html());
    $(this).css("background-color", "black")
    } else {
    console.log('zla rotacja')
    }

    // check if triangleBig1 or triangleBig2 was fit properly (if it is remove from the DOM)
    if($('#triangleBig1').length !== 1 | $('#triangleBig2').length !== 1) {
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

  },
});

// droppable triangleBig //
$('#triangleBig2Right').droppable({
  hoverClass: 'active',
  scope: "triangleBig",
  drop: function (event, ui) {
    if( rotation1 == 135 | degree == 120 ) {
    console.log('dobra rotacja')
    $(this).html(ui.draggable.remove().html());
    $(this).css("background-color", "black")
    } else {
    console.log('zla rotacja')
    }

    // check if triangleBig1 or triangleBig2 was fit properly (if it is remove from the DOM)
    if($('#triangleBig1').length !== 1 | $('#triangleBig2').length !== 1) {
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

  },
});
});


/*** PARALLELOGRAM ***/
$(function() {
    // draggable parallelogram //
    $("#parallelogram").draggable({
      revert: true,
      scope: "parallelogram",
      containment: '.flexContainer',
      cursor: 'move',
      create: eventHandler1,
      start: eventHandler2,
      drag: eventHandler3,
      stop: eventHandler4
    });
    // ui - represented drag element
    function eventHandler1(event, ui) {
      console.log('element created!')
    }
    function eventHandler2(event, ui) {
      console.log('user start dragging the element!')
    }
    function eventHandler3(event, ui) {
      // offset relative to the document
      let offsetLeft = parseInt(ui.offset.left);
      let offsetTop = parseInt(ui.offset.top);
      console.log(':::left position: ' + offsetLeft + ' :::top position: ' + offsetTop)
    }
    function eventHandler4(event, ui) {
      console.log('stopped');
    }

  // droppable parallelogram //
  $('#parallelogramRight').droppable({
    accept: '#parallelogram',
    scope: "parallelogram",
    drop: function (event, ui) {
      if( rotation1 == 90 | rotation1 == 270 | degree == 75 | degree == 255 ) {
      console.log('dobra rotacja')
      $(this).html(ui.draggable.remove().html());
      $(this).css("background-color", "black")
      } else {
      console.log('zla rotacja')
      }

      // check if parallelogram was fit properly (if it is remove from the DOM)
      if($('#parallelogram').length !== 1) {
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

    },
  });
});



  // zakonczenie funkcji jest tu bo inaczej nie moge uzyc zmiennej rotation w if
  console.log(rotation1)
  }
});
