var server = require('ws').Server;
var s = new server({port: 5002});

var allMsg = [];
s.on('connection', function(ws){
  ws.send(JSON.stringify(allMsg));
  ws.on("message", function(message,online1){
    allMsg.push((JSON.parse(message)));
    s.clients.forEach(function e(client){
      client.send((JSON.stringify(allMsg,online1)));
    });
  });
});
