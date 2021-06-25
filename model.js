const mongoose = require("mongoose");
const { stringify } = require("querystring");

const gameSchema = mongoose.Schema({
    lobbyID: String,
    board: String,
    turn: Number,
    gameOver: Boolean,
});

const Game = mongoose.model("Game", gameSchema)

module.exports = {
    Game,
}
