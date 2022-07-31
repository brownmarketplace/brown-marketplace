var WebSocket = require('ws');
var server = new WebSocket.Server({
    port: 8080
}, function () {
    console.log('Server started on port 8080');
});
var users = new Set();
server.on('connection', function (ws) {
    var userRef = {
        ws: ws,
    };
    users.add(userRef);
    ws.on('message', function (message) {
        console.log(message);
        try {
            // Parsing the message
            var data = JSON.parse(message);
            // Checking if the message is a valid one
            if (typeof data.sender !== 'string' ||
                typeof data.body !== 'string') {
                console.error('Invalid message');
                return;
            }
            // Sending the message
            var messageToSend = {
                sender: data.sender,
                body: data.body,
                sentAt: Date.now()
            };
            console.log(messageToSend.body);
            sendMessage(messageToSend);
        }
        catch (e) {
            console.error('Error passing message!', e);
        }
    });
    ws.on('close', function (code, reason) {
        users.delete(userRef);
        console.log("Connection closed: ".concat(code, " ").concat(reason, "!"));
    });
});
var sendMessage = function (message) {
    users.forEach(function (user) {
        user.ws.send(JSON.stringify(message));
    });
};
//# sourceMappingURL=Server.js.map