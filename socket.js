const { Users, Rooms } = require("./db")
module.exports = (io) => {
    io.on("connection", (socket) => {

        console.log('user conected');

        socket.emit("rooms", Rooms)

        /* socket.on('leave', (room) => {
            socket.leave(room.name);
            console.log(`User left room: ${room}`);
        });
         */
        socket.on('rooms', () => socket.emit("rooms", Rooms));
        socket.on("newRoom", roomName => {
            const room = Rooms.filter(room => room.name === roomName)[0]
            if(!room)
                Rooms.push({name:roomName, messages:[]})
            socket.emit("rooms", Rooms)
        })
        socket.on("joinRoom", roomName => {
            console.log(`user joined room ${roomName}`);
            const room = Rooms.filter(room => room.name === roomName)[0]
            socket.join(roomName);
            io.to(roomName).emit('messages', room.messages);
        })

        socket.on('newMessage', ({message, roomName}) => {
            const room = Rooms.filter(room => room.name === roomName)[0]
            console.log(`message ${message}`);
            room.messages.push(message)
            console.log(Rooms[0])
            //Users.push({usuario: message.usuario, id:message.id})
            socket.emit("rooms", Rooms)
            io.to(roomName).emit("messages", room.messages)
        })
        
        socket.on('disconnect', () => {
            console.log('user disconnected');
         });
    })


}