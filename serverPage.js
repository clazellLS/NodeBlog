var http = require("http");
var fs = require("fs");
var path = require("path");
var mime = require("mime");
require('bootstrap');

http.createServer(function(request, response) {
  var filePath = false;
  console.log("request", request.url);
  if (request.url == '/') {
    filePath = "public/index.html";
  } else {
    filePath = "public" + request.url;
  }

  var absPath = "./" + filePath;
  serverWorking(response, absPath);
}).listen(process.env.PORT || 3000);


function send404(response) {
  response.writeHead(404, {"Content-type" : "text/plain"});
  response.write("Error 404: resource not found");
  response.end();
}

function sendPage(response, filePath, fileContents) {
  response.writeHead(200, {"Content-type" : mime.lookup(path.basename(filePath))});
  response.end(fileContents);
}

function serverWorking(response, absPath) {
  fs.exists(absPath, function(exists) {
  console.log("absPath", absPath);
    if (exists) {
	console.log("EXISTS");
      fs.readFile(absPath, function(err, data) {
        if (err) {
          send404(response)
        } else {
          sendPage(response, absPath, data);
        }
      });
    } else {
	console.log("ERROOR");
      send404(response);
    }
  });
}