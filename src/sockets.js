module.exports = (io) =>{
    io.on('connection', socket => {
        console.log('new user connected');

        socket.on('send message',(data)=>{
            io.sockets.emit('new message', data);
        });
    });
};