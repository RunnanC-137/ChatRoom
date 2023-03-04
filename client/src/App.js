import { useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
} from "react-router-dom"
import Rooms from './pages/Rooms';
import Room from './pages/Room';
import { io } from 'socket.io-client';

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

  return (<>
    <Router>
    <Rooms socket={socket}/>
      <Routes>
        <Route path='/:name' element={<Room socket={socket}/>}/>
      </Routes>
    </Router>
  </>);
}

export default App;