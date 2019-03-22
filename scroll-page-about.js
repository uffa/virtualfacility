VF = window.VF || {};

pagescript = "about";

(function( $ ) {
  VF.animPage = {
    presetup: function() {
      var _this = this;
      VF.animModule.hookpos = 0.46;

      $(".about_sec1").addClass("linestart1");
      $(".about_sec1_copy2wrap").addClass("linetrigger1");
      $(".about_sec2").addClass("linestart2 lineend1").attr("durationoffset","400");
      $("footer").addClass("lineend2").attr("durationoffset","450");

/*      _this.scrollin(".about_sec1_copy2wrap > p,.about_sec1_copy2wrap > div",10);
      _this.scrollin(".about_sec1_abouthead1");
      _this.scrollin(".about_sec1_abouthead2");
      _this.scrollin(".about_sec1_abouthead3");
      _this.scrollin(".about_sec1_aboutul li");
      _this.scrollin(".about_sec2_copy1wrap h1");
      _this.scrollin(".about_sec2_copy1wrap h5");
      _this.scrollin(".btn_default",25);
      _this.scrollin(".cta_heading",30);*/

      _this.addBackgroundWrap(".about_sec1_abouthead1");

    },
  createlines: function() {
    var _this = this;

      var linebox,boxheight,x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,y1,y2,y3,y4,y5,y6,y7,y8,y9,y10;
      var construct, draw, polyline;

      ////////////////////////////////////////////////
      $lb = _this.addlinebox();
      x1 = x2 = 4;
      y1 = 0;
      y2 = y3 = _this.bottomOf(".about_sec1_copy1wrap");
      x3 = x4 = _this.boxWidth();
      y4 = y5 = _this.middleOf(".about_sec1_copy2subhead");
      x5 = x6 = _this.leftOf(".about_sec1_abouthead1",-10);
      y6 = y7 = _this.middleOf(".about_sec1_abouthead1",5);
      x7 = x8 = _this.boxWidth();
      y8 = y9 = _this.bottomOf(".about_sec1_abouttextwrap");
      x9 = x10 = 4;
      y10 = _this.boxHeight();

      _this.constructline([x1,y1,x2,y2,x3,y3,x4,y4,x5,y5,x6,y6,x7,y7,x8,y8,x9,y9,x10,y10]);

      ////////////////////////////////////////////////
      $lb = _this.addlinebox();
      x1 = x2 = 4;
      y1 = 0;
      y2 = y3 =  _this.bottomOf(".about_sec2_copy1wrap");
      x3 = x4 = _this.boxCenter();
      y4 = _this.bottomOf(".about_sec2_line1");

      _this.constructline([x1,y1,x2,y2,x3,y3,x4,y4]);

    },

  };

})(jQuery);

