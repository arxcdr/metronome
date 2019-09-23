var freq;
var currentLoop;
var currentTempo;
var currentSound; // The chosen sound for metronome ticks
var eqIndex = [1,1]; // The square(s) to paint first when the metronome starts

function Play(sound) {
	if(currentLoop != 0) {Stop();}
    currentLoop = setInterval(PlaySound, GetFreq());
}

function PlaySound(){
	var snd = new Audio(GetSound());
	snd.play();
	PaintIndex();
}

function Stop(){
	clearInterval(currentLoop);
	ResetEQIndex();
}

function GetTempo(){
	 currentTempo = document.getElementById("tempoNum").value;
	 return currentTempo;
}

function GetFreq(){
	freq = (60000/GetTempo());
	return freq;
}

function GetSound(){
	currentSound = ("1a" + ".wav");
	return currentSound;
}

function GetEQIndex(){
	return eqIndex;
}

function ResetEQIndex(){
	eqIndex = [1,1];
}

function PaintIndex(){
	var bgColor = document.getElementById("m1");
	console.log(bgColor);
	//bgColor = #cc0000;
}