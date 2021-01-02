import { Sidebar } from './Sidebar';
import socketIOClient from 'socket.io-client';
import { useEffect, useState } from 'react';
import { ENDPOINT } from '../lib/constants';

function App() {
  useEffect(() => {
    // const socket = socketIOClient(ENDPOINT);
  }, []);

  return (
    <div className="App">
      <canvas id="party-canvas"></canvas>
      <Sidebar />
    </div>
  );
}

export default App;
