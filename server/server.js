const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  var id = socket.id; 
  console.log('New user connected :',id); 
  
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat room'
  });

  socket.broadcast.emit('newMessage',{
    from: 'Admin',
    text: id +' joined the chat',
    createdAt: new Date().getTime()
  });

  /*socket.emit('newEmail',{
    from: 'abcd@hotmail.com',
    message: 'Hey there, long time... huh?',
    createdAt: 1234
  });*/

  socket.on('createMessage', (message) => {
    console.log('createdmessage', message.from + ': ' + message.text);
    
    /* io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    }) */

    socket.broadcast.emit('newMessage', {
      from: message.from,  
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  /*socket.emit('newMessage', {
    from: 'some girl',
    message: 'I love you..babes'
  });*/

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
