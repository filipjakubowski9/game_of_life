document.addEventListener("DOMContentLoaded", function() {

    function GameOfLife(boardWidth, boardHeight) {
        this.width = boardWidth;
        this.height = boardHeight;
        this.board = document.getElementById("board");
        this.cells = [];
    }


    GameOfLife.prototype.createBoard = function() {
        this.board.style.width = 10 * this.width + "px";
        this.board.style.height = 10 * this.height + "px";

        var fieldsSum = this.width * this.height;

        for (var i = 0; i < fieldsSum; i++) {
            var newDiv = document.createElement("div");
            this.board.appendChild(newDiv);
            this.cells.push(newDiv);
        };

        this.cells = [...document.querySelectorAll("#board div")];

        this.cells.forEach(function(div) {
            div.addEventListener("mouseover", function() {
                div.classList.toggle("live");
            });
        });
    };


    GameOfLife.prototype.coordinates = function(x, y) {
        var index = x + y * this.width;
        return this.cells[index];
    };


    GameOfLife.prototype.setCellState = function(x, y, state) {
        if (state === "live") {
            this.coordinates(x, y).classList.add("live");
        } else if (state === "dead") {
            this.coordinates(x, y).classList.remove("live");
        }
    };


    // GameOfLife.prototype.firstGlider = function() {
    //     this.setCellState(2, 2, "live");
    //     this.setCellState(1, 1, "live");
    //     this.setCellState(2, 1, "live");
    //     this.setCellState(3, 1, "live");
    //     this.setCellState(1, 2, "live");
    // };


    GameOfLife.prototype.computeCellNextState = function(x, y) {

        var aliveCounter = 0;

        if (x-1 >= 0 && y-1 >= 0) {
            if (this.coordinates(x-1, y-1).className === 'live') { //1
                aliveCounter++;
            }
        }
        if (y-1 >= 0) {
            if (this.coordinates(x, y-1).className === 'live') { //2
                aliveCounter++;
            }
        }
        if (x+1 < this.height && y-1 >= 0) {
            if (this.coordinates(x+1, y-1).className === 'live') { //3
                aliveCounter++;
            }
        }
        if (x-1 >= 0) {
            if (this.coordinates(x-1, y).className === 'live') { //4
                aliveCounter++;
            }
        }
        if (x+1 < this.height) {
            if (this.coordinates(x+1, y).className === 'live') { //5
                aliveCounter++;
            }
        }
        if (x-1 >= 0 && y+1 < this.width) {
            if (this.coordinates(x-1, y+1).className === 'live') { //6
                aliveCounter++;
            }
        }
        if (y+1 < this.width) {
            if (this.coordinates(x, y+1).className === 'live') { //7
                aliveCounter++;
            }
        }
        if (x+1 < this.height && y+1 < this.width) {
            if (this.coordinates(x+1, y+1).className === 'live') { //8
                aliveCounter++;
            }
        }

        if (this.coordinates(x, y).className === 'live') {
            if (aliveCounter < 2 || aliveCounter > 3) {
                return 0;
            }
            else {
                return 1;
            }
        }
        if (this.coordinates(x, y).className !== 'live') {
            if (aliveCounter === 3) {
                return 1;
            }
            else {
                return 0;
            }
        }
    };


    GameOfLife.prototype.computeNextGeneration = function() {
        this.nextGeneration = [];
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                this.nextGeneration.push(this.computeCellNextState(i, j));
            }
        }
        return this.nextGeneration;
    };


    GameOfLife.prototype.printNextGeneration = function() {
        var nextGenerationArr = this.computeNextGeneration();
        for (var i = 0; i < this.cells.length; i++) {
            if (nextGenerationArr[i] === 1) {
                this.cells[i].classList.add("live");
            } else {
                this.cells[i].classList.remove("live");
            }
        }
    };


    var create = document.querySelector(".create");

    create.addEventListener("click", function() {
        var inputWidth = document.querySelector(".inputWidth");
        var inputHeight = document.querySelector(".inputHeight");
        var game = new GameOfLife(inputWidth.value, inputHeight.value);
        // console.log(game);
        game.createBoard();

        var play = document.querySelector("#play");
        var pause = document.querySelector("#pause");

        play.addEventListener("click", function() {
            var interval = setInterval(function () {
                game.printNextGeneration();
            }, 500);
            pause.addEventListener("click", function() {
                clearInterval(interval);
            })
        });
    });


    // game.firstGlider();

});
