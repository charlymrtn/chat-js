module.exports = (io) =>{

    let users = {};

    io.on('connection', socket => {
        console.log('new user connected');

        socket.on('new user', (data, cb) =>{
            if (data in users) {
                cb(false);
            }else{
                cb(true);
                socket.nickname = data;
                users[socket.nickname] = socket;
                updateNicks();
            }
        });

        socket.on('send message',(data, cb)=>{

            var msg = data.trim();
            if (msg.substr(0, 3) === '/w ') {
                msg = msg.substr(3);
                const index = msg.indexOf(' ');
                if (index != -1) {
                    var name = msg.substr(0, index);
                    var msg = msg.substr(index + 1);

                    if (name in users) {
                        users[name].emit('whisper', {
                            msg,
                            nick: socket.nickname
                        });
                    }else{
                        cb('Error! ingresa un usuario validado');
                    }
                } else {
                    cb('ERROR por favor ingresa tu mensaje');
                }
            }else{
                io.sockets.emit('new message', {
                    msg: data,
                    nick: socket.nickname
                });
            } 
        });

        socket.on('disconnect', data =>{
            if (socket.nickname) return;
            delete users[socket.nickname];
            updateNicks();
        });

        function updateNicks(){
            io.sockets.emit('usernames', Object.keys(users));
        }
    });
};