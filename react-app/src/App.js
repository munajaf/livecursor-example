import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3200'); // Connect to the server

function App() {
  const [name, setName] = useState('');

  useEffect(() => {
    // Function to send cursor position to the server
    const handleMouseMove = (event) => {
      const position = { x: event.clientX, y: event.clientY, name: 'React' };
      socket.emit('move cursor', position);
    };

    // Add event listener for mouse movement
    document.addEventListener('mousemove', handleMouseMove);

    // Listen for cursor moves from other users
    socket.on('move cursor', (position) => {
      const cursor = document.getElementById('cursor');
      if (cursor) {
        cursor.style.left = `${position.x}px`;
        cursor.style.top = `${position.y}px`;
        setName(position.name);
      }
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      socket.off('move cursor');
    };
  }, []);

  return (
    <div>
      <h1>Cursor Tracker</h1>
      <div id="cursor" style={{ position: 'absolute', width: '10px', height: '10px', backgroundColor: 'red' }}>{name}</div>
    </div>
  );
}

export default App;
