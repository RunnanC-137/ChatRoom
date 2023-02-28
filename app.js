const
    express = require("express"),
    path = require("path"),
    cors = require("cors"),
    { createServer } = require("http"),
    { Server } = require("socket.io");

const 
    PORT = process.env.PORT || "3333",
    messagesList = {public: new Array()},
    usersList = new Array(),
    roomsList = new Array()

const 
    app = express(),
    httpServer = createServer(app),
    io = new Server(httpServer) // io

app.use(cors())
app.use(express.static(path.join(__dirname, "public")))

io.on("connection", socket => {
    socket.emit("rooms", roomsList)
    //socket.broadcast.emit("New User", {message: "Chegou um novo usuario"})
    socket.on("new room", room => {
        roomsList.push(room.nome)
        createRoom(room.nome)
        io.emit("rooms", roomsList)
    })
})

function createRoom(name) {
    messagesList[name] = new Array()
    app.use(`/${name}`, express.static(path.join(__dirname, "public", "rooms")))
    io.of(`/${name}`).on("connection", socket => {
        socket.emit("new messages", messagesList[name])
        socket.on("user message", message => {
            messagesList[name].push(message)
            usersList.push({usuario: message.usuario, id:message.id})
            io.of(`/${name}`).emit("new messages", messagesList[name])
        })
    })
}

//create a server 
httpServer
.listen(PORT, err => {
    err 
    ? console.log(`Error: ${err}`)
    : console.log(`sevidor rodando no http://localhost:${PORT}`)
});
