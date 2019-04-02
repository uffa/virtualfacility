# virtualfacility

## 3 FILES TO INCLUDE IN HEAD :
 ```javascript
<!--1 CUSTOM STYLES FOR ANIMATION -->
<link href="//SCRIPTLOCATION/scroll-styles.css" rel="stylesheet" type="text/css"/> 

<!--2 SVG LIBRARY FOR DYNAMICALLY CREATING SVG LINES -->
<script src="//cdnjs.cloudflare.com/ajax/libs/svg.js/2.7.0/svg.min.js"></script>

<!--3 SCROLL MAGIC FOR SCROLL BASED ANIMATIONS -->
<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.6/ScrollMagic.min.js"></script>
 ```

## 3 FILES TO INCLUDE IN BODY / AFTER JQUERY INCLUDE :
 ```javascript
<!--1 JQUERY PLUGIN FOR SCROLL MAGIC, ALLOWS JQUERY SELECTORS -->
<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.6/plugins/jquery.ScrollMagic.min.js"></script>

<!--2 PAGE SPECIFIC CUSTOM CODE FOR SETUP AND ANIMATIONS -->
<script src="//SCRIPTLOCATION/scroll-page-solutions.js"></script>

<!--3 REUSABLE FRAMEWORK FOR GENERATING LINES AND ANIMATIONS -->
<script src="//SCRIPTLOCATION/scroll-module.js"></script>
 ```

## CSS CLASSES TO CREATE TEXT ANIMATIONS
*Adding the CSS classes to text elements will allow the code to generate custom animations*

**.loadin** : will cause element to fade in on load

**.scrollin** : will cause element to fade in when scrolled to

**.offset15** : used with 'scrollin' class to adjust the timing in which the element fades in.

*The default offset is "offset15", setting to "offset10" will cause the element to fade in sooner, "offset30" will cause the element to fade in later. Setting to "offset15" is redundant, since that is the default setting.*

## JSDElIVER
### GLOBAL HEAD
 ```javascript
<link href="//cdn.jsdelivr.net/gh/uffa/virtualfacility@1.0/scroll-styles.min.css" rel="stylesheet" type="text/css"/> 
<script src="//cdnjs.cloudflare.com/ajax/libs/svg.js/2.7.0/svg.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.6/ScrollMagic.min.js"></script>
```
### PAGE /BODY
```javascript
<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.6/plugins/jquery.ScrollMagic.min.js"></script>
<script src="//cdn.jsdelivr.net/gh/uffa/virtualfacility@1.0/scroll-page-solutions.min.js"></script>
 ```
 ### GLOBAL /BODY
 ```javascript
<script src="//cdn.jsdelivr.net/gh/uffa/virtualfacility@1.0/scroll-module.min.js"></script>
 ```
  
