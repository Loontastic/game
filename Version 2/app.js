var player = true;
turnDir = 1;
var playerDir = 1;
var shopRows = 3
var shopColumns = 5
var gold = 2;
var maxGold = 0;
selected = ""
createGrid();
createShopGrid();
setShopPrices();
setShopImages();
updateShopImages();
myShop = document.querySelector("#myShop");
function startTurn(dir){
    let temp = false
    if(dir == 1){
        temp = true
    }
    if (player == temp){
        //downloadBoard();
        moveAll(dir, temp);
        generateProduction();
        //setActive();
    }
}
function generateProduction(){
    maxGold += 2;
    changeGold(maxGold);
}
function changeGold(num){
    gold = num
    document.getElementById("moneyDiv").innerHTML = gold;
}
function endTurn(){
    
    console.log("HI ")
    //changeTurn();
    //uploadBoard();
    //setDeactive();
}
function moveLogic(col, row, dir, player){
    if(dir != dataGrid[col][row].controlled){
        return;
    }
    if (dataGrid[col][row].cost == 0){
        return;
    }
    if(col + dir > 9 || col + dir < 0){
        gameOver();
        return;
        /* To be written*/
    }
    if(dataGrid[col+dir][row].health != 0 && dataGrid[col+dir][row].player != player && dataGrid[col][row].controlled != dataGrid[col+dir][row].controlled){
        attack(dataGrid[col][row], dataGrid[col+dir][row]);
    }
    if(dataGrid[col+dir][row].health == 0   ){
        advance(col, row, dir);
    }
}
function advance(col, row, dir){
    dataGrid[col+dir][row] = deepCopy(dataGrid[col][row]);
    resetTile(dataGrid[col][row]);
}
function resetTile(tile){
    tile.image="";
    tile.cost=0;
    tile.myId=-1;
    tile.health=0;
    tile.maxHealth = 0;
    tile.attack=0;
    tile.production=0
    tile.player=-1
}
function createTile(){
    return{
        image:"",
        cost:0,
        myId:-1,
        health:0,
        attack:0,
        production:0,
        player:-1
    };
}
function attack(atk, def){
    multi = getMulti(atk,def);
    console.log(def.attack + " " + atk.attack)
    def.health -= atk.attack*multi[0];
    atk.health -= def.attack*multi[1];
    if(def.health <= 0){
        resetTile(def)
    }
    if(atk.health <=0 ){
        resetTile(atk)
    }
}
function getMulti(atk,def){
    if((atk.myId == 0 && def.myId == 2)||(atk.myId == 1 && def.myId == 0)||(atk.myId == 2 && def.myId == 1)){
        return[2,0.5]
    }else if((atk.myId == 0 && def.myId == 1)||(atk.myId == 1 && def.myId == 2)||(atk.myId == 2 && def.myId == 0)){
        return[0.5,2]
    }else{
        return[1,1]
    }   
}
function moveAll(dir, player){
    if (dir > 0){
        for(var i=dataGrid.length-1; i>=0; i--){
            for (var j = 0; j<dataGrid[i].length; j++){
                moveLogic(i, j, dir, player);
            }
        }
    }
    if (dir < 0){
        for(var i=0; i<dataGrid.length; i++ ){
            for (var j = 0; j<dataGrid[i].length; j++){

                moveLogic(i,j,dir, player);
            }
        }
    }
    update();
}
function update(){
    updateGridImages();
    updateShopImages();
    endTurn();

}
function gameOver(){
    console.log("you won or lost")
}
function createGrid(){
    myGrid = document.querySelector("#myBoard");
    dataGrid = [];
    rows = 3;
    columns = 10;
    while (myGrid.firstChild){
        myGrid.removeChild(myGrid.firstChild);
    }
    for(var j = 0; j < columns; j++){
        var newColumn = document.createElement("div");
        var dataColumn = [];
        dataGrid.push(dataColumn);
        myGrid.appendChild(newColumn)
        for(var i=0;i<rows;i++){
            var newTile = document.createElement("div");
            newTile.classList.add("tile");
            newColumn.appendChild(newTile);
            var theId = "["+j+"]"+"["+i+"]"
            newTile.setAttribute("id",theId);
            dataColumn.push(createTile());
            newTile.setAttribute("v-on:click", "placeTile");
            if(j < 4){
                newTile.style.backgroundColor = "green";
            }else if(j < 6){
                newTile.style.backgroundColor = "grey";
            }else{
                newTile.style.backgroundColor = "red";
            }
        }     
    }
}
function createShopGrid(){
    myShop = document.querySelector("#myShop");
    dataShop = []
    while (myShop.firstChild){
        myShop.removeChild(myShop.firstChild);
    }
    for(var j = 0; j < shopColumns; j++){
        var newColumn = document.createElement("div");
        var dataColumn = []
        dataShop.push(dataColumn)

        myShop.appendChild(newColumn)
        for(var i=0;i<shopRows;i++){
            var newTile = document.createElement("div");
            newTile.classList.add("shopTile");
            newTile.setAttribute("id","["+j+"]"+"["+i+"]");
            newColumn.appendChild(newTile);
            dataColumn.push(createTile());
            newTile.setAttribute("v-on:click", "selectTile");
        }     
    }
}
function setShopPrices(){
    for(var i = 0; i < 3; i++){
        dataShop[i][0].cost=2;
        dataShop[i][0].health = 4
        dataShop[i][0].maxHealth = 4
        dataShop[i][0].attack = 2
        dataShop[i][0].myId = i;
    }
    dataShop[4][0].cost=3;
    for (var i=0;i<shopColumns;i++){
        for(var j=1;j<shopRows;j++){
            dataShop[i][j].cost = dataShop[i][0].cost *(j+1);
            dataShop[i][j].health = dataShop[i][0].health *(j+1);
            dataShop[i][j].attack = dataShop[i][0].attack *(j+1);
            dataShop[i][j].maxHealth = dataShop[i][0].maxHealth *(j+1);
            dataShop[i][j].myId = i;
            
            
        }
    }
}
function setShopImages(){
    for (var i=0;i<shopColumns;i++){
        for (var j=0; j<shopRows;j++){
            dataShop[i][j].image = "Images/Row " + i + "/" + j + ".jpg"
        }
    }
}
function updateShopImages(){
    for (var i=0;i<3;i++){
        for (var j=0; j<shopRows;j++){
            myShop.childNodes[i].childNodes[j].style.backgroundImage = "url('"+dataShop[i][j].image+"')";
        }
    }
}
function updateGridImages(){
    var gridBoard = document.getElementById("myBoard");
    for (var i=0;i<columns;i++){
        for (var j=0; j<rows;j++){
            let dataGridTile = dataGrid[i][j]
            let physicalGridBoard = gridBoard.childNodes[i].childNodes[j]
            physicalGridBoard.style.backgroundImage = "url('"+dataGridTile.image+"')";
            while (physicalGridBoard.firstChild){
                physicalGridBoard.removeChild(physicalGridBoard.firstChild);
            }
            if(dataGridTile.health > 0){                
                var newTile = document.createElement("div");
                newTile.style.height = '10px';
                newTile.style.backgroundColor = "red";
                newTile.style.width = (100*dataGridTile.health)/dataGridTile.maxHealth+"px";
                physicalGridBoard.appendChild(newTile);
            }
        }
    }
}
function deepCopy(myObject){
    return JSON.parse(JSON.stringify(myObject));
}


var app = new Vue ({
    el:"#app",
    data:{
        selectedValue: "awef",
        playersTurn: true
        
    },
    methods:{

        selectTile: function(tile){
            selectedTile = deepCopy(dataShop[tile.target.id[1]][tile.target.id[4]]);
            selectedDiv = tile.target;
            if(gold < selectedTile.cost){
                selectedTile = ""
                selectedDiv = ""
            }
        },
        placeTile: function(tile){
            if(selectedTile != "" && dataGrid[tile.target.id[1]][tile.target.id[4]].image == "" && ((tile.target.id[1] < 4 && turnDir == 1) || (tile.target.id[1] > 5 && turnDir == -1))){
                dataGrid[tile.target.id[1]][tile.target.id[4]] = deepCopy(selectedTile);
                dataGrid[tile.target.id[1]][tile.target.id[4]].controlled = turnDir;
                changeGold(gold-dataGrid[tile.target.id[1]][tile.target.id[4]].cost);
                this.updateImages();
                //item.style.backgroundImage = "url('" + selectedTile.image + "')";
                selectedTile = ""
            }
        },
        updateImages: function (){
            updateShopImages();
            updateGridImages();
        },
        passTurn: function(){
            this.playersTurn = (turnDir == playerDir);

            turnDir = turnDir * -1;
            startTurn(turnDir);
        }

    },

})

