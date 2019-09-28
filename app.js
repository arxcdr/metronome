var express = require("express");
var app = express();
const port = 3000

app.get("/", function(req, res){
	res.render("index.ejs");
});

app.use(express.static('css'));
app.use(express.static('scripts'));
app.use(express.static('art'));
app.use(express.static('sound'));

app.listen(port, function(){
	console.log("Server has started!");
});