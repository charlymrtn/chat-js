const http = require('http');
const path = require('path');

const express = require('express');
const socketio = require('socket.io');

const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

const URI = 'mongodb://charly_mrtn:9torres9@cluster1-shard-00-00-gluuy.mongodb.net:27017,cluster1-shard-00-01-gluuy.mongodb.net:27017,cluster1-shard-00-02-gluuy.mongodb.net:27017/chat-js?ssl=true&replicaSet=Cluster1-shard-0&authSource=admin';

mongoose.connect(URI)
    .then(db => console.log('db is connected'))
    .catch(err => console.error(err));

app.set('port', process.env.PORT || 3000);

require('./sockets')(io);

app.use(express.static(path.join(__dirname,'public')));

server.listen(app.get('port'), () => {
    console.log('server listening on port',app.get('port'));
});