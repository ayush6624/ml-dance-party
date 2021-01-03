import { Sidebar } from './Sidebar';
import { useEffect, useState } from 'react';

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
