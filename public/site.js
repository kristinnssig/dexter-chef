document.addEventListener('DOMContentLoaded', function () {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

function notify(title, link, body, img) {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.'); 
    return;
  }

  if(body == "undefined"){
      body = "You have notifications";
  }
  if(img == "undefined"){
      img = "DexteChefLogo4.png";
  }
  if(link == "undefined"){
      link = "http://dexterchef.com";
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var notification = new Notification(title, {
      icon: 'http://192.168.1.36:5000/images/null.png',
      body: body,
    });

    notification.onclick = function () {
      window.open(link);      
    };
    
  }

}

var socket = io.connect('http://192.168.1.36:3001');
    socket.on('notification', function (data) {
      notify(data.title, data.url, data.body);
      console.log(data.title);
});

$( document ).ready(function(){
    $("#fixedMenu").children().not("#logoFixedMenu").clone().appendTo("#splashMenu");
    $("#splashMenu .right.menu").children().removeClass("ui").appendTo("#splashMenu");
    $("#splashMenu .right.menu").remove();
});

function sendSearch(){
  var value = $("[name=searchBox]").val();
  location.href = "/search/"+value;
}