var socket = io()

//connect is a builtin event
socket.on('connect', function () {
  console.log('Connected to server');

//emitting the created message to the server
socket.emit('createMessage', {
  from: 'aadljnd',
  text: 'How are yaa?'
});

//listening to server for any new mesaage
socket.on('newMessage', (message) => {
  console.log('newMessage', message);
});
  
//disconnnect is a builtin event
socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

//setting up a custom event listener
socket.on('newEmail', function (email) {
  console.log('New email', email);
}); 
});

