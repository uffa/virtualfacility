VF = window.VF || {};

(function( $ ) {
  VF.animPage = {
    presetup: function() {
      var _this = this;
      VF.animModule.hookpos = 0.46;

      $(".solutions_sec1").addClass("linestart1");
      $(".solutions_invoicingsection").addClass("linestart2 lineend1");
      $(".solutions_alarmsection").addClass("linestart3 lineend2");
      $(".sol_secasset").addClass("linestart4 startdiv lineend3");
      $("footer").addClass("lineend4").attr("durationoffset","450");

    },
  createlines: function() {
    var _this = this;

      var linebox,boxheight,x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,y1,y2,y3,y4,y5,y6,y7,y8,y9,y10;
      var construct, draw, polyline;

      ////////////////////////////////////////////////
      $lb = _this.addlinebox();
      x1 = x2 = _this.boxLeft();
      y1 = _this.bottomOf(".sol_sec1_heading1wrap");
      y2 = y3 = y1 + 80;
      x3 = x4 = _this.boxCenter();
      y4 = y5 = _this.bottomOf(".home_sec2_productblockwrapper") + 150;
      x5 = x6 = _this.boxLeft();
      y6 = _this.boxHeight();
      _this.constructline([x1,y1,x2,y2,x3,y3,x4,y4,x5,y5,x6,y6,x7,y7,x8,y8,x9,y9,x10,y10]);
      x1=y1=x2=y2=x3=y3=x4=y4=x5=y5=x6=y6=x7=y7=x8=y8=x9=y9=x10=y10=null; // reset vars

      ////////////////////////////////////////////////
      $lb = _this.addlinebox();
      x1 = x2 = _this.boxLeft();
      y1 = 0;
      y2 = y3 =  _this.middleOf(".sol_secinv_heading");
      x3 = x4 = _this.rightOf(".sol_secinv_headingwrap");
      y4 = y5 = _this.bottomOf(".sol_secinv_headingwrap");
      x5 = x6 = _this.boxLeft();
      y6 = _this.boxHeight();

      _this.constructline([x1,y1,x2,y2,x3,y3,x4,y4,x5,y5,x6,y6,x7,y7,x8,y8,x9,y9,x10,y10]);
      x1=y1=x2=y2=x3=y3=x4=y4=x5=y5=x6=y6=x7=y7=x8=y8=x9=y9=x10=y10=null; // reset vars

      ////////////////////////////////////////////////
      $lb = _this.addlinebox();
      x1 = _this.boxLeft();
      x2 = x3 = _this.leftOf(".sol_secalarm_heading1");
      y1 = y2 =  _this.middleOf(".sol_secalarm_heading1");
      y3 = y4 = _this.topOf(".sol_secalarm_ulwrap");
      x4 = x5 = _this.rightOf(".sol_secalarm_ulwrap ul");
      y5 = y6 = _this.bottomOf(".sol_secalarm_ulwrap");
      x6 = x7 = _this.boxCenter();
      y7 = _this.topOf('.sol_secalarm_ctawrap');

      _this.constructline([x1,y1,x2,y2,x3,y3,x4,y4,x5,y5,x6,y6,x7,y7,x8,y8,x9,y9,x10,y10]);
      x1=y1=x2=y2=x3=y3=x4=y4=x5=y5=x6=y6=x7=y7=x8=y8=x9=y9=x10=y10=null; // reset vars

      ////////////////////////////////////////////////
      $lb = _this.addlinebox();
      x1 = _this.boxWidth();
      y1 = y2 = _this.middleOf(".sol_secasset_heading");
      x2 = x3 = _this.leftOf(".sol_secasset_heading");
      y3 = y4 = _this.bottomOf(".sol_secasset_ulwrap");
      x4 = x5 = _this.boxCenter();



      _this.constructline([x1,y1,x2,y2,x3,y3,x4,y4,x5,y5,x6,y6,x7,y7,x8,y8,x9,y9,x10,y10]);
      x1=y1=x2=y2=x3=y3=x4=y4=x5=y5=x6=y6=x7=y7=x8=y8=x9=y9=x10=y10=null; // reset vars
    },

  };

})(jQuery);

