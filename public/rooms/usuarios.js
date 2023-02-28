
/* function getCookie(name) {
let cookie = {};
document.cookie.split(';')
.forEach(function(el) {
    let [k,v] = el.split('=');
    cookie[k.trim()] = v;
})

return cookie[name];

}
const myCookie = getCookie("token") */
let url = window.location.href
let room = window.location.pathname.replace(/\//g, '')
if (url[url.length - 1] === "/") {
    url = url.slice(0, url.length - 1)
}
    

document.addEventListener("DOMContentLoaded", () => {
    const socket = io(`http://192.168.100.21:3333/${room}`);
    socket.on("connect", () => {
        const nome = window.prompt("Qual é o seu nome usuario?") || `user`    
        document.querySelector("#usuario").innerHTML = nome
        putMessages(socket)
        sendMessage(nome, socket)
    })
    ;
})

function putMessages(socket) {
    socket.on("new messages", messages => {
        document.querySelector("#messages")
            .innerHTML = ""
        messages.forEach(message => {
            document.querySelector("#messages")
            .innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
              <div class="fw-bold">${message.usuario}</div>
              ${message.message}
            </div>
          </li>`
        })
    })
}

function sendMessage(nome, socket) {
    document
    .querySelector('#message')
        .addEventListener("submit", form => {
            form.preventDefault()
            const message = form.target["message"].value
            socket.emit("user message", {message: `${message}`, usuario:nome, id:socket.id})
            form.target["message"].value = ""
        })
}