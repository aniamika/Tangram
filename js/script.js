$(function() {

// MAIN //
$("body").hide();
$("body").fadeIn(200);

// HOME PAGE //
const flexContainer = $('.flexContainer');

  function animation() {
    flexContainer.on("click", function() {
      const href= $('a').attr('href');
      $(".st0").fadeOut( 1000, function(){
            // go to link when animation completes
            window.location=href;
      })
      return false;
    });
  }
  animation();

// ALL ELEMENTS STYLE PAGE //
// rotate elements //
  var rotation = 0;

// losowanie polozenia po lewej
  $('.left .square').each(function(){
      let degree = Math.floor(Math.random() * 360);
      $(this).data('rotate', degree);
      rotateElem(this);
      $(this).show();
  })


  $('.right .square').each(function(){
      rotateElem(this);
      $(this).show();
  })

  //Rotate on init
  function Rotate(elem, degrees) {
      $(elem).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                   '-moz-transform' : 'rotate('+ degrees +'deg)',
                   '-ms-transform' : 'rotate('+ degrees +'deg)',
                   'transform' : 'rotate('+ degrees +'deg)'});
  };

  $('.flexContainer').on('click','.rotate:not(.ui-dragable-dragging)',function() {
    console.log('rotate');
      rotateElem(this);
  });

  function rotateElem(elem){

    // console.log(elem);
    let rotation = $(elem).data('rotate');
    // console.log(rotation);

    rotation += 15;
    // jesli dojdzie do 360 to zresetuj
    if(rotation==360){
      rotation = 0;
    }
    $(elem).data('rotate',rotation);
    Rotate(elem,rotation);
  }


// draggable elements //
// $('.selectable').draggable();
$(".left .square").draggable({
    addClasses: false,
    snap: true,
    stack: ".destination",
    scroll: false,
});

$(".right .square").droppable({
    snapMode: "inner",
    drop: function(e,u){
      console.log('drop');
      console.log($(u.draggable).data('rotate'));
      console.log(e.target.dataset.rotate);
      console.log(e.target.dataset.name)
    }
});


let dest = $(".destination");
console.log(dest);
dest.droppable({
    drop: function (event, ui) {
        console.log($(this));
        // var selectedShape = ui.draggable.attr("id");
        // var dropZone = $(this).attr("id");
        // dropZone = dropZone.replace("inside", "");
        // if(selectedShape == dropZone)
        // {
        //     $("#" + selectedShape).draggable("disable");
        //     checkShapeStatus();
        // }
        // else {
        //     alert("Wrong choice!");
        // }
    }
});

// function checkShapeStatus() {
//     var counter = 0;
//     $(".selectable").each(function () {
//         var $thisId = $(this);
//         var booleanValue = $thisId.draggable('option', 'disabled');
//         if (booleanValue)
//         {
//             counter = counter + 1;
//         }
//         else {
//         }
//         if(counter == 4)
//         {
//             $("#centerText").text('You win!');
//             $("#centerText").fadeIn(1000).fadeOut(1000).fadeIn(1000).fadeOut(1000).fadeIn(1000);
//         }
//     })
// }
// let elem = $('.flexContainer .right path');
//
// elem.on('mouseup',function(event){
//   console.log(event.target);
// })

// console.log(elem);

});
