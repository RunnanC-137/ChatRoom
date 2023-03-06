import Room from "./Room"

export default function RoomsList({roomsList}) {
    return roomsList.length
        ? roomsList.map((room, index) => { 
            return <Room key={index} room={room} />
        })
        : null

}