//------ COCOSSD VARS ------
let video;
let detector;
let detections = [];
let temporaryLabels = [];
let finalLabels = [];
let button, greeting;


// ------- CHARRNN VARS --------
let charRNN;
let textInput;
let lengthSlider;
let tempSlider;
let runningInference = false;
let status;

let lengthText;
let temperatureText;

let resultText;

// ------- ATTNGAN VARS --------
//let raw = new Image();


//define variables
let input_text;
let post_image;
let send_btn;
let newimg;
let img;

var rightBuffer;




function setup() {
	// ------- COCOSSD SETUP --------
	createCanvas(1360, 544);
	background(250);
	video = createCapture(VIDEO);
	video.size(640, 480);
	video.hide();
	detector.detect(video, gotDetections);

	button = createButton("ART");
	button.mousePressed(generateArt);

	// ------- CHARRNN SETUP --------
	// Create the LSTM Generator passing it the model directory
	charRNN = ml5.charRNN('./models/hemingway/', modelReady);

	// Grab the DOM elements
	status = document.querySelector('#status')
	resultText = document.querySelector('#result')
	
	// ------- ATTNGAN SETUP --------
	rightBuffer = createGraphics(400, 400);
}

function draw() {
	// ------- COCOSSD DRAW --------
	image(video, 32, 32);
	fill(0);
	for (let i = 0; i < detections.length; i++) {
		let object = detections[i];
		stroke(0, 255, 0);
		strokeWeight(4);
		noFill();
		rect(object.x, object.y, object.width, object.height);
		noStroke();
		fill(255);
		textSize(16);
		text(object.label, object.x + 10, object.y + 24);
		//store labels dynamically with each detection
		temporaryLabels[i] = object.label;
	}
}

function generateArt() {
	// prevent starting inference if we've already started another instance
	if (!runningInference) {
	  runningInference = true;
  
	  // Update the status log
	  status.innerHTML = 'Generating...';
  
	  // Create a string with temporaryLabels
	  const txt = temporaryLabels[Math.floor(Math.random() * temporaryLabels.length)];
  
	  // This is what the LSTM generator needs
	  // Seed text, temperature, length to outputs
	  // TODO: What are the defaults?
	  const data = {
		seed: txt,
		temperature: 1,
		length: 20
	  };
  
	  // Generate text with the charRNN
	  charRNN.generate(data, gotData);
	  
	  image(video,video.width+48,32);
  
	  newFrame = createImage(230, 230);
	  image(newFrame,100,100);
    blend(image, 0, 0, 33, 100, 67, 0, 33, 100, DARKEST);
  
  
  
	  // When it's done
	  function gotData(err, result) {
		// Update the status log
		status.innerHTML = 'Ready!';
		//Place the resulting title in the HTML element, after removing all dots and placing a doy symbol in the end.
		resultText.innerHTML = result.sample.toLowerCase().split('.').join("").trim().replace(/^\w/, (c) => c.toUpperCase()) + ".";
		runningInference = false;

		// Generate attngan image
		sendText(txt);
	  }
  
  
  
	}
  }