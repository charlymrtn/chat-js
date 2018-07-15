$(function (){

    const socket = io();

    //dom elements
    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat = $('#chat');

    $messageForm.submit(e => {
        e.preventDefault();
        socket.emit('send message', $messageBox.val());
        $messageBox.val('');
        
    });

    socket.on('new message', (data)=>{
        $chat.append(data + '<br>');
    });
});