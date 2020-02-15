var b = 4; // Number of dividers (4 by default)
var freq;
var currentLoop;
var currentTempo; // Tempo entered by user
var currentSound; // The chosen sound for metronome ticks
var beatIndex = 1; // Keeps track of beats played
var mIndex = 1; // Position for the main beat
var sIndex = 1; // Position for subdivisions
var mainBeats; // Beats per measure
var sdiv; // Number of div elements to create in the UI
var subEnabled = false;
var subdivisions; // Number of subdivisions requested by user
var resetFlag = false; // bool to flag the end of the measure has been reached
var running = false; // Keep track of metronome state

// Start the metronome
function Play() {
	if(running) { Stop(); }
	GetSubdivisions();
	DrawTable();
    currentLoop = setInterval(Tick, GetFreq());
    running = true;
}

// Play metronome sound (TODO: based on user preference)
function PlaySound(sound){
	var snd = new Audio(sound);
	snd.play();	
}

// Turn off the metronome
function Stop(){
	clearInterval(currentLoop);
	ResetIndexes();
	running = false;
}

function Tick(){
	if(resetFlag){ResetIndexes(); resetFlag = false;}
	if(subEnabled){
		mainBeats = GetMainBeats();
			if(mainBeats.includes(beatIndex)){
				PlaySound("1b.wav");
				BlinkAtIndex("m"+mIndex, "red");
				sIndex = 1;
				beatIndex++;
			}else{
				PlaySound("1a.wav");
				BlinkAtIndex("m"+(mIndex+1), "red");
				beatIndex++;
				sIndex++;
				if(sIndex > subdivisions){
					mIndex+=2;
				}
				if(beatIndex > (mainBeats.length+(mainBeats.length*subdivisions))){resetFlag = true;}
			}
	}	
	else{
		PlaySound("1b.wav");
		BlinkAtIndex("m"+beatIndex, "red");
		beatIndex++;
		if(beatIndex > b){resetFlag = true;}
	}
}

function GetMainBeats(){
	var beats = [1];
	var nextVal = 1;
	for(var i = 0; i<(b-1); i++){
		nextVal += (1+subdivisions);
		beats.push(nextVal);
	}
	return beats;
}

// Get the tempo entered by user
function GetTempo(){
	 currentTempo = document.getElementById("tempoNum").value;
	 return currentTempo;
}

function GetFreq(){
	console.log("subdivisions enabled: "+subEnabled);
	if(subEnabled == false){
		freq = (60000/(GetTempo()));
	}
	else{
		freq = ((60000/GetTempo())/(subdivisions+1));
	}
	return freq;
}

// Will allow user to select metronome sounds in a list
function GetSound(){
	currentSound = ("1b" + ".wav");
	return currentSound;
}

// Get number of subdivisions chosen by user
function GetSubdivisions(){
	subdivisions = Number(document.getElementById("subdivisions").value);
	if(subdivisions > 0){
		subEnabled = true;
	}
	else{
		subEnabled = false;
	}
	return subdivisions;
}

// Set each index back to starting position
function ResetIndexes(){
	beatIndex = 1;
	mIndex = 1;
}

// Blink at current index to show position
function BlinkAtIndex(index, color){
	document.getElementById(index).style.backgroundColor="red";
	setTimeout(function(){document.getElementById(index).style.backgroundColor="#FFD700";}, 150);
}

// Draw desired number of div elements
function DrawTable(){
	var wasRunning = running;
	Stop();
	document.getElementById("mdiv").innerHTML="";
	if(GetSubdivisions() == 0){
		sdiv = b;
		for(var i = 1; i<(sdiv+1);i++){
			const div = document.createElement('div');
			div.className = "recbar mx-auto my-2";
			div.id = "m"+i;
			document.getElementById("mdiv").appendChild(div);
		}
	}
	else{
		sdiv = (b*2);
		for(var i = 1; i<(sdiv+1);i++){
			const div = document.createElement('div');
			if(i%2 != 0){
				div.className = "recbar mx-auto my-2";
			}
			else{
				div.className = "circle";
			}
			div.id = "m"+i;
			document.getElementById("mdiv").appendChild(div);
		}
	}
	if(wasRunning){Play();}
}

// Add beat
function AddBeat(){
	if(running) { Stop(); }
	if(b<10){
		b++;
	}
	DrawTable();
}

// Remove beat
function RemoveBeat(){
	if(running) { Stop(); }
	if(b>1){
		b--;
	}
	DrawTable();
}
