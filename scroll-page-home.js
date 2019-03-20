VF = window.VF || {};

(function( $ ) {
  VF.animPage = {
    presetup: function() {
      var _this = this;

      $(".home_belowherocontain").addClass("linestart1");
      $(".home_sec1").addClass("linestart2 lineend1");
      $(".home_sec2").addClass("linestart3 lineend2");
      $("footer").addClass("lineend3").attr("durationoffset","400").attr("endoffset","150");

      _this.scrollin(".home_herobelow_textwrap h1");
      _this.scrollin(".home_herobelow_textwrap h5");
      _this.scrollin(".home_sec1_head1bg h1");
      _this.scrollin(".home_sec1_head2 h5");
      _this.scrollin(".home_sec1_head3bg h1",15);
      _this.scrollin(".home_sec1_head3contain h5");
      _this.scrollin(".home_sec2_copy1wrap",0);
      _this.scrollin(".home_sec2_productblockwrapper",10);
      _this.scrollin(".home_sec2_ctacontain",30);

      $(".home_sec2_productblockwrapper").wrap("<div class='boxwrap'></div>");

    },
  createlines: function() {
      var _this = this;
      var linebox,boxheight,x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,y1,y2,y3,y4,y5,y6,y7,y8,y9,y10;
      var construct, draw, polyline;

      ////////////////////////////////////////////////
      $lb = _this.addlinebox();
      x1 = x2 = _this.boxWidth();
      y1 = 85; // below image
      y2 = y3 = _this.middleOf(".home_belowhero_line2 h1");
      x3 = x4 = _this.boxLeft();
      y4 = _this.boxHeight();
       _this.constructline([x1,y1,x2,y2,x3,y3,x4,y4,x5,y5,x6,y6,x7,y7,x8,y8,x9,y9,x10,y10]);
      x1=y1=x2=y2=x3=y3=x4=y4=x5=y5=x6=y6=x7=y7=x8=y8=x9=y9=x10=y10=null; // reset vars

      ////////////////////////////////////////////////
      $lb = _this.addlinebox();
      x1 = x2 = 7;
      y1 = 0;

      y2 = y3 = _this.middleOf(".home_sec1_head1bg h1"); // _this.heightOf(".home_sec1_p1"); //$(".home_sec1_head2").offset().top - $lb.offset().top ;
      x3 = x4 = x7 = x8 =  _this.boxWidth() - 10;
      y4 = y5 = _this.bottomOf(".home_sec1_head2"); //y3 + _this.heightOf(".home_sec1_head2"); //$(".home_sec1_head3bg h1").offset().top - $lb.offset().top + $(".home_sec1_head3bg h1").height()/2;
      x5 = x6 = x2 + 45;
      y6 = y7 = _this.middleOf(".home_sec1_head3bg h1"); //y5 + _this.heightPad(".home_sec1_line1");
      y8 = y9 = _this.bottomOf(".home_sec1_head3contain"); //y7 + $(".div-block-4").height() + 80;
      x9 = x10 = _this.boxCenter(); //$lb.attr("boxcenter");
      y10 = _this.boxHeight();  //$lb.height();
      _this.constructline([x1,y1,x2,y2,x3,y3,x4,y4,x5,y5,x6,y6,x7,y7,x8,y8,x9,y9,x10,y10]);
      x1=y1=x2=y2=x3=y3=x4=y4=x5=y5=x6=y6=x7=y7=x8=y8=x9=y9=x10=y10=null; // reset vars

      ////////////////////////////////////////////////
      $lb = _this.addlinebox();
      x1 = x2 =  _this.boxCenter();
      y1 = 0;
      y2 = y3 = _this.topOf(".home_sec2_copy1wrap"); // $(".div-block-27").offset().top - $lb.offset().top + 10;
      x3 = x4=  _this.rightOf(".home_sec2_copy1wrap"); // parseInt($lb.attr("boxcenter")) + $(".div-block-6").width()/2+18;
      y4 = y5 = _this.bottomOf(".home_sec2_copy1wrap");
      x5 = x6 = _this.boxCenter();
      y6 = _this.boxHeight();
      _this.constructline([x1,y1,x2,y2,x3,y3,x4,y4,x5,y5,x6,y6,x7,y7,x8,y8,x9,y9,x10,y10]);
      x1=y1=x2=y2=x3=y3=x4=y4=x5=y5=x6=y6=x7=y7=x8=y8=x9=y9=x10=y10=null; // reset vars
    },
    adjustlines: function() {
      var _this = this;

      $("#linebox1").css("left",0);
      var l1left = $("#linebox1").offset().left;
      var l2left = $("#linebox2").offset().left;

      var adj = l2left-l1left+3;
      $("#linebox1").css("left",adj);

      $arrowimg = $("#linebox1").siblings("img");
      $arrowimg.css("left",$("#linebox1").width() - $arrowimg.width()/2 +4);

    },

  };

})(jQuery);

