<html>
  <head>
    <script src="https://d1tdp7z6w94jbb.cloudfront.net/js/jquery-3.3.1.min.js" type="text/javascript" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <!--<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.6/ScrollMagic.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.6/plugins/debug.addIndicators.min.js"></script> -->

    <script src="sm/ScrollMagic.js"></script>
    <script src="sm/debug.addIndicators.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/TweenLite.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/TweenMax.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/TimelineMax.min.js"></script>
    <script src="sm/animation.gsap.js"></script>
  <style>
    .s2  { height: 100%; }
  </style>
  </head>

</html>
<body>
<div class="spacer s2"></div>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1000" height="2000">
    <path id="dot1" style="stroke-width:5; stroke:#FF0000;  " fill="none" stroke="#000000" stroke-width="5"
    d="M10 10 M20 20">
    </path>
    <polyline fill="none" stroke="blue" stroke-width="5"
    points="450,250
            475,250 475,220 500,220 500,250
            525,250 525,200 550,200 550,250
            575,250 575,180 600,180 600,250
            625,250 625,160 650,160 650,250
            675,250" />
</svg>
<div id="trigger1" class="spacer s0"></div>
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="350" height="200">
  <path id="word" style="stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 1009.23px; stroke-dashoffset: 1009.23px;" fill="none" stroke="#000000" stroke-width="5" d="M22.328,70.018c9.867-7.4,10.724,20.434,13.014,28.694c-0.08-9.105-1.308-31.463,11.936-31.886
      c11.313-0.361,17.046,19.368,16.367,28.098c-1.432-10.289,6.234-30.682,18.163-25.671c11.505,4.833,8.682,26.772,20.071,31.964
      c13.06,5.953,14.854-8.305,19.734-17.017c7.188-12.836,4.933-15.417,29.6-14.8c-8.954-3.842-37.42,1.728-28.539,20.1
      c5.823,12.045,34.911,12.583,30.018-8.873c-5.385,17.174,24.01,23.104,24.01,9.123c0-9.867,3.816-15.937,16.034-18.5
      c8.359-1.754,18.982,4.754,25.9,9.25c-10.361-4.461-51.941-13.776-37.749,12.357c9.435,17.372,50.559,2.289,33.477-6.063
      c-2.871,19.008,32.415,31.684,30.695,54.439c-2.602,34.423-66.934,24.873-79.302,2.134c-13.11-24.101,38.981-36.781,54.798-40.941
      c8.308-2.185,42.133-12.162,25.88-25.587c-2.779,17.058,19.275,28.688,29.963,12.911c6.862-10.131,6.783-25.284,30.833-19.117
      c-9.404-0.429-32.624-0.188-32.864,18.472c-0.231,17.912,21.001,21.405,40.882,11.951"></path>
  <path id="dot" style="stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 44.2974px; stroke-dashoffset: 44.2974px;" fill="none" stroke="#000000" stroke-width="5" d="M247.003,38.567c-7.423,1.437-11.092,9.883-1.737,11.142c14.692,1.978,13.864-13.66,1.12-8.675"></path>
</svg>

<style>
  .backline LINE, .frontline LINE { stroke-width:10; }
  .frontline LINE  {  stroke:#FF0000; z-index: 10; }
  .backline LINE   { stroke:#000000; z-index: 9;}

  .linebox    { position: relative; }
  .linebox1   { height: 500px; }
  .linebox2   { height: 500px; }
  .line       { position: absolute; top:0px; left:0px;;}
  .vline      {}
</style>

<div class="linebox linebox1">
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" class="line vline backline">
    <line x1="10" y1="100" x2="10" y2="500"/>
  </svg>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100%" height="0" class="line vline frontline">
    <line x1="10" y1="100" x2="10" y2="500"/>
  </svg>
</div>
<div class="linebox linebox2">
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="500" height="500"  class="line hline backline">
    <line x1="5" y1="5" x2="500" y2="5"/>
  </svg>
</div>



<div class="spacer s2"></div>
<script>
  $( document ).ready(function() {

  function pathPrepare ($el) {
    var lineLength = $el[0].getTotalLength();
    $el.css("stroke-dasharray", lineLength);
    $el.css("stroke-dashoffset", lineLength);
  }

  var $word = $("path#word");
  var $dot = $("path#dot");

  // prepare SVG
  pathPrepare($word);
  pathPrepare($dot);

  // init controller
  var controller = new ScrollMagic.Controller({loglevel: 0});

  // build tween
  var tween = new TimelineMax()
    .add(TweenMax.to($word, 0.9, {strokeDashoffset: 0, ease:Linear.easeNone})) // draw word for 0.9
    .add(TweenMax.to($dot, 0.1, {strokeDashoffset: 0, ease:Linear.easeNone}))  // draw dot for 0.1
    .add(TweenMax.to("path", 1, {stroke: "#33629c", ease:Linear.easeNone}), 0);     // change color during the whole thing

  // build scene
  var scene = new ScrollMagic.Scene({triggerElement: "#trigger1", duration: 1000, tweenChanges: true})
          .setTween(tween)
          .addIndicators() // add indicators (requires plugin)
          .addTo(controller)
          .on("progress", callback);
        });
  function callback(e) {
    var perc = Math.abs(e.progress * 100);
    $(".linebox1 .frontline").height(perc + "%");
    console.log("progress");
    console.log(perc + "%");
  }

</script>
</body>
</html>