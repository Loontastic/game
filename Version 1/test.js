/*------------------------------------------------------------------------------------------------------------------*/

var columnOne = document.getElementsByClassName("column-one");
var columnTwo = document.getElementsByClassName("column-two");
var columnThree = document.getElementsByClassName("column-three");
var columns = [columnOne, columnTwo, columnThree];
/*Get's all of the columns from the DOM*/

var rowOne = document.getElementById("row-one").getElementsByClassName("column");
var rowTwo = document.getElementById("row-two").getElementsByClassName("column");
var rowThree = document.getElementById("row-three").getElementsByClassName("column");
var rows = [rowOne, rowTwo, rowThree];
/*Get's all of the rows from the DOM*/

var allBoxes = document.getElementsByClassName("column");
var turn = 0;
var gameOver = false;
/*Starts with the game over being false. When the game is over,
no more X's or O's are placed*/
rowColumnCheck = function(rowsOrColumns) {
    var i;
    for (i = 0; i<3; i++) {
        if (rowsOrColumns[i][0].innerHTML == rowsOrColumns[i][1].innerHTML && rowsOrColumns[i][1].innerHTML == rowsOrColumns[i][2].innerHTML) {
            if (rowsOrColumns[i][0].innerHTML == "X"){
                return(1);
            }else if (rowsOrColumns[i][0].innerHTML == "O") {
                return(2);
            }
        }
    }
};
/*The logic to check if we have three in a row either horizontally or vertically.
Returns 1 if X wins, 2 if O wins. This is for logical checking purposes. */
diagonalCheck = function() {
    if (rowOne[0].innerHTML == rowTwo[1].innerHTML && rowTwo[1].innerHTML == rowThree[2].innerHTML){
        if (rowTwo[1].innerHTML == "X"){
            return(1);
        }
        if (rowTwo[1].innerHTML == "O"){
            return(2);
        }
    }else if (rowOne[2].innerHTML == rowTwo[1].innerHTML && rowTwo[1].innerHTML == rowThree[0].innerHTML) {
        if (rowTwo[1].innerHTML == "X"){
            return(1);
        }
        if (rowTwo[1].innerHTML == "O"){
            return(2);
        }
    }
};
/*The logic to check if we have three in a row diagonally.
Returns 1 if X wins, 2 if O wins. This is for logical checking purposes. */
allCheck = function() {
    var proxyRows = rowColumnCheck(rows);
    var proxyColumns = rowColumnCheck(columns);
    var proxyDiagonal = diagonalCheck();
    if (proxyRows == 1 || proxyColumns == 1 || proxyDiagonal == 1) {
        document.querySelector("#declaration").innerHTML = "X WINS!";
        gameOver = true;
    }else if (proxyRows == 2 || proxyColumns == 2 || proxyDiagonal==2){
        document.querySelector("#declaration").innerHTML = "O WINS!";
        gameOver = true;
    }
};
/*A function that checks if someone has won using the logic implemented above.
We call this function whenever we place an X or an O*/
myTurn = true;
shopList



assignClick = function(k,m) {


    


    allBoxes[a].onclick = function() {
        if (!myTurn) {
            return;
        }
        selected = shopList[k][m]
        if (allBoxes[a].innerHTML == ""){
            console.log(this.id)
            if (turn % 2 == 0) {
                allBoxes[a].innerHTML = "X";
                document.querySelector("h2").innerHTML = "It's player O's turn";
            }else{
                allBoxes[a].innerHTML = "O";
                document.querySelector("h2").innerHTML = "It's player X's turn";
            }
            turn++;
            allCheck();
        }
    };
    };
/*If the clicked square is blank, it places an X or an O depending on who's turn it is.
It checks the turn by finding out if the turn is odd or even. It also checks if someone 
has won after they have placed their X or O. */
    for (var k=0;k<10;k++){
        for(var m = 0; m < 3; m++){
            assignClick(k,m);

        }
            
    }
/*Very Spaghetti. This was made before I knew about the "foreach" functionality.
It assigns the click functionality to each tile*/
document.querySelector("#submit-answer").onclick = function() {
    gameOver = false;
    turn = 0;
    var i;
    for (i=0; i<9; i++) {
        allBoxes[i].innerHTML = ""
    }
    document.querySelector("#declaration").innerHTML = "";
    document.querySelector("h2").innerHTML = "It's player X's turn";
}
