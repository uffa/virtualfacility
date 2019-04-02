if(typeof(console) != "object") {var console = {}; console.log = function() {};}
function getQParams(qp) { try{r=unescape(location.search.match(new RegExp(qp+"=+([^&]*)"))[1]);}catch(e){r='';} return r; }

VF = window.VF || {};

(function( $ ) {
  VF.animModule = {

    scrollActiveOnInit:false,
    $triggerStart:null,
    animcontroller:null,
    resettimer:null,
    lineboxes:[],
    hookpos: 0.55,
    isdebug: window.debug || getQParams("debug") || false,
    ispreview: getQParams("preview") || false,
    isloading: false,
    currentLinebox:null,
    firstload:true,
    preinit: function () {
      var _this = this;

      if (_this.isloading) {
        console.log("already loading");
        return;
      }
      _this.isloading = true;
      _this.addFunctions();
      if (_this.isdebug) {
        var scriptsrc = "//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.6/plugins/debug.addIndicators.js";
        $.getScript(scriptsrc, function() {
          console.log('script loaded:  '+ scriptsrc);
          _this.init();
        });
        $("nav a").each(function() {
          $(this).attr("href",$(this).attr("href")+"?debug=1");
        });
      }
      else {
        _this.init();
      }
    },
    init: function () {
      console.log("scroll-module.js init");
      var _this = this;
      if (_this.isdebug) {
        $("body").addClass("debug");
      }
      if (_this.ispreview) {
        $("body").addClass("preview");
      }
      if (pagescript) {
        $("body").addClass(pagescript);
      }
      _this.presetup();
      setTimeout(function() {
        _this.buildanimation();
        _this.browserevents();
      },10);

      $(".loadin").each(function() {
        $(this).addClass("reveal");
      });
    },
    getBackground: function($elem) {
      var _this = this;
      var color = $elem.css("background-color");
      if ((color !== 'rgba(0, 0, 0, 0)') && (color !== 'transparent')) {
          return color;
      }
      if ($elem.is("body")) {
          return false;
      } else {
          return _this.getBackground($elem.parent());
      }
    },
    addBackground: function(selector) {
      var _this = this;
      if (!this.checkSelector(selector)) { return ""; }
      var bg = _this.getBackground($(selector));
      if (bg) {
        $(selector).css("background-color",bg);
      }
    },
    addBackgroundWrap: function(selector) {
      var _this = this;
      $wrap = $(selector).wrapAll("<div class='itemwrap'></div>");
      $wrap = $(selector).parent(".itemwrap");
      var bg = _this.getBackground($wrap);
      if (bg) {
        $wrap.css("background-color",bg);
      }
    },
    addScrollStarter: function() {
      var _this = this;
      if (!_this.scrollActiveOnInit) {
        return;
      }
      // for use on pages where scroll is already activated on initial load
      $("body").prepend("<div class='triggerstart1'></div>");
      _this.$triggerStart = $(".triggerstart1");
      _this.$triggerStart.css("position","absolute");
      _this.$triggerStart.css("top",_this.hookpos * 100 + "%");
      if (_this.isdebug) {
        _this.$triggerStart.css("border-top","1px solid #ff0000");
        _this.$triggerStart.css("width","90%");
      }
    },
    buildanimation: function() {
      var _this = this;
      _this.animcontroller = new ScrollMagic.Controller({loglevel: 0});
      _this.addScrollStarter();
      _this.createlines();
      _this.adjustlines();
      _this.duplines();
      _this.animatelines();
      _this.animatetext();
      _this.addactivator();
    },
    presetup: function() {
      var _this = this;
      VF.animPage.presetup();
    },
    constructline: function(coords) {
      var _this = this;
      console.log(coords);
      $lb = _this.currentLinebox;
      var construct =_this.buildcoords(coords);
      var draw = SVG($lb.attr("id")).size("100%","100%");
      var polyline = draw.polyline(construct).fill('none');
      $(polyline.node).parent().addClass("line vline backline");
      if (_this.firstload) {
        $(polyline.node).parent().fadeOut(0).fadeIn(300);
      }
    },
    createlines: function() {
      var _this = this;
      if (VF.animPage.createlines) {
        VF.animPage.createlines();
      }
    },
    adjustlines: function() {
      var _this = this;
      if (VF.animPage.adjustlines) {
        VF.animPage.adjustlines();
      }
    },
    duplines: function() {
      var _this = this;
      // DUPLICATE LINES
      $(".backline").each(function(index) {
          var pl = $(this).find("polyline").get();
          var linelength = _this.getPolylineLength(pl[0]);
          var $clone = $(this).clone().insertAfter($(this)).removeClass("backline").addClass("frontline");
          //console.log(linelength);
          $clone.css("stroke-dasharray", linelength);
          $clone.css("stroke-dashoffset", linelength);
          $clone.attr("id","activeline"+index);
          $clone.css("opacity",1);
      });
    },
    scrollin: function(selector,offset) {
      var _this = this;
      $(selector).each(function() {
        if (!$(this).hasClass("scrollin")) {
          $(this).addClass("scrollin");
          if (offset && !isNaN(offset)) {
            $(this).addClass("offset"+offset);
          }
        }

      });
    },
    animatetext: function() {
      var _this = this;

      var textselectors = [];
      var triggeroffset = [];

      // build animations looking for .scrollin and offset##
      $(".scrollin").each(function(i) {
        var classes = $(this).attr("class").split(/\s+/);
        var offset = .15;  // DEFAULT OFFSET FOR TEXT IS .2 // CHANGED TO .15
        $.each(classes,function() {
          if (this.indexOf("offset") == 0) {
            offsetcheck = parseInt(this.replace("offset",""));
            if (!isNaN(offsetcheck)) {
              offset = offsetcheck/100;
            }
          }
        });
        $(this).addClass("scrollin"+i);
        textselectors.push(".scrollin"+i);
        triggeroffset.push(offset);
      });


      $.each(textselectors,function(i,textselector) {
        $(textselector).addClass("appear waiting");
        var scene = new ScrollMagic.Scene({triggerElement:textselector, duration:0})
                    .triggerHook(_this.hookpos + triggeroffset[i])
                    .addTo(_this.animcontroller)
                    .setClassToggle(textselector,'displayed');
        if (_this.isdebug) {
          scene.addIndicators({
            name: textselector,
            indent: 0});
        }
      });

      },
    addactivator: function() {
      var _this = this;

      var textselectors = [];
      var triggeroffset = [];

      // build animations looking for .scrollin and offset##
      $(".activate").each(function(i) {
        var classes = $(this).attr("class").split(/\s+/);
        var offset = 0;
        $.each(classes,function() {
          if (this.indexOf("offset") == 0) {
            offsetcheck = parseInt(this.replace("offset",""));
            if (!isNaN(offsetcheck)) {
              offset = offsetcheck/100;
            }
          }
        });
        $(this).addClass("activate"+i);
        textselectors.push(".activate"+i);
        triggeroffset.push(offset);
      });


      $.each(textselectors,function(i,textselector) {
        $(textselector).addClass("waiting");
        var scene = new ScrollMagic.Scene({triggerElement:textselector, duration:0})
                    .triggerHook(_this.hookpos + triggeroffset[i])
                    .addTo(_this.animcontroller)
                    .setClassToggle(textselector,'displayed');
        if (_this.isdebug) {
          scene.addIndicators({
            name: textselector,
            indent: 0});
        }
      });

      },
    animatelines: function() {
        var _this = this;
      // init controller
        var scenes = [];

        // build scene
        for (var snum = 0; snum < _this.lineboxes.length; snum++) {
          var trigger = ".linetrigger"+(snum+1);
          var linestart = ".linestart"+(snum+1);
          var lineend = ".lineend"+(snum+1);
          if ($(trigger).length == 0) {
            $(linestart).addClass("linetrigger"+(snum+1));
          }
          var duration = $(lineend).offset().top-  $(trigger).offset().top;
          var durationoffset = parseInt($(lineend).attr("durationoffset"));
          if (!isNaN(durationoffset)) {
            duration = duration - durationoffset;
          }
          // override for page that starts above scoll position
          if (trigger == ".linetrigger1" && _this.$triggerStart) {
            trigger = ".triggerstart1";
            duration = $("#linebox1").height() + $("#linebox1").offset().top - _this.$triggerStart.offset().top;

            if ($("#linebox2").length == 1) {
              if ((_this.$triggerStart.offset().top + duration) > $("#linebox2").offset().top ) {
                duration = duration - ((_this.$triggerStart.offset().top + duration) - $("#linebox2").offset().top);
              }
            }
          }
          var scene = new ScrollMagic.Scene({triggerElement: trigger, duration: duration})
                  .triggerHook(_this.hookpos)
                  .addTo(_this.animcontroller)
                  .setClassToggle("#activeline"+snum, 'active')
                  .on("progress", callback);
          if (_this.isdebug) {
            scene.addIndicators({
              name: trigger,
              indent: 0
            });
          }
          scenes.push(scene);
        }


        function callback(e) {
          var perc = Math.floor(e.progress * 100);
          var $aline = $(".line.active");
          var linelength = parseInt($aline.css("stroke-dasharray"), 10);
          var offlength = linelength - Math.floor(e.progress * linelength);
          $aline.css("stroke-dashoffset", offlength);
          $aline.data("percent",perc);
          //console.log("progress: "+ perc + "%");
        }
    },
    browserevents: function() {
      var _this = this;
      $( window ).resize(function() {
        _this.resetanimation();
      });
    },
    resetanimation: function() {
      var _this = this;
      _this.firstload = false;
      clearTimeout(_this.resettimer);
      _this.resettimer = setTimeout(function() {
        _this.resetanimationnow();
      },100);
    },
    resetanimationnow: function() {
      var _this = this;
      _this.destroyanimation();
      _this.buildanimation();
    },
    destroyanimation: function() {
      console.log("resetting");
      var _this = this;
      $.each(_this.lineboxes,function(i,box) {
        box.remove();
      });
      _this.lineboxes = [];
      $(".appear").removeClass("waiting displayed appear");

      _this.animcontroller.destroy(true);

      if (_this.$triggerStart) {
        _this.$triggerStart.remove();
        _this.$triggerStart = null;
      }

    },
    setrelative: function($div) {
      if ($div.css("position") == 'static') {
        $div.css("position","relative");
        $div.css("z-index",100);
      }
    },
    addlinebox: function(lb,tr) {
      var _this = this;
      var $targetdiv;
      var num = _this.lineboxes.length+1;
      var startclass  = ".linestart"+num;
      var endclass    = ".lineend"+num;
      var lineboxname = "linebox"+num;
      if ($(startclass).length == 0 || $(endclass).length == 0) {
        console.log("cannot find ." + startclass + " or ."+ endclass);
      }

      $targetdiv = $(startclass + " > DIV:first"); // Use first div unless has class "startdiv" or none available
      if ($(startclass).hasClass("startdiv") || $targetdiv.length == 0) {
        $targetdiv = $(startclass);
      }

      if ($targetdiv.length > 1) {
        console.log("multiple divs found for linebox: " + num);
        console.log($targetdiv);
        $targetdiv = $targetdiv.first();
      }


      $targetdiv.find("> DIV").each(function() {
        _this.setrelative($(this));
      });

      $targetdiv.siblings().each(function() {
      //  _this.setrelative($(this));
      });


      $div = $targetdiv.prepend("<div id='"+ lineboxname +"' class='linebox'/>").css("position", "relative");
      $linebox = $("#"+lineboxname);
      $linebox.css("position","absolute");
      var boxheight = $(endclass).offset().top - $(startclass).offset().top;
      var endoffset = parseInt($(endclass).attr("endoffset"));
      if (!isNaN(endoffset)) {
        boxheight = boxheight - endoffset;
      }

      $linebox.height(boxheight);
      $linebox.width($targetdiv.width());


      _this.lineboxes.push($linebox);
      _this.currentLinebox = $linebox;
      return $linebox;
    },

    buildcoords: function(coords) {
      var _this = this;
      var r = "";
      var lastparam = "x";
      $.each(coords, function(i,p) {
        if (isNaN(p) || p == null) {
          console.log("End of coordinates: " + r + "[NaN/Null for " + lastparam + (Math.ceil(i/2) + 1) + "]");
          var lastIndex = r.lastIndexOf(" ");
          r = r.substring(0, lastIndex);
          return false; // exit loop
        }
        p = Math.ceil(p); // ensure whole numbers
        r += p;
        if (i%2 == 1) {
          lastparam = "x";
          r += " ";
        }
        else {
         lastparam = "y";
         r += ",";
        }
      });
      return r;
    },
    checkSelector:function(selector) {
      if ($(selector).length != 1) {
        console.log("invalid selector for: " + selector, " (length: "+$(selector).length+")");
        return false;
      }
      return true;
    },
    heightOf:function(selector) {
      return parseInt($(selector).height())+parseInt($(selector).css("paddingBottom"))+parseInt($(selector).css("paddingTop"));
    },
    widthOf:function(selector) {
      return parseInt($(selector).width())+parseInt($(selector).css("paddingRight"))+parseInt($(selector).css("paddingLeft"));
    },
    leftOf:function(selector,adjustment) {
      if (!this.checkSelector(selector)) { return 0; }
      var val = $(selector).offset().left - this.currentLinebox.offset().left;
      if (adjustment && !isNaN(adjustment)) {
        val = val + adjustment;
        if (val < this.boxLeft()) {
          return this.boxLeft();
        }
      }
      return val;
    },
    rightOf:function(selector,adjustment) {
      if (!this.checkSelector(selector)) { return 0; }
      var val = this.boxCenter() + this.widthOf(selector)/2;
      if (adjustment && !isNaN(adjustment)) {
        val = val + adjustment;
        if (val >= this.boxWidth() - 10) {
          return this.boxWidth() - 10;
        }
      }
      return val;
    },
    topOf:function(selector,adjustment) {
      if (!this.checkSelector(selector)) { return 0; }
      var val = $(selector).offset().top - this.currentLinebox.offset().top;
      if (adjustment && !isNaN(adjustment)) {
        val = val + adjustment;
      }
      return val;
    },
    middleOf:function(selector,adjustment) {
      var val = $(selector).offset().top - this.currentLinebox.offset().top + this.heightOf(selector)/2;
      if (adjustment && !isNaN(adjustment)) {
        val = val + adjustment;
      }
      return val;
    },
    bottomOf:function(selector) {
      if (!this.checkSelector(selector)) { return 0; }
      return $(selector).offset().top - this.currentLinebox.offset().top + this.heightOf(selector);
    },
    boxCenter:function() {
      return this.currentLinebox.width()/2+1;
    },
    boxHeight:function() {
      return this.currentLinebox.height();
    },
    boxWidth:function() {
      return this.currentLinebox.width()-3;
    },
    boxLeft:function() {
      return 4;
    },
    logoStart:function() {
      if ($("body").width() < 1000) {
        pad = 14;
      }
      else {
        pad = 69;
      }
      logopos = $(".brand img").offset().left;
      lbpos = this.currentLinebox.offset().left;

      linestart = logopos - lbpos + pad;

      if (linestart < 4) {
        linestart = 4;
      }
      return linestart;
    },
    getPolylineLength: function(polylineElement){
      function dis(p,q){
          return Math.sqrt((p.x-q.x)*(p.x-q.x) + (p.y-q.y)*(p.y-q.y));
      }
      var ps = polylineElement.points, n = ps.numberOfItems, len=0;
      for(var i=1; i<n; i++){
          len += dis(ps.getItem(i-1),ps.getItem(i));
      }
      return len;
    },
    addFunctions: function() {

      // ADD FUNCTIONS TO PAGE
      if (VF.animPage) {

        VF.animPage.addlinebox = function() {
            return VF.animModule.addlinebox();
        };
        VF.animPage.constructline = function(a) {
            return VF.animModule.constructline(a);
        };
        VF.animPage.leftOf = function(a,b) {
            return VF.animModule.leftOf(a,b);
        };
        VF.animPage.rightOf = function(a,b) {
            return VF.animModule.rightOf(a,b);
        };
        VF.animPage.topOf = function(a,b) {
            return VF.animModule.topOf(a,b);
        };
        VF.animPage.middleOf = function(a,b) {
            return VF.animModule.middleOf(a,b);
        };
        VF.animPage.bottomOf = function(a) {
            return VF.animModule.bottomOf(a);
        };
        VF.animPage.heightOf = function(a) {
            return VF.animModule.heightOf(a);
        };
        VF.animPage.widthOf = function(a) {
            return VF.animModule.widthOf(a);
        };
        VF.animPage.boxHeight = function() {
            return VF.animModule.boxHeight();
        };
        VF.animPage.boxCenter = function() {
            return VF.animModule.boxCenter();
        };
        VF.animPage.boxWidth = function() {
            return VF.animModule.boxWidth();
        };
        VF.animPage.boxLeft = function() {
            return VF.animModule.boxLeft();
        };
        VF.animPage.logoStart = function() {
            return VF.animModule.logoStart();
        };
        VF.animPage.duplines = function() {
           return VF.animModule.duplines();
        };
        VF.animPage.addBackground = function(a) {
           return VF.animModule.addBackground(a);
        };
        VF.animPage.addBackgroundWrap = function(a) {
           return VF.animModule.addBackgroundWrap(a);
        };
        VF.animPage.scrollin = function(a,b) {
           return VF.animModule.scrollin(a,b);
        };
        VF.animPage.addScrollStarter = function() {
            return VF.animModule.addScrollStarter();
        };
     }

   }

  };

  // allow loading in either order
  if (typeof(VF.animPage) == "object") {
    VF.animModule.preinit();
  }

})(jQuery);
