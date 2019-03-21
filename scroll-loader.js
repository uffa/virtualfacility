if(typeof(console) != "object") {var console = {}; console.log = function() {};}
function getQParams(qp) { try{r=unescape(location.search.match(new RegExp(qp+"=+([^&]*)"))[1]);}catch(e){r='';} return r; }

var pagescript = null;

(function( $ ) {
  var debug = window.debug || getQParams("debug") || false;
  var thisscript  = "scroll-loader";
  var svghost     = "//cdnjs.cloudflare.com/ajax/libs/svg.js/2.7.0/";
  var smhost      = "//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.6/";

  var scriptsrc   = $('script[src*="'+ thisscript +'"]').attr('src');
  var scripthost  = scriptsrc.split(thisscript)[0];

  var minify      = (scripthost.indexOf("cdn.jsdelivr.net") > - 1 && !debug);
  minify      = false; // Don't use minify
  var suffix      = minify?".min":"";
  var cachebreak  = debug?"?"+Math.round(Math.random()*10000):"";

  var scripts   = [];

  var currentpath = $.trim(window.location.pathname.replace(/^\/|\/$/g, ''));

  switch(currentpath) {
    case "":
    case "virtualfacility":
      pagescript = "home";
      break;
    case "solutions":
    case "virtualfacility/solutions.php":
      pagescript = "solutions";
      break;
    case "company/about":
    case "virtualfacility/about.php":
      pagescript = "about";
      break;
    case "company/team":
    case "virtualfacility/team.php":
      pagescript = "team";
      break;
    case "contact":
    case "virtualfacility/contact.php":
      //pagescript = "contact";
      break;
    default:
      // code block
  }

  if (!pagescript) {
    console.log("no script specified for path: "+currentpath);
    return;
  }

/*  scripts.push(svghost+"svg.min.js");
  scripts.push(smhost+"ScrollMagic.min.js");
  scripts.push(smhost+"plugins/jquery.ScrollMagic.min.js");*/
  if (debug) {
    scripts.push(smhost+"plugins/debug.addIndicators.js");
  }
  scripts.push(scripthost+"scroll-page-"+pagescript+suffix+".js"+cachebreak);
  scripts.push(scripthost+"scroll-module"+suffix+".js"+cachebreak);

  var styles = scripthost+"scroll-styles"+suffix+".css"+cachebreak;

  $("<link/>", {
     rel: "stylesheet",
     type: "text/css",
     href: styles
  }).appendTo("head");
  console.log("styles loaded: " + styles);

  var deferred = new $.Deferred(),
      pipe = deferred;

  $.each(scripts , function(i, val) {
       pipe = pipe.pipe(function() {
           return $.getScript(val, function() {
               console.log('script loaded:  '+ val);
           });
       });
  });

  deferred.resolve();

})(jQuery);
