(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$el = $el;

    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    var view = this;
    $(".grid").on("click", function(evt) {
      view.makeMove($(evt.target))
      if(view.game.isOver()){
        if(view.game.winner() === null){
          alert("this is a tie")
        }else{
          alert("you win the game " + view.game.winner());
        }
        $('.grid').off('click');
      }
    });
  };

  View.prototype.makeMove = function ($square) {
    var view = this;
    var pos = [$square.data("position").row, $square.data("position").col];
    if (view.game.board.isEmptyPos(pos)) {
      $square.addClass(view.game.currentPlayer);
      $square.text(view.game.currentPlayer.toUpperCase());
      view.game.playMove(pos);
    } else {
      alert("Not valid!");
    }
  };

  View.prototype.setupBoard = function () {

    var box = $("<div></div>")
    box.addClass("ttt-box group");

    for(var j = 0; j < 3; j++){
      var row = $("<div></div>");
      row.addClass("grid-row group");
      for(var i = 0; i < 3; i++){
        var grid = $("<div></div>");
        grid.addClass("grid");
        grid.data("position", {row: j, col: i});
        row.append(grid);
      }
      box.append(row);
    }

    this.$el.append(box);
  };
})();
