var freq;
var currentLoop;
var currentTempo;
var currentSound; // The chosen sound for metronome ticks
var mIndex = 1; // The square(s) to paint first when the metronome starts
var sIndex = 1;
var subdivisions;

function Play(sound) {
	if(currentLoop != 0) {Stop();}
	GetSubdivisions();
    currentLoop = setInterval(Tick, GetFreq());
}

function PlaySound(){
	var snd = new Audio(GetSound());
	snd.play();	
}

function Stop(){
	clearInterval(currentLoop);
	ResetIndexes();
}

function Tick(){
	PlaySound();
	if(subdivisions == 0){
		if(mIndex > 4){
		ResetIndexes();
			}
		PaintIndex("m"+mIndex);
		IncreaseMIndex();
	}
	else{

	}
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
	currentSound = ("1b" + ".wav");
	return currentSound;
}

function GetSubdivisions(){
	subdivisions = document.getElementById("subdivisions").value;
	return subdivisions;
}

function IncreaseMIndex(){
	mIndex++;
}

// Set each index back to starting point and unpaint everything
function ResetIndexes(){
	mIndex = 1;
	sIndex = 1;
	var i;
	for(i = 1; i<5;i++){
		UnpaintIndex("m"+i);		
	}
}

function PaintIndex(index){
	document.getElementById(index).style.backgroundColor="lightblue";
}

function UnpaintIndex(index){
	document.getElementById(index).style.backgroundColor="white";
}