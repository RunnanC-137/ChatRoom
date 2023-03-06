import Alert from 'react-bootstrap/Alert';

function Message({variant, message}) {
  return <Alert variant={"primary"} style={{maxWidth:"70%", minWidth:"72px", lineHeight:"100%"}} className="p-2 mt-1">
      <p className='m-0' style={{fontWeight:"600"}}>~user</p>
      <p className='m-0 pt-2'>
        {message}
      </p>
  </Alert>
  
}

export default Message;