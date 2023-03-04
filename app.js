require("dotenv").config()
const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")
const cors = require("cors")
const path = require("path")

const PORT = process.env.PORT || "5000"

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
      origins: ["http://192.168.100.21:3000", "http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true
    }
  });

app.use(cors())

require("./socket")(io)

if(process.env.NODE_ENV !== "development")
    app.use(express.static(path.join(__dirname, "public")))

httpServer
.listen(PORT, err => {
    err 
    ? console.log(`Error: ${err}`)
    : console.log(`sevidor rodando no http://192.168.100.21:${PORT}`)
});
