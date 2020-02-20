var express = require("express");
var app = express();

//live port
const port = process.env.PORT

//local port
//const port = 3000

// attempting to fix undected script
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.get("/", function(req, res){
	res.render("index.ejs");
});

app.use(express.static('css'));
app.use(express.static('scripts'));
app.use(express.static('art'));
app.use(express.static('fonts'));
app.use(express.static('sound'));

app.listen(port, function(){
	console.log("Server has started!");
});