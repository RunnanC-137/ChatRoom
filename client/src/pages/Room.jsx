import { useEffect, useState } from "react";
import { Button, Container, Form } from 'react-bootstrap';
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
    return(<>
        <MessagesList messageList={messages}/>
        <div>
        <Container className='position-absolute bg-success text-light p-3' style={{bottom: "0px", maxWidth: "100%"}}>
            <Form onSubmit={sendMessage} style={{maxWidth:"500px"}}>
                <Form.Group className="mb-3" controlId="formRoom">
                    <Form.Label as="h4">Send a message</Form.Label>
                    <div className='d-flex justify-content-around'>
                        <Form.Control type="text" name='room' placeholder="Room name" style={{ maxWidth:"70%" }} required onChange={(event)=>setMessage(event.target.value)} value={message} />
                        <Button variant="primary " type="submit">
                        Submit
                        </Button>
                    </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Privar sala" name="private"/>
                </Form.Group>
            </Form>
        </Container>
        </div>
    </>)
}