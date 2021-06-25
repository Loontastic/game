const server = require ("./server")
const persist = require("./persist")
//const checkTurn = require("./checkturn")

const port = process.argv[2] || process.env.PORT || 4040;

persist.connect(()=>{
    //start the server
    server.listen(port, ()=> {
        console.log(`Running Server on Port ${port}`)
    })
})
//connect to the databse
setInterval(()=>{
    //checkTurn.fdasf();
    //Fix this
}, 1000)
