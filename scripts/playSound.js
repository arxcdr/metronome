var freq;
var currentLoop;
var currentTempo;
var currentSound; // The chosen sound for metronome ticks
var beatIndex = 1;
var aIndex = 1;
var mIndex = 1; // Position for the main beat
var sIndex = 1; // Position for the subdivisions
var subEnabled = false;
var subdivisions;
var resetFlag = false;

function Play() {
	if(currentLoop != 0) {Stop();}
	GetSubdivisions();
    currentLoop = setInterval(Tick, GetFreq());
}

function PlaySound(sound){
	var snd = new Audio(sound);
	snd.play();	
}

function Stop(){
	clearInterval(currentLoop);
	ResetIndexes();
}

function Tick(){
	if(resetFlag){ResetIndexes(); resetFlag = false;}
	console.log("Index: "+beatIndex);
	switch (subdivisions){
		case 1:
			PlaySound("1b.wav");
			if(mIndex > 4){	ResetIndexes();	}
			PaintIndex("m"+mIndex);
			PaintIndex("s"+sIndex);
			mIndex++;
			sIndex++;
			beatIndex++;
			break;
		case 2:
			if(beatIndex % 2 != 0){
				PlaySound("1b.wav");
				PaintIndex("m"+mIndex);
				PaintIndex("s"+sIndex);
				mIndex++;
				sIndex++;
				beatIndex++;
			}else{
				PlaySound("1a.wav");
				console.log("aIndex: "+aIndex);
				PaintIndex("a"+aIndex);
				aIndex++;
				beatIndex++;
				if(beatIndex > 8){resetFlag = true;}
			}
			break;
	}	
}

function GetTempo(){
	 currentTempo = document.getElementById("tempoNum").value;
	 return currentTempo;
}

function GetFreq(){
	if(subEnabled == false){
		freq = (60000/(GetTempo()));			
	}
	else{
		freq = ((60000/GetTempo())/subdivisions);
	}
	return freq;
}

function GetSound(){
	currentSound = ("1b" + ".wav");
	return currentSound;
}

function GetSubdivisions(){
	subdivisions = Number(document.getElementById("subdivisions").value);
	console.log("Subs: " + subdivisions);
	if(subdivisions > 1){subEnabled = true;}
	else{subEnabled = false;}
	return subdivisions;
}

// Set each index back to starting point and unpaint everything
function ResetIndexes(){
	beatIndex = 1;
	aIndex = 1;
	mIndex = 1;
	sIndex = 1;
	for(var i = 1; i<5;i++){
		UnpaintIndex("m"+i);
		UnpaintIndex("s"+i);		
	}
	if(subEnabled){
		for(var j = 0; j<(4*(subdivisions/2)); j++){
			UnpaintIndex("a"+(j+1));
		}
	}
}

function PaintIndex(index){
	document.getElementById(index).style.backgroundColor="lightblue";
}

function UnpaintIndex(index){
	document.getElementById(index).style.backgroundColor="white";
}