var express = require("express");
var app = express();
const port = 3000

app.get("/", function(req, res){
	res.render("index.ejs");
});

app.listen(port, function(){
	console.log("Server has started!");
});