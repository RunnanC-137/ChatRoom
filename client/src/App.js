import { useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
} from "react-router-dom"
import RoomsLits from './pages/RoomsLits';
import Room from './pages/Room';
import { io } from 'socket.io-client';
import { Col, Row } from 'react-bootstrap';

const socket = io("http://192.168.100.21:3333");

function App() {
  //const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    /* socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    }); */

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return (<div>
    
    <Router>
      <Row  className="m-0">
        <Col sm={3} className="p-0">
          <RoomsLits socket={socket}/>
        </Col>
        <Col sm={9}  className="p-0">
          <Routes  >
            <Route path='/:name' element={<Room socket={socket}/>}/>
          </Routes>
        </Col>
        
      </Row>
      
    </Router>
  </div>)
}

export default App;