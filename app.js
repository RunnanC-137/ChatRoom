require("dotenv").config()
const
    express = require("express"),
    path = require("path"),
    cors = require("cors"),
    { createServer } = require("http"),
    socket = require("socket.io");

const 
    PORT = process.env.PORT || "5000",
    messagesList = {public: new Array()},
    usersList = new Array(),
    roomsList = new Array()

const 
    app = express(),
    httpServer = createServer(app),
    io = socket(httpServer, {
        cors: {
          origin: "http://192.168.100.21:3000",
          credentials: true
        }
      }) // io

app.use(cors())
if(process.env.NODE_ENV !== "development")
    app.use(express.static(path.join(__dirname, "public")))

io.on("connection", startSocket)

function startSocket(socket) {

    socket.emit("rooms", roomsList)

    socket.on("new room", room => {
        roomsList.push(room.nome)
        createRoom(room.nome)
        io.emit("rooms", roomsList)
    })
}

function createRoom(name) {

    const room = io.of(`/${name}`)
    messagesList[name] = new Array()
    //app.use(`/${name}`, express.static(path.join(__dirname, "public", "rooms")))
    room
    .on("connection", socket => {
        socket.emit("new messages", messagesList[name])
        socket.on("user message", message => {
            messagesList[name].push(message)
            usersList.push({usuario: message.usuario, id:message.id})
            room.emit("new messages", messagesList[name])
        })
    })
}

httpServer
.listen(PORT, err => {
    err 
    ? console.log(`Error: ${err}`)
    : console.log(`sevidor rodando no http://192.168.100.21:${PORT}`)
});
