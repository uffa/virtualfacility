VF = window.VF || {};

(function( $ ) {
  VF.animModule = {

    animcontroller:null,
    resettimer:null,
    lineboxes:[],
    hookpos: 0.55,
    addindicators: window.debug || false,
    currentLinebox:null,


    init: function () {

      var _this = this;
      if (_this.getQParams("debug")) {
        _this.addindicators = true;
      }
      _this.presetup();
      setTimeout(function() {
        _this.buildanimation();
        _this.browserevents();
      },10);
    },
    buildanimation: function() {
      var _this = this;
      _this.animcontroller = new ScrollMagic.Controller({loglevel: 0});
      _this.createlines();
      _this.adjustlines();
      _this.duplines();
      _this.animatelines();
      _this.animatetext();
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
      });
    },

    animatetext: function() {
      var _this = this;

      var textselectors = [];
      var triggeroffset = [];

      // build animations looking for .scrollin and offset##
      $(".scrollin").each(function(i) {
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
        if (_this.addindicators) {
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
          var scene = new ScrollMagic.Scene({triggerElement: trigger, duration: duration})
                  .triggerHook(_this.hookpos)
                  .addTo(_this.animcontroller)
                  .setClassToggle("#activeline"+snum, 'active')
                  .on("progress", callback);
          if (_this.addindicators) {
            scene.addIndicators({
              name: trigger,
              indent: 0
            });
          }
          scenes.push(scene);
        }


        function callback(e) {
         // console.log(e);
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
        if ($(this).css("position") == 'static') {
          $(this).css("position","relative");
          $(this).css("z-index",100);
        }
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
        if (isNaN(p)) {
          console.log("invalid line coordinates: " + r + "[NaN for " + lastparam + Math.ceil(i/2) + "]");
          var lastIndex = r.lastIndexOf(" ");
          r = r.substring(0, lastIndex);
          return false; // exit loop
        }
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
    heightOf:function(selector) {
      return parseInt($(selector).height())+parseInt($(selector).css("paddingBottom"))+parseInt($(selector).css("paddingTop"));
    },
    widthOf:function(selector) {
      return parseInt($(selector).width())+parseInt($(selector).css("paddingRight"))+parseInt($(selector).css("paddingLeft"));
    },
    leftOf:function(selector) {
      //return this.boxCenter() - this.widthOf(selector)/2;
      return $(selector).offset().left - this.currentLinebox.offset().left;
    },
    rightOf:function(selector) {
      return this.boxCenter() + this.widthOf(selector)/2;
    },
    topOf:function(selector) {
      return $(selector).offset().top - this.currentLinebox.offset().top;
    },
    middleOf:function(selector) {
      return $(selector).offset().top - this.currentLinebox.offset().top + this.heightOf(selector)/2;
    },
    bottomOf:function(selector) {
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
    getQParams: function ( qp ) {
        try {
          r=unescape(location.search.match(new RegExp(qp+"=+([^&]*)"))[1]);
        }
        catch ( e ) {
          r='';
        }
        return r;
    }
  };

  // ADD FUNCTIONS TO PAGE
  if (VF.animPage) {

    VF.animPage.addlinebox = function() {
        return VF.animModule.addlinebox();
    };
    VF.animPage.constructline = function(a) {
        return VF.animModule.constructline(a);
    };
    VF.animPage.leftOf = function(a) {
        return VF.animModule.leftOf(a);
    };
    VF.animPage.rightOf = function(a) {
        return VF.animModule.rightOf(a);
    };
    VF.animPage.topOf = function(a) {
        return VF.animModule.topOf(a);
    };
    VF.animPage.middleOf = function(a) {
        return VF.animModule.middleOf(a);
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
    VF.animPage.duplines = function() {
       return VF.animModule.duplines();
    };
  }


  VF.animModule.init();
})(jQuery);
