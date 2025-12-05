var roomId = "";
var buttonId = 0;

//Simplifies some of the room.json loading code.
function runIfPresent(object, key, code) {
	if(Object.hasOwn(object, key)) {
		if(object.key != "") {
			code();
		}
	}
}

//Adds the directory request dialog on page load if we need it.
function createDirectoryRequester() {
	let dirRequesterOuter = document.createElement("div");
	
	dirRequesterOuter.id = "dirRequesterOuter";

	dirRequesterOuter.innerHTML = `
<div id="dirRequesterInner">
	<p>
		Rooms are made up of a directory with one or more images inside.
	</p>
	<p>
		To add a new room, first create a new directory within the
		<strong>rooms</strong> directory and add an image to it, then
		select a directory using the button below to start editing the room.
	</p>
	<p>
		(if a dialog appears asking you if you want to upload all the files in
		the directory, say yes)
	</p>
	<label class="fileSelect" for="dirButton">Select Directory</label>
	<input type="file" name="dirButton" id="dirButton" webkitdirectory></input>
</div>`;

	document.body.appendChild(dirRequesterOuter);

	let dirButton = document.getElementById("dirButton");

	dirButton.addEventListener("change", (event) => {
		if(event.target.files.length > 0) {
			let path = event.target.files[0].webkitRelativePath;

			roomId = path.substring(0, path.indexOf("/"));

			//Check if there's a room.json in this path.
			for(const file of event.target.files) {
				if(file.name == "room.json") {
					populateInspector();
					break;
				}
			}

			document.getElementById("roomName").value = roomId;

			dirRequesterOuter.remove();
		}
	});
}

//Populates the inspector if we load a room that already has a room.json.
async function populateInspector() {
	try {
		console.log(`Fetching ../rooms/${roomId}/room.json`);
		const response = await fetch(`../rooms/${roomId}/room.json`);

		if(!response.ok)
			throw new Error(`Could not fetch room data. Response: ${response.status}`);

		const roomObj = await response.json();

		runIfPresent(roomObj, "name", () => {
			document.getElementById("roomName").value = roomObj.name;
		});
		runIfPresent(roomObj, "image", () => {
			setBackground(roomObj.image);
		});
		runIfPresent(roomObj, "imageAltText", () => {
			document.getElementById("altText").value = roomObj.imageAltText;
		});
		runIfPresent(roomObj, "pixelArt", () => {
			setPixelArt(roomObj.pixelArt);
		});
		runIfPresent(roomObj, "backgroundColour", () => {
			document.getElementById("pageColour").value = roomObj.backgroundColour;

			document.body.style.backgroundColor = roomObj.backgroundColour;
		});
		runIfPresent(roomObj, "script", () => {
			document.getElementById("scriptLabel").innerHTML = roomObj.script;
		});
		runIfPresent(roomObj, "author", () => {
			document.getElementById("author").value = roomObj.author;
		});
		runIfPresent(roomObj, "authorLink", () => {
			document.getElementById("authorLink").value = roomObj.authorLink;
		});
	}
	catch(error) {
		console.log(`populateInspector Error: ${error}`);
	}
}

function setBackground(fileName) {
	let backgroundImage = document.getElementById("backgroundImage");
	let backgroundLabel = document.getElementById("backgroundLabel");

	backgroundImage.src = "../rooms/" + roomId + "/" + fileName;
	backgroundLabel.innerHTML = fileName;
}

function setPixelArt(val) {
	document.getElementById("pixelArt").checked = val;

	if(val)
		document.getElementById("backgroundImage").style.imageRendering = "crisp-edges";
	else
		document.getElementById("backgroundImage").style.imageRendering = "auto";
}

//Saves the room data to rooms/<roomId>/room.json
function saveRoom() {
	let roomObj = new Object();

	roomObj.name = document.getElementById("roomName").value;

	let imageText = document.getElementById("backgroundLabel").innerHTML;
	if(imageText != "Select Image") {
		roomObj.image = imageText;
	}
	roomObj.imageAltText = document.getElementById("altText").value;
	roomObj.pixelArt = document.getElementById("pixelArt").checked;

	roomObj.backgroundColour = document.getElementById("pageColour").value;

	let scriptText = document.getElementById("scriptLabel").innerHTML;
	if(scriptText != "Select Script")
		roomObj.script = scriptText;

	roomObj.author = document.getElementById("author").value;
	roomObj.authorLink = document.getElementById("authorLink").value;

	console.log(roomObj);

	let roomJson = JSON.stringify(roomObj);
	let blob = new Blob([roomJson], {type: "text/plain;charset=utf-8"});
	saveAs(blob, `room.json`);
}

window.addEventListener("load", () => {
	const urlParams = new URLSearchParams(document.location.search);
	let urlRoom = urlParams.get("room");

	if(urlRoom == null) {
		createDirectoryRequester();
	}
	else {
		roomId = urlRoom;

		populateInspector();
	}

	//Set up inspector event listeners.
	let background = document.getElementById("background");
	let pixelArt = document.getElementById("pixelArt");
	let backgroundColour = document.getElementById("pageColour");
	let script = document.getElementById("script");
	let saveRoomButton = document.getElementById("saveRoom");
	let viewRoomButton = document.getElementById("viewRoom");

	background.addEventListener("change", (event) => {
		setBackground(event.target.files[0].name);
	});

	pixelArt.addEventListener("change", (event) => {
		setPixelArt(pixelArt.checked);
	});

	backgroundColour.addEventListener("change", (event) => {
		document.body.style.backgroundColor = backgroundColour.value;
	});

	script.addEventListener("change", (event) => {
		document.getElementById("scriptLabel").innerHTML = event.target.files[0].name;
	});

	saveRoomButton.addEventListener("click", (event) => {
		saveRoom();
	});
	viewRoomButton.addEventListener("click", (event) => {
		window.open(`../?room=${roomId}`);
	});
});
