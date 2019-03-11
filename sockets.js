$(document).ready(function(){

  var name = prompt("Enter you name");
  var colour1 = "black";
  var sock = new WebSocket("ws://localhost:5002");
  var online = [];
  sock.onopen = function(event){

  }

  var log = document.getElementById('messageLog');

   sock.onmessage = function(event){
     fullMsg = JSON.parse(event.data);
     showMsg = "";
     for (i = 0; i < fullMsg.length; i++){
       var cL = fullMsg[i].colour
       showMsg += "<h1 style= 'display: inline-block'>" +fullMsg[i].time+ "</h1>: <h1 style='color:" + cL+ "; display: inline-block'>" +fullMsg[i].name +": </h1 style= 'display: inline-block'>: <h1 style= 'display: inline-block'>"+fullMsg[i].message + "</h1><br>";
     }
     log.innerHTML = showMsg;
     log.scrollTop = log.scrollHeight;
    }

   document.querySelector('button').onclick = function(){
     var text = document.getElementById('writeMessage').value;
     var checkStringName = text.substring(0, 7);
     var checkStringColor = text.substring(0, 11);
     if (checkStringName === '/nick <'){
       name = text.substring(7, text.length-1);
     }
     else if( checkStringColor === '/nickcolor '){
       colour1 = "#"+text.substring(11, text.length);
       console.log(colour1);
     }
     else{
       var timeHours = new Date().getHours();
       var timeMins = new Date().getMinutes();
       var timeSec = new Date().getSeconds();
       var currentTime = timeHours + ":" + timeMins + ":" + timeSec
       var nameFile = JSON.stringify({
         name: name,
         message: text,
         time: currentTime,
         colour: colour1,
       });
       sock.send(nameFile);
     }
   }
});
