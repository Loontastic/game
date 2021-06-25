var player = true;
var shopRows = 3
var shopColumns = 5
selected = ""
createGrid();
createShopGrid();
setShopPrices();
setShopImages();
updateShopImages();
myShop = document.querySelector("#myShop");
function startTurn(player){
    if (checkTurn(player)){
        downloadBoard();
        moveAll();
        generateProduction();
        setActive();
    }
}
function endTurn(){
    changeTurn();
    uploadBoard();
    setDeactive();
}
function checkTurn(player){
    if (/*data*/true == player){
        return true
    }
    return false
}
function moveLogic(col, row, dir, player){
    if (dataGrid[col][row].cost == 0){
        return;
    }
    console.log("GIGASCHU")
    if(col + dir > 9 || col + dir < 0){
        return;
        gameOver();
        /* To be written*/
    }
    if(dataGrid[col+dir][row].health != 0 && dataGrid[col+dir][row].player != player){
        attack(dataGrid[col][row], dataGrid[col+dir][row]);
    }
    if(dataGrid[col+dir][row].health == 0){
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
    tile.myId=0;
    tile.health=0;
    tile.attack=0;
    tile.production=0
    tile.player=-1
}
function createTile(){
    return{
        image:"",
        cost:0,
        myId:0,
        health:0,
        attack:0,
        production:0,
        player:-1
    };
}
function attack(atk, def){
    console.log("ATTACK")
    multi = getMulti(atk,def);
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
    console.log("WOWZA")
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
            newTile.setAttribute("v-on:click", "placeTile(newTile)");
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
            newTile.setAttribute("v-on:click", "selectTile(newTile)");
        }     
    }
}
function setShopPrices(){
    dataShop[0][0].cost=2;
    dataShop[0][0].health = 4
    dataShop[0][0].attack = 2
    for(var i=1;i<=3;i++){
        dataShop[i][0].cost=1
        dataShop[i][0].health = 4
    };
    dataShop[4][0].cost=3;
    
    for (var i=0;i<shopColumns;i++){
        for(var j=1;j<shopRows;j++){
            dataShop[i][j].cost = dataShop[i][0].cost *(j+1);
            dataShop[i][j].health = dataShop[i][0].health *(j+1);
            dataShop[i][j].attack = dataShop[i][0].attack *(j+1);

            
            
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
    for (var i=0;i<1;i++){
        for (var j=0; j<shopRows;j++){
            myShop.childNodes[i].childNodes[j].style.backgroundImage = "url('"+dataShop[i][j].image+"')";
        }
    }
}
function updateGridImages(){
    for (var i=0;i<columns;i++){
        for (var j=0; j<rows;j++){
            myGrid.childNodes[i].childNodes[j].style.backgroundImage = "url('"+dataGrid[i][j].image+"')";
        }
    }
}
function deepCopy(myObject){
    return JSON.parse(JSON.stringify(myObject));
}
/*
myShop.childNodes.forEach(function(row){
    row.childNodes.forEach(function(tile){
        tile.onclick = function(){
            selectedTile = deepCopy(dataShop[tile.id[1]][tile.id[4]]);
            selectedDiv = tile;
            console.log("HI")
        }
    })
});
myGrid.childNodes.forEach(function(row){
    row.childNodes.forEach(function(item){
        item.onclick = function(){
            console.log(dataGrid[item.id[1]][item.id[4]].image )
            if(selectedTile != "" && dataGrid[item.id[1]][item.id[4]].image == ""){
                dataGrid[item.id[1]][item.id[4]] = deepCopy(selectedTile);
                updateShopImages();
                updateGridImages();
                //item.style.backgroundImage = "url('" + selectedTile.image + "')";
                selectedTile = ""
            }
        }
    })
});
*/
document.querySelector('button').onclick = function(){
    moveAll(1);
};




var app = new Vue ({
    el:"#app",
    data:{
        selectedValue: "awef"
        
    },
    methods:{
        selectShopItem: function(tile){
            
            console.log(tile);
        },
        selectTile: function(tile){
            console.log("waaa");
            console.log(tile.id);
            console.log(this);
            console.log(this.id);
            selectedTile = deepCopy(dataShop[this.id[1]][this.id[4]]);
            selectedDiv = this;
            console.log("HI")
        },
        placeTile: function(tile){
            console.log(dataGrid[this.id[1]][this.id[4]].image )
            if(selectedTile != "" && dataGrid[this.id[1]][this.id[4]].image == ""){
                dataGrid[this.id[1]][this.id[4]] = deepCopy(selectedTile);
                updateShopImages();
                updateGridImages();
                //item.style.backgroundImage = "url('" + selectedTile.image + "')";
                selectedTile = ""
            }
        }
    },
    computed:{
        selectItem: function(){
            console.log("test");
        }
    }

})

