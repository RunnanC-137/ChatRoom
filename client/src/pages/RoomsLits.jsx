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
    return(<div style={{ height:"100vh"}} className="d-flex flex-column">
        <div className='bg-secondary' style={{height: "10%"}}>
            <Container className='d-flex py-3' style={{height: "100%"}}>
                <div className='bg-primary align-self-stretch rounded-circle d-flex justify-content-center text-white' style={{width: "40px"}}>
                    <h4 className='m-0 my-auto'>U</h4>
                </div>
                <h3 className='ps-5 m-0'>User name</h3>
            </Container>
        </div>
        <div className='bg-primary' style={{height: "10%"}}>
                <CreateRoomForm 
                createRoom={createRoom} 
                roomName={roomName} 
                setRoomName={setRoomName}/>
        </div>
        <div className='bg-success ' style={{height: "80%"}}>
            <Container className='p-4'>
                <RoomsList roomsList={roomsList}/>
            </Container>
        </div>
    </div>)
}

function CreateRoomForm({ createRoom, setRoomName, roomName }){
    return(<>
        <Form onSubmit={createRoom} >
            <Form.Group controlId="formRoom" className="d-flex align-items-center justify-content-between p-3">
                    <Form.Control 
                    type="text" 
                    name='room' 
                    placeholder="Room name" 
                    required 
                    onChange={(event)=>setRoomName(event.target.value)} 
                    value={roomName} 
                    style={{maxWidth: "50%"}}/>
                    <Button variant="secondary " type="submit">
                    Create a room
                    </Button>
            </Form.Group>
        </Form>
    </>)
}