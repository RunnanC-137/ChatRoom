import { Container } from "react-bootstrap"
import RoomCard from "./RoomCard"

export default function RoomsList({roomsList}) {
    return (<Container className='p-3 bg-success float-start' style={{maxWidth:"320px"}}>
        {
            !roomsList.length <= 0
            ? roomsList.map((room, index) => <RoomCard 
            color="success" 
            title={room} 
            key={index} />)
            : <RoomCard color="secodary" title="sem salas" key={"null"} />
        }
    </Container>)
}