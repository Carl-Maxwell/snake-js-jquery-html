(function () {
  if (typeof Hanoi === "undefined") {
    window.Hanoi = {};
  }

  var View = Hanoi.View = function (game, $el) {
    this.game = game;
    this.$el = $el;

    this.firstClick = null;
    this.secondClick = null;

    this.setupPegs();
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    var view = this;

    $(".hanoi-box").on("click", ".peg", function(event){
      var peg = $(event.currentTarget);
      var idx = peg.data("peg-position").idx;

      if (view.firstClick === null){
        view.firstClick = idx;
        peg.addClass("firstClick");
      }else{
        view.secondClick = idx;

        if (view.game.isValidMove(view.firstClick, view.secondClick)) {
          view.game.move(view.firstClick, view.secondClick);
          view.makeMove(view.firstClick, view.secondClick);

          if (view.game.isWon()) {
            alert("Victory!");
            $('.hanoi-box').off('click');
          }
        }else{
          alert("Invalid Move!");
        }

        $(".peg.firstClick").removeClass("firstClick");
        view.firstClick = null;
        view.secondClick = null;
      }
    });


    // $(".grid").on("click", function(evt) {
    //   view.makeMove($(evt.target))
    //   if(view.game.isOver()){
    //     if(view.game.winner() === null){
    //       alert("this is a tie")
    //     }else{
    //       alert("you win the game " + view.game.winner());
    //     }
    //     $('.grid').off('click');
    //   }
    // });
  };

  View.prototype.makeMove = function (firstPeg, secondPeg) {
    var view = this;

    var plate = $('.peg').eq(firstPeg).find(".plate").eq(0);
    $('.peg').eq(secondPeg).find('.plateslot').eq(0).prepend(plate);

    // var pos = [$square.data("position").row, $square.data("position").col];
    // if (view.game.board.isEmptyPos(pos)) {
    //   $square.addClass(view.game.currentPlayer);
    //   $square.text(view.game.currentPlayer.toUpperCase());
    //   view.game.playMove(pos);
    // } else {
    //   alert("Not valid!");
    // }
  };

  View.prototype.setupPegs = function () {
    var box = $("<div></div>")
    box.addClass("hanoi-box group");

    for(var j = 0; j < 3; j++){
      var peg = $("<div></div>");
      peg.addClass("peg group");
      peg.data("peg-position", {idx: j});

      var plateSlot = $("<div></div>");
      plateSlot.addClass('plateslot');
      if(j === 0){
        for(var i = 0; i < 3; i++){
          var plate = $("<div></div>");
          plate.addClass("plate");
          plate.width((i+1) * 100);
          plate.text(i+1);
          plateSlot.append(plate);
        }
      }

      peg.append(plateSlot);

      box.append(peg);
    }

    this.$el.append(box);
  };
})();
