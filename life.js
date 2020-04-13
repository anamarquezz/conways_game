(function() {
    var _ = self.Life = function (seed){
        this.seed = seed;
        this.height = seed.length;
        this.width = seed[0].length;
        this.prevBoard = [];
        this.board = cloneArray(seed);
    };

    _.prototype = {
        next: function(){
            this.prevBoard = cloneArray(this.board);

            for (var y =0; y < this.height; y++){
                for(var x=0; x<this.width; x++){
                    var neighbors = this.aliveNeighbors(this.prevBoard, x, y);
                    
                    var alive = !!this.board[y][x];

                    if(alive){
                        if(neighbors < 2 || neighbors > 3){
                            this.board[y][x] = 0;
                        }
                    }else{
                        if (neighbors == 3){
                            this.board[y][x] = 1;
                        }
                    }
                }
            }
        },
        aliveNeighbors: function (array, x, y){          
            var preRow =  array[y-1] || [];
            var nextRow = array[y+1] || [];
            return  [
                preRow[x-1], preRow[x], preRow[x+1],
                array[y][x-1], array[y][x+1],
                nextRow[x-1], nextRow[x], nextRow[x+1]
            ].reduce(function (prev, cur){
                return prev + +!!cur; //convert to bolian
            }, 0);
            return sum;
        },
        toString: function (){
            return this.board.map(function (row) {return row.join(' '); }).join('\n');
        }
    };

    //Helpers
    //Warning: Only clones 2Dimensions arrays
    function cloneArray(array){
        return array.slice().map(function (row) { return row.slice(); });
    }
})();

/* 
+undefined = NaN, if have undefined and use plus on it, returns none
!!undefined = false, if have undefined and use bullion on it, returns false
+!!undefined = 0, if have undefined and use plus and bullion on it, returns 0

 

TEST ON CONSOLE

@BLINKER (period 2)
var game = new Life([
    [0,0,0,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,0,0,0],
]);

console.log(game + '');
game.next();
console.log(game + '');

console.log(game + '');
game.next();
console.log(game + ''); 

@Toad (period 2)
var game = new Life([
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,1,1,1,0],
    [0,1,1,1,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0]
]);

console.log(game + '');
game.next();
console.log(game + '');

console.log(game + '');
game.next();
console.log(game + '');*/

(function () {
    var _ = self.LifeView = function( table, size){
        this.grid = table;
        this.size = size;
        this.createGrid();
    };

    _.prototype = {
        createGrid: function (){
            var fragment = document.createDocumentFragment(); //https://developer.mozilla.org/es/docs/Web/API/Document/createDocumentFragment
            this.grid.innerHTML = '';
            this.checkboxes = [];

            for (var y=0; y < this.size; y++){
                var row = document.createElement('tr');   
                this.checkboxes[y] =[];         

                for(var x=0; x<this.size; x++){
                    var cell = document.createElement('td');
                    var checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    this.checkboxes[y][x] = checkbox;

                    cell.appendChild(checkbox);
                    row.appendChild(cell);
                }
                fragment.appendChild(row);
            }
            this.grid.appendChild(fragment);
        },
        get boardArray(){
            return this.checkboxes.map(function (row){
                return row.map(function (checkbox){
                    return +checkbox.checked; //convert to a number with the +
                });
            });
        },
        play: function () {
            this.game = new Life(this.boardArray);
        },
        next: function() {
            this.game.next();
            var board = this.game.board;

           for ( var y =0; y< this.size; y++){
               for( var x=0; x<this.size;x++){
                   this.checkboxes[y][x].checked = !!board[y][x];
               }
           }
        },

    };            
    
    })();

    var lifeView =new LifeView(document.getElementById('grid'),12);