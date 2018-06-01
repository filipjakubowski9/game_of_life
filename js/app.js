document.addEventListener("DOMContentLoaded", function() {

    function GameOfLive(boardWidth, boardHeight) {
        this.width = boardWidth;
        this.height = boardHeight;
        this.board = document.getElementById("board");
        this.cells = [];
    }


    GameOfLive.prototype.createBoard = function() {
        this.board.style.width = 10 * this.width + "px";
        this.board.style.height = 10 * this.height + "px";

        var fieldsSum = this.width * this.height;

        for (var i = 0; i < fieldsSum; i++) {
            var newDiv = document.createElement("div");
            this.board.appendChild(newDiv);
        };

        this.cells = [...document.querySelectorAll("#board div")];

        this.cells.forEach(function(div) {
            div.addEventListener("click", function() {
                if (div.hasAttribute("class")) {
                    div.removeAttribute("class");
                } else {
                    div.setAttribute("class", "live");
                }
            });
        });
    };


    GameOfLive.prototype.coordinates = function(x, y) {
        var index = x + y * this.width;

        return this.cells[index];
    };


    GameOfLive.prototype.setCellState = function(x, y, state) {
        if (state === "live") {
            this.coordinates(x, y).classList.add("live");
        } else if (state === "dead") {
            this.coordinates(x, y).classList.remove("live");
        } else {
            console.log("wrong state");
        }
    };


    GameOfLive.prototype.firstGlider = function() {
        this.setCellState(2, 2, "live");
        this.setCellState(1, 1, "live");
        this.setCellState(2, 1, "live");
        this.setCellState(3, 1, "live");
        this.setCellState(1, 2, "live");
    };




    var game = new GameOfLive(10, 10);
    // console.log(game);
    game.createBoard();
    game.firstGlider();

});
