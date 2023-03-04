import { Button, Container, Form } from 'react-bootstrap';
import { useEffect, useState } from "react"

import RoomsList from '../components/RoomsList';

export default function Rooms({ socket }){
    const [roomsList, setRoomsList] = useState([])
    const [roomName, setRoomName] = useState("")
    /*const [error, setError] = useState({error:false, message:null})

    const handleError = (message) => {
        return message 
        ? setError({error:true, message}) 
        : setError({error:false, message:null}) 
    } */
    useEffect(()=>{
        socket.on("rooms", roomsList => {
            setRoomsList([...roomsList])
            console.log(roomsList, "rooms")
        })
    }, [socket])
    function createRoom(event) {
        event.preventDefault()
        const validName = roomNameValidator(roomName)
        /* roomsList.indexOf(roomName) !== -1
        ? socket.emit("new room", { name: roomName })
        : setError({error:true, message:"this name is already being used"}) */
        socket.emit("newRoom", validName)
        setRoomName("") 
    }
    function roomNameValidator(string = String()){
        const 
        stringName = string
        .trim()
        .split(" ")
        if (stringName.length) {
            let newName = "";
            stringName
            .filter(word => word !== "")
            .forEach((word, index) => {
                newName += word
                if (index !== stringName.length - 1)
                    newName += "_"
            })
            return newName
        } else return string
    }
    return(<>
    <RoomsList roomsList={roomsList}/>
    <div>

    
    <Container className='position-absolute bg-secondary text-light p-3' style={{bottom: "0px", maxWidth: "100%"}}>
        <Form onSubmit={createRoom} style={{maxWidth:"500px"}}>
            <Form.Group className="mb-3" controlId="formRoom">
                <Form.Label as="h4">Room</Form.Label>
                <div className='d-flex justify-content-around'>
                    <Form.Control type="text" name='room' placeholder="Room name" style={{ maxWidth:"70%" }} required onChange={(event)=>setRoomName(event.target.value)} value={roomName} />
                    <Button variant="primary " type="submit">
                    Submit
                    </Button>
                </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Privar sala" name="private"/>
            </Form.Group>
        </Form>
    </Container></div>
    </>)
}
