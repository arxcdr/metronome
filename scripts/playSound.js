var freq;
var currentLoop;
var currentTempo; // Tempo entered by user
var currentSound; // The chosen sound for metronome ticks
var beatIndex = 1; // Keeps track of beats played
var aIndex = 1; // Position for creating subdivisions
var mIndex = 1; // Position for the main beat
var sIndex = 1; // Position for main beat in the subdivision row
var mainBeats; // Beats per measure (4 by default)
var sdiv; // Number of div elements created for subdivisions in the UI
var subEnabled = false;
var subdivisions; // Number of subdivisions requested by user: 1 for none,2 for half notes, 3 for triplets, 4 for quarter notes
var resetFlag = false; // bool to flag the end of the measure has been reached

function Play() {
	if(currentLoop != 0) {Stop();}
	GetSubdivisions();
	RemoveDivs();
	CreateDivs();
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
			PaintIndex("m"+mIndex);
			PaintIndex("s"+sIndex);
			mIndex++;
			sIndex++;
			beatIndex++;
			if(mIndex > (4*subdivisions)){resetFlag = true;}
			break;
		default:
			mainBeats = GetMainBeats();
			if(mainBeats.includes(beatIndex)){
				PlaySound("1b.wav");
				PaintIndex("m"+mIndex);
				PaintIndex("s"+sIndex);
				mIndex++;
				sIndex++;
				beatIndex++;
			}else{
				PlaySound("1a.wav");
				console.log("sdIndex: "+aIndex);
				PaintIndex("sdiv"+aIndex);
				aIndex++;
				beatIndex++;
				if(beatIndex > (4*subdivisions)){resetFlag = true;}
			}
			break;
	}	
}

function GetMainBeats(){
	var beats = [1];
	var nextVal = 1;
	for(var i = 0; i<3; i++){
		nextVal += subdivisions;
		beats.push(nextVal);
	}
	return beats;
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
		for(var h = 1; h<5; h++){
			UnpaintIndex("a"+h);
		}
		switch(subdivisions){
			case 1:
				break;

			default:
				for(var j = 0; j<(4*(subdivisions-1)); j++){
					console.log("sdiv"+(j+1));
					UnpaintIndex("sdiv"+(j+1));
				}
				break;
		}
	}
}

function PaintIndex(index){
	document.getElementById(index).style.backgroundColor="lightblue";
}

function UnpaintIndex(index){
	document.getElementById(index).style.backgroundColor="white";
}

// Add/Remove desired number of div elements to the UI for subdivisions
function CreateDivs(){
	sdiv = 0;
	for(var i = 1; i<5;i++){
		document.getElementById("a"+i).style.columnCount=(subdivisions-1);
		for(var j = 1; j<subdivisions;j++){
			sdiv++;
			const div = document.createElement('div');
			div.className = "col sub";
			div.style="background-color:white";
			div.id = "sdiv"+sdiv;
			div.innerHTML=div.id;
			document.getElementById("a"+i).appendChild(div);
		}
	}
}

function RemoveDivs(){
	for(var i = 1; i<5;i++){
		document.getElementById("a"+i).innerHTML="";
	}
}