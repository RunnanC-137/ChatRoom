import { useEffect, useState } from 'react';

import Rooms from './pages/Rooms';

import { io } from 'socket.io-client';
const socket = io("http://192.168.100.21:3333");

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return (
    <div>
      <Rooms socket={socket}/>
    </div>
  );
}

export default App;