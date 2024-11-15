(function(){
    const chat = document.querySelector(".chat");
    const socket = io();

    let uname;

    chat.querySelector(".join-screen #join-user").addEventListener("click", function(){
        let username = app.querySelector(".join-screen #username").value;
        if(username.length == 0){
            return;
        }
        socket.emit("newuser", username);
        uname = username;
        chat.querySelector()
    })

})();