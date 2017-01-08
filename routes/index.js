var express = require('express'),
    router  = express.Router();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
    var server = require('http').Server(express);
    var io = require('socket.io')(server);
    server.listen(3001);

router.get('/', function(req, res){
	res.render('index', {
	  recipe: "recipes",
	   title: "Home",
	  splash: "true"
	});
	});

	//connection.end();

router.get('/test', function(req, res){
	res.render('test');
	if(req.query.title != "undefined"){
        console.log(req.query.title);
		io.on('connection', function (socket) {
          if (!socket.sentMydata) {
			socket.emit('notification', { title: req.query.title, url: req.query.url, body: req.query.body });
			console.log("connected with title: "+req.query.title);
            socket.sentMydata = true;
         }
		});
	}
});

router.get('/css', function(req, res){
    res.render('css', {layout: false});
});

router.post('/upload', function(req, res){

  var form = new formidable.IncomingForm();

  form.multiples = true;

  form.uploadDir = 'public/images/recipes';

  form.on('file', function(field, file) {
	var ext = file.name.substr(file.name.lastIndexOf('.')+1);
	var exti = ext.toUpperCase();
	if(exti == "PNG" || exti == "JPG" || exti == "JPEG" || exti == "BMP" || exti=="GIF" || exti=="TIFF"){
		var fn = file.path.substr(file.path.lastIndexOf('\\')+1) + "." + ext;
		fs.rename(file.path, path.join(form.uploadDir, fn));
		console.log(file.name);
		console.log(file.path);
		console.log(fn);
		res.send(fn);
	} else {
		res.send("Error: ."+ext+" is not allowed...");
	}
  });

  // log any errors that occur
  form.on('error', function(err) {
	  if(err) throw err;
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end("");
  });

  // parse the incoming request containing the form data
  form.parse(req);

});

module.exports = router;