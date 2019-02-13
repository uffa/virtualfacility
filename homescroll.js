
var lineboxes = [];
var animcontroller,resettimer;

$( document ).ready(function() {
  // REPLACE WITH HTML
  $(".div-block-28").attr("id","trigger1");
  $(".section-7").attr("id","trigger2");
  $(".section-8").attr("id","trigger3");
  $("footer").attr("id","trigger4");

  ////////////////////////////////////////// ADD LINES DYNAMICALLY

  // TOP LINE
  function drawlines() {
    var linebox,boxheight,x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,y1,y2,y3,y4,y5,y6,y7,y8,y9,y10;
    var construct, draw, polyline;
    linebox = "linebox1";
    addlinebox(linebox, "#trigger1");
    boxheight = $("#"+linebox).height();
    boxcenter = $("#"+linebox).width()/2+1;
    x1 = x2 = 12;
    y1 = 85; // below image
    y2 = boxheight;
    construct = buildcoords([x1,y1,x2,y2]);

    draw = SVG(linebox).size("100%","100%");
    polyline = draw.polyline(construct).fill('none');
    $(polyline.node).parent().addClass("line vline backline");

  // MIDDLE LINE
    linebox = "linebox2";
    addlinebox(linebox, "#trigger2");
    boxheight = $("#"+linebox).height();
    boxcenter = $("#"+linebox).width()/2+1;
    x1 = x2 = 7;
    y1 = 0;
    y2 = y3 =  $(".div-block-29").offset().top - $("#"+linebox).offset().top +  $(".div-block-29").height()/2 + 8;
    x3 = x4 = x7 = x8 = $("#"+linebox).width() - 40;
    y4 = y5 = $(".div-block-3").offset().top - $("#"+linebox).offset().top + 10;
    x5 = x6 = x2 + 45;
    y6 = y7 = y5 + $(".div-block-3").height() + 30;
    y8 = y9 = y7 + $(".div-block-4").height() + 80;
    x9 = x10 = boxcenter;
    y10 = boxheight;

    construct = buildcoords([x1,y1,x2,y2,x3,y3,x4,y4,x5,y5,x6,y6,x7,y7,x8,y8,x9,y9,x10,y10]);

    draw = SVG(linebox).size("100%","100%");
    polyline = draw.polyline(construct).fill('none');
    $(polyline.node).parent().addClass("line vline backline");


  // THIRD LINE
    linebox = "linebox3";
    addlinebox(linebox, "#trigger3");
    boxheight = $("#"+linebox).height();
    boxcenter = $("#"+linebox).width()/2+1;
    x1 = x2 =  boxcenter;
    y1 = 0;
    y2 = y3 = $(".div-block-27").offset().top - $("#"+linebox).offset().top + 10;
    x3 = x4=  boxcenter + $(".div-block-6").width()/2+50;
    y4 = y5 = y3 + $(".div-block-27").height();
    x5 = x6 = boxcenter;
    y6 = boxheight - 70;

    construct = buildcoords([x1,y1,x2,y2,x3,y3,x4,y4,x5,y5,x6,y6]);

    draw = SVG(linebox).size("100%","100%");
    polyline = draw.polyline(construct).fill('none');
    $(polyline.node).parent().addClass("line vline backline");

    // DUPLICATE LINES
    $(".backline").each(function(index) {
        var pl = $(this).find("polyline").get();
        var linelength = getPolylineLength(pl[0]);
        var $clone = $(this).clone().insertAfter($(this)).removeClass("backline").addClass("frontline");
        //console.log(linelength);
        $clone.css("stroke-dasharray", linelength);
        $clone.css("stroke-dashoffset", linelength);
        $clone.attr("id","activeline"+index);
    });

  }



  function buildanimation() {
    // init controller
    animcontroller = new ScrollMagic.Controller({loglevel: 0});
    var scenes = [];
    var triggers = [];
    var durations = [];


    triggers.push("#trigger1");
    triggers.push("#trigger2");
    triggers.push("#trigger3");
    triggers.push("#trigger4");
    durations.push($(triggers[1]).offset().top- $(triggers[0]).offset().top);
    durations.push($(triggers[2]).offset().top- $(triggers[1]).offset().top);
    durations.push($(triggers[3]).offset().top- $(triggers[2]).offset().top - 400);


    // build scene


    for (var snum = 0; snum < 3; snum++) {
      var scene = new ScrollMagic.Scene({triggerElement: triggers[snum], duration: durations[snum]})
              .addIndicators()
              .triggerHook(0.55)
              .addTo(animcontroller)
              .setClassToggle("#activeline"+snum, 'active')
              .on("progress", callback);
      scenes.push(scene);
    }


    function callback(e) {
     // console.log(e);
      var perc = Math.floor(e.progress * 100);
      var $aline = $(".line.active");
      var linelength = parseInt($aline.css("stroke-dasharray"), 10);


      var offlength = linelength - Math.floor(e.progress * linelength);
      console.log(offlength);

      $aline.css("stroke-dashoffset", offlength);

      console.log("progress: "+ perc + "%");
    }
  }



  drawlines();
  buildanimation();




 function addlinebox(lb,tr) {
      $(tr + " > DIV > DIV").each(function() {
        if ($(this).css("position") == 'static') {
          $(this).css("position","relative");
          $(this).css("z-index",100);
        }
      });
      var $targetdiv = $(tr + " > DIV ");
      $div = $targetdiv.prepend("<div id='"+ lb +"' class='linebox'/>").css("position", "relative");
      $("#"+lb).height($targetdiv.height());
      $("#"+lb).width($targetdiv.width());

      lineboxes.push($("#"+lb));
  }

  $( window ).resize(function() {

    resetanimation();
  });


  function resetanimation() {
    clearTimeout(resettimer);
    resettimer = setTimeout(function() {
      resetanimationnow();
    },100);
  }



  function resetanimationnow() {
    console.log("resetting");
    $.each(lineboxes,function(i,box) {
      box.remove();
    });
    animcontroller.destroy();

    drawlines();
    buildanimation();
  }

  function buildcoords(coords) {
    var r = "";
    $.each(coords, function(i,p) {
      r += p;
      if (i%2 == 1) {
        r += " ";
      }
      else {
       r += ",";
      }
    });
    return r;
}

function getPolylineLength(polylineElement){
  function dis(p,q){
      return Math.sqrt((p.x-q.x)*(p.x-q.x) + (p.y-q.y)*(p.y-q.y));
  }
  var ps = polylineElement.points, n = ps.numberOfItems, len=0;
  for(var i=1; i<n; i++){
      len += dis(ps.getItem(i-1),ps.getItem(i));
  }
  return len;
}



});

