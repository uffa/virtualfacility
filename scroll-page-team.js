VF = window.VF || {};

pagescript = "team";

(function( $ ) {
  VF.animPage = {
    presetup: function() {
      var _this = this;
      VF.animModule.hookpos = 0.46;

      $(".team_sec1").addClass("linestart1");
      $(".team_sec1_line2").addClass("linetrigger1");
      $(".team_teamcontainer").addClass("lineend1");

      _this.scrollin(".team_teamitem",10);
      //$(".team_headshotborder").addClass("activate");

    },
  createlines: function() {
    var _this = this;

      var linebox,boxheight,x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,y1,y2,y3,y4,y5,y6,y7,y8,y9,y10;
      var construct, draw, polyline;

      ////////////////////////////////////////////////
      $lb = _this.addlinebox();
      x1 = x2 = 4;
      y1 = 0;
      y2 = y3 = _this.middleOf(".team_sec1_line1innertext-copy h1 ");
      x3 = x4 = _this.boxWidth();
      y4 = y5 = _this.bottomOf(".sol_sec1_line1");
      x5 = x6 = _this.leftOf(".team_sec1_line2");
      y6 = _this.boxHeight();


      _this.constructline([x1,y1,x2,y2,x3,y3,x4,y4,x5,y5,x6,y6,x7,y7,x8,y8,x9,y9,x10,y10]);



    },

  };

})(jQuery);

