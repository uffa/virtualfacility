<!DOCTYPE html>
<html>
<head>
  <title>SVG.js</title>
    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/svg.js/2.5.0/svg.js"></script>
</head>
<body>
  <div id="drawing"></div>
    <script>
// initialize SVG.js
var draw = SVG('drawing');

// draw pink square
draw.rect(100, 100).move(100, 50).fill('#f06');
  </script>
</body>
</html>