import { Container } from "react-bootstrap"
import Message from "./Message"

export default function MessagesList({messageList}) {
    return (<Container className='p-3 bg-success float-end' style={{maxWidth:"70%"}}>
        {
            messageList.length
            ? messageList.map((message, index) => <Message variant={"dark"} key={index} message={message}/>)
            : <Message variant={"primary"} message={"sem messagem"} key={"index"}/>
        }
    </Container>)
}