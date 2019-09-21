var freq;
var currentLoop;
var currentTempo;
var currentSound;

function Play(sound) {
	if(currentLoop != 0) {Stop();}
    currentLoop = setInterval(PlaySound, GetFreq());
}

function PlaySound(){
	var snd = new Audio(GetSound());
	snd.play();
}

function Stop(){
	clearInterval(currentLoop);
}

function GetTempo(){
	 currentTempo = document.getElementById("tempoNum").value;
	 return currentTempo;
}

function GetFreq(){
	freq = (60000/GetTempo());
	console.log(currentTempo);
	console.log(freq);
	return freq;
}

function GetSound(){
	currentSound = ("1a" + ".wav");
	return currentSound;
}