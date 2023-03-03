import { Button, Container, Form, ListGroup, Card } from 'react-bootstrap';

import { useEffect, useState } from "react"

export default function Rooms({ socket }){
    const [roomsList, setRoomsList] = useState([])
    useEffect(()=>{
        socket.on("rooms", roomsList => {
            setRoomsList([...roomsList])
            console.log(roomsList)
        })
    }, [])
    function createRoom(event) {
        event.preventDefault()
        const form = event.target
        const roomName = form["room"].value
        socket.emit("new room", { nome: roomName })
        //form["room"].value = ""
    }
    return(<>
    <RoomsList roomsList={roomsList}/>
    <Container className='position-absolute' style={{bottom: "0px", maxWidth: "450px"}}>
        <Form onSubmit={createRoom}>
            <Form.Group className="mb-3" controlId="formRoom">
                <Form.Label>Room</Form.Label>
                <div className='d-flex justify-content-around'>
                    <Form.Control type="text" name='room' placeholder="Room name" style={{ maxWidth:"70%" }}/>
                    <Button variant="primary" type="submit">
                    Submit
                    </Button>
                </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Privar sala" name="private"/>
            </Form.Group>
        </Form>
    </Container>
    </>)
}

function RoomsList({roomsList}) {
    return (
        <Card style={{ width: '18rem' }}>
            <ListGroup variant="flush">
                {!roomsList.length
                    ? <ListGroup.Item>Sem salas</ListGroup.Item>
                    :roomsList.map( room => <ListGroup.Item>{room.name}</ListGroup.Item> )
                }
            </ListGroup>
        </Card>
    )
    
}

