import Message from "./Message"

export default function MessagesList({messageList}) {
    return messageList.length
        ? messageList.map((message, index) => <Message key={index} message={message}/>)
        : null
        
}