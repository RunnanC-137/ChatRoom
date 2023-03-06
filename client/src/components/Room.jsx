import Alert from 'react-bootstrap/Alert';

import { useNavigate } from 'react-router-dom';

export default function Room({room}){
  const navigate = useNavigate()
  return (
    <Alert variant="success" style={{ cursor:"pointer" }} className='m-0 p-1 ps-3 mb-3' onClick={()=>navigate(`/${room.name}`)}>
      <Alert.Heading className='m-0'>{room.name}</Alert.Heading>
      <p className='ps-2 m-0'>
        {
        !room.messages.length 
        ? `new room "${room.name}"` 
        : `user: ${lastMessage(room.messages[room.messages.length-1])}`}
      </p>
    </Alert>
  );
}
function lastMessage(message) {
  if(message.length > 17)
    return message.slice(0, 15)+"..."
  else return message
}