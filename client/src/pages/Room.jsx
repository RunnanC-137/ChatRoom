import { useEffect, useState } from "react";
import { Button, Form } from 'react-bootstrap';
import { useParams } from "react-router-dom"
import MessagesList from "../components/MessagesList";

export default function Room({socket}){

    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")

    const { name } = useParams()

    useEffect(() => {
        socket.emit("joinRoom", name )
        socket.on("messages", messages => {
            console.log(messages, "messages")
            setMessages([...messages])
        })
    }, [socket, name])

    useEffect(() => {
        console.log(messages, "messageVar")
    },[messages])

    function sendMessage(event) {
        event.preventDefault()
        socket.emit("newMessage", { message, roomName:name })
        setMessage("")
    }
    return(<div className="d-flex flex-column" style={{height:"100%"}}>
        <div className="p-3 d-flex flex-column align-items-start" style={{height:"90%"}}>
            <MessagesList messageList={messages}/>
        </div>
        <div className="bg-info" style={{height:"10%"}}>
            <SendMessageForm sendMessage={sendMessage} message={message} setMessage={setMessage} />
        </div>
    </div>)
}

function SendMessageForm({sendMessage, message, setMessage }){
    return <Form onSubmit={sendMessage} style={{height:"100%"}}>
        <Form.Group className="mb-3 d-flex align-items-center justify-content-evenly" controlId="formRoom" style={{width:"100%", height:"100%"}}>
                <Form.Control
                type="text" 
                name='room' 
                className=""
                placeholder="Room name" 
                style={{ maxWidth:"85%" }}
                required 
                onChange={(event)=>setMessage(event.target.value)} 
                value={message} />
                <Button variant="primary " type="submit">
                Send
                </Button>
        </Form.Group>
    </Form>
}