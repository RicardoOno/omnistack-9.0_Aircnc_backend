const express = require('express');
const cors = require('cors');
const path = require('path');

//Construindo socket
const socketio = require('socket.io');
const http = require('http');

const mongoose = require('mongoose');
const routes = require('./routes');


const app = express();
const server = http.Server(app); //req https
const io = socketio(server); //req sockets


const connectedUsers = {};


mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-dckjy.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


io.on('connect', socket => { //anota todas os usuarios que conectarem
   
    console.log('[server] Usuario conectado | id socket: ', socket.id);  
    const { user_id } = socket.handshake.query;
    console.log(`[server] user id: ${user_id} | socker id: ${socket.id}`);
    connectedUsers[user_id] = socket.id; 

})

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
    return next();
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes);


server.listen(3334);
