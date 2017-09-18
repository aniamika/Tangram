$(function() {

// remove jump problems while dragging elements
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

// ELEMENT ONE PAGE //
// rotate elements //
  // var rotation = 0;
  // losowanie klocków po lewej o każde 15 stopni
  var degree = (Math.floor(Math.random()*24)* 15);
  $('.selectable').each(function(){
      console.log(degree)
      $(this).data('rotate', degree);
      rotateElem(this);
      $(this).show();
  })
  console.log(degree + " to jest degree")
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

  function rotateElem(elem){
    var rotation1 = $(elem).data('rotate');
    rotation1 += 15;
    // jesli dojdzie do 360stopni to zresetuj
    if(rotation1 == 360) {
      rotation1 = 0;
    }
    $(elem).data('rotate',rotation1);
    Rotate(elem,rotation1);
    // takie jak ponizej powinno byc zakonczenie funkcji ale musialam przeneisc je dalej bo nie moglam uzyc rotation
    // console.log(rotation)
    //   }



/*** SQUARE ***/
$(function() {
    // draggable elements //
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

  // droppable elements //
  $('#squareRight').droppable({
    hoverClass: 'active',
    accept: '#square',
    scope: "square",
    drop: function (event, ui) {
      if( rotation1 == 0 | degree == 0 | rotation1 == 90 | rotation1 == 180 | rotation1 == 270 | degree == 90 | degree == 180 | degree == 270) {
      console.log('dobra rotacja')
      $(this).html(ui.draggable.remove().html());
      $(this).css("background-color", "black")
      } else {
      console.log('zla rotacja')
      }
    },
    // over: function (event, ui) {
    // $(this).css("background-color", "pink")
    // // $( this ).addClass( "ui-state-highlight" )
    // },
    // out: function (event, ui) {
    // $(this).css("background-color", "lightgreen")
    // }
              // drop: eventHandlerFunction
  });
  // function eventHandlerFunction(event, ui) {
  //   let draggableElement = ui.draggable;
  //   draggableElement.css('background', "lightblue")
  //   console.log(draggableElement);
  // }
  });


/*** TRIANGLE SMALL1 & TRIANGLE SMALL2 ***/
    $(function() {
        // draggable elements //
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

        // droppable elements //
        $('#triangleSmall1Right').droppable({
          hoverClass: 'active',
          scope: "triangleSmall",
          drop: function (event, ui) {
            if( rotation1 == 135 | degree == 135) {
            console.log('dobra rotacja')
            $(this).html(ui.draggable.remove().html());
            $(this).css("background-color", "black")
            } else {
            console.log('zla rotacja')
            }
          }
        });

      $('#triangleSmall2Right').droppable({
        hoverClass: 'active',
        // accept: '#triangleSmall2',
        scope: "triangleSmall",
        drop: function (event, ui) {
          if( rotation1 == 0 | degree == 0) {
          console.log('dobra rotacja')
          $(this).html(ui.draggable.remove().html());
          $(this).css("background-color", "black")
          } else {
          console.log('zla rotacja')
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
        if( rotation1 == 0 | degree == 0) {
        console.log('dobra rotacja')
        $(this).html(ui.draggable.remove().html());
        $(this).css("background-color", "black")
        } else {
        console.log('zla rotacja')
        }
      },
    });
  });

  /*** TRIANGLE BIG1 & BIG2 ***/
  $(function() {
      // draggable elements //
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


    // droppable elements //
    $('#triangleBig1Right').droppable({
      hoverClass: 'active',
      scope: "triangleBig",
      drop: function (event, ui) {
        if( rotation1 == 90 | degree == 90) {
        console.log('dobra rotacja')
        $(this).html(ui.draggable.remove().html());
        $(this).css("background-color", "black")
        } else {
        console.log('zla rotacja')
        }
      },
    });
    $('#triangleBig2Right').droppable({
      hoverClass: 'active',
      scope: "triangleBig",
      drop: function (event, ui) {
        if( rotation1 == 45 | degree == 45) {
        console.log('dobra rotacja')
        $(this).html(ui.draggable.remove().html());
        $(this).css("background-color", "black")
        } else {
        console.log('zla rotacja')
        }
      },
    });
  });


    /*** PARALLELOGRAM ***/
    $(function() {
        // draggable elements //
        $("#parallelogram").draggable({
          revert: true,
          scope: "parallelogram",
          // containment: '.flexContainer',
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
      $('#parallelogramRight').droppable({
        accept: '#parallelogram',
        scope: "parallelogram",
        drop: function (event, ui) {
          if( rotation1 == 135 | degree == 135 | rotation1 == 315 | degree == 315 ) {
          console.log('dobra rotacja')
          $(this).html(ui.draggable.remove().html());
          $(this).css("background-color", "black")
          } else {
          console.log('zla rotacja')
          }
        },
      });
    });














































  // zakonczenie funkcji jest tu bo inaczej nie moge uzyc zmiennej rotation w if
  console.log(rotation1)
  }
});
