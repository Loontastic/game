const propertyList = ['lobbyID','board', 'turn' ,'gameOver']

// import express so you can use it
const express = require('express');
const {Game} = require('./model')
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.static('static'))
app.use(express.json({}));

app.get('/game', (req, res)=>{
    res.setHeader("Content-Type", "application/json");
    console.log(`Getting all games`);
    let findQuery = {};
    for (const property in propertyList){   
        if (req.query[propertyList[property]]){
            findQuery[propertyList[property]] = req.query[propertyList[property]];
        }
    }
    Game.find(findQuery, (err, game)=>{
        if (err){
            console.log(`there was an error finding all the games`)
            res.status(500).send(
                JSON.stringify({message:`unable to find the games`,
                error:err})
            );
            return;
        }
        res.status(200).json(game);
    });
    //return all of the games in the store
});
app.get('/game/:id', (req, res)=>{
    res.setHeader("Content-Type", "application/json");
    console.log(`Getting a game with id: ${req.params}`)
    Game.findById(req.params.id, (err, game)=>{
    if (err){
        console.log(`there was an error`)
        res.status(500).send(
            JSON.stringify({
                message: `unable to find game with id ${req.params.id}`,
                error:err,
            })
        );
        return;
    }else if (!game) {
        console.log(`there was an error`)
        res.status(500).send(
            JSON.stringify({
                message: `unable to find game with id ${req.params.id}`,
                error:"This game doesn't exist!",
            })
        );
        return;
    }
        res.status(200).json(game);
    });
})

module.exports = app;
