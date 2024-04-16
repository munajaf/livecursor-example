const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());  // Enable CORS for all routes

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",  // Allow all origins, or specify like "http://localhost:3000"
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('move cursor', (position) => {
        socket.broadcast.emit('move cursor', position);
        console.log(position);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3200, () => {
    console.log('Server is running on http://localhost:3200');
});
