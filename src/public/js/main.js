$(function (){

    const socket = io();

    //dom elements
    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat = $('#chat');

    const $nickForm = $('#nickForm');
    const $nickName = $('#nickname');
    const $nickError = $('#nickerror');

    const $usernames = $('#usernames');
    
    $nickForm.submit(e =>{
        e.preventDefault();
        socket.emit('new user', $nickName.val(), (data)=>{
            if (data) {
                $('#nickWrap').hide();
                $('#contentWrap').show();
            }else{
                $nickError.html(`
                <div class="alert alert-danger">
                    ese usuario ya existe.
                </div>`);
            }
            $nickName.val('');
        });
    });

    $messageForm.submit(e => {
        e.preventDefault();
        socket.emit('send message', $messageBox.val(), data =>{
            $chat.append(`<p class="error">${data}</p>`)
        });
        $messageBox.val('');
        
    });

    socket.on('new message', (data)=>{
        $chat.append('<b>'+data.nick + '</b>: '+ data.msg + '<br>');
    });

    socket.on('usernames', data =>{
        let html = '';
        for(let i = 0; i < data.length; i++){
            html += `<p><i class="fas fa-user"></i>${data[i]}</p>`;
        }
        $usernames.html(html);
    });

    socket.on('whisper', (data)=>{
        $chat.append(`<p class="whisper"><b>${data.nick}:</b> ${data.msg}</p>`);
    });

    socket.on('load messages', data=>{
        for(let i = 0; i < data.length; i++){
            displayMsg(data[i]);
        }
    });

    function displayMsg(data){
        $chat.append(`<p class="whisper"><b>${data.nick}:</b> ${data.msg}</p>`);
    }
});