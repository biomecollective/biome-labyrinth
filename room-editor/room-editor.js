var roomId = "";
var buttonId = 0;
var roomWidth = 0;
var roomHeight = 0;

//Simplifies some of the room.json loading code.
function runIfPresent(object, key, code) {
	if(Object.hasOwn(object, key)) {
		if(object.key != "") {
			code();
		}
	}
}

//Simplifies adding button controls.
function addInspectorParam(parent, code) {
	let paramDiv = document.createElement("div");

	paramDiv.className = "inspectorParam";

	paramDiv.innerHTML = code();

	parent.appendChild(paramDiv);
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

		if(Object.hasOwn(roomObj, "buttons")) {
			for(const button of roomObj.buttons) {
				addButton(button);
				addButtonControls(button);
			}
		}
	}
	catch(error) {
		console.log(`populateInspector Error: ${error}`);
	}
}

function addButtonControls(data) {
	let container = document.createElement("details");
	let summary = document.createElement("summary");
	let inspectorButtons = document.getElementById("inspectorButtons");

	container.id = `button${buttonId}`;

	if(data == null)
		container.open = true;

	summary.id = `{button${buttonId}-summary}`;
	summary.innerHTML = `${buttonId}`;

	container.appendChild(summary);

	//Add controls.
	//Button ID
	addInspectorParam(container, () => {
		return `<label for="button${buttonId}-buttonId">ID</label>
				<input type="text" name="button${buttonId}-buttonId" id="button${buttonId}-buttonId"></input>`;
	});

	//Image
	addInspectorParam(container, () => {
		return `<span>Image</span>
				<label class="fileSelect" for="button${buttonId}-image" id="button${buttonId}-imageLabel">Select Image</label>
				<input type="file" name="button${buttonId}-image" id="button${buttonId}-image" accept="image/*"></input>`;
	});

	//Image Hover
	addInspectorParam(container, () => {
		return `<span>Image Hover</span>
				<label class="fileSelect" for="button${buttonId}-imageHover" id="button${buttonId}-imageHoverLabel">Select Image</label>
				<input type="file" name="button${buttonId}-imageHover" id="button${buttonId}-imageHover" accept="image/*"></input>`;
	});

	//Image Down
	addInspectorParam(container, () => {
		return `<span>Image Down</span>
				<label class="fileSelect" for="button${buttonId}-imageDown" id="button${buttonId}-imageDownLabel">Select Image</label>
				<input type="file" name="button${buttonId}-imageDown" id="button${buttonId}-imageDown" accept="image/*"></input>`;
	});

	//Alt Text
	addInspectorParam(container, () => {
		return `<label for="button${buttonId}-imageAltText">Alt Text</label>
				<input type="text" name="button${buttonId}-imageAltText" id="button${buttonId}-imageAltText"></input>`;
	});

	//Pixel Art
	addInspectorParam(container, () => {
		return `<label for="button${buttonId}-pixelArt">Pixel Art</label>
				<input type="checkbox" name="button${buttonId}-pixelArt" id="button${buttonId}-pixelArt"></input>`;
	});

	//Destination
	addInspectorParam(container, () => {
		return `<label for="button${buttonId}-destination">Destination</label>
				<input type="text" name="button${buttonId}-destination" id="button${buttonId}-destination"></input>`;
	});

	//Tooltip
	addInspectorParam(container, () => {
		return `<label for="button${buttonId}-tooltip">Tooltip</label>
				<input type="text" name="button${buttonId}-tooltip" id="button${buttonId}-tooltip"></input>`;
	});

	//Left
	addInspectorParam(container, () => {
		return `<label for="button${buttonId}-left">Left</label>
				<input type="text" name="button${buttonId}-left" id="button${buttonId}-left"></input>`;
	});

	//Top
	addInspectorParam(container, () => {
		return `<label for="button${buttonId}-top">Top</label>
				<input type="text" name="button${buttonId}-top" id="button${buttonId}-top"></input>`;
	});

	//Width
	addInspectorParam(container, () => {
		return `<label for="button${buttonId}-width">Width</label>
				<input type="text" name="button${buttonId}-width" id="button${buttonId}-width"></input>`;
	});

	//Height
	addInspectorParam(container, () => {
		return `<label for="button${buttonId}-height">Height</label>
				<input type="text" name="button${buttonId}-height" id="button${buttonId}-height"></input>`;
	});

	//Delete button.
	addInspectorParam(container, () => {
		return `<label for="button${buttonId}-delete">&nbsp;</label>
				<button class="fileSelect" type="button" id="button${buttonId}-delete">Delete</button>`;
	});

	//If data is not empty, fill out the various parameters.
	if(data != null) {
		runIfPresent(data, "id", () => {
			summary.innerHTML = data.id;
			container.querySelector(`#button${buttonId}-buttonId`).value = data.id;
		});

		runIfPresent(data, "image", () => {
			container.querySelector(`#button${buttonId}-imageLabel`).innerHTML = data.image;
		});
		runIfPresent(data, "imageHover", () => {
			container.querySelector(`#button${buttonId}-imageHoverLabel`).innerHTML = data.imageHover;
		});
		runIfPresent(data, "imageDown", () => {
			container.querySelector(`#button${buttonId}-imageDownLabel`).innerHTML = data.imageDown;
		});
		runIfPresent(data, "imageAltText", () => {
			container.querySelector(`#button${buttonId}-imageAltText`).value = data.imageAltText;
		});
		runIfPresent(data, "pixelArt", () => {
			container.querySelector(`#button${buttonId}-pixelArt`).checked = data.pixelArt;
		});

		runIfPresent(data, "destination", () => {
			container.querySelector(`#button${buttonId}-destination`).value = data.destination;
		});
		runIfPresent(data, "tooltip", () => {
			container.querySelector(`#button${buttonId}-tooltip`).value = data.tooltip;
		});

		runIfPresent(data, "left", () => {
			container.querySelector(`#button${buttonId}-left`).value = data.left;
		});
		runIfPresent(data, "top", () => {
			container.querySelector(`#button${buttonId}-top`).value = data.top;
		});
		runIfPresent(data, "width", () => {
			container.querySelector(`#button${buttonId}-width`).value = data.width;
		});
		runIfPresent(data, "height", () => {
			container.querySelector(`#button${buttonId}-height`).value = data.height;
		});
	}

	inspectorButtons.appendChild(container);

	//Add event listeners.
	{
		container.querySelector(`#button${buttonId}-delete`).addEventListener("click", () => {
			//TODO: remove button from room.

			container.remove();
		});
	}

	++buttonId;
}

function setBackground(fileName) {
	let backgroundImage = document.getElementById("backgroundImage");
	let backgroundLabel = document.getElementById("backgroundLabel");
	
	//We use this to store the size of the room image.
	backgroundImage.addEventListener("load", function() {
		roomWidth = this.naturalWidth;
		roomHeight = this.naturalHeight;
	});

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

function addButton(data) {
	let room = document.getElementById("room");
	let button = document.createElement("img");

	button.id = `button${buttonId}`;
	button.className = "roomButton";
	button.draggable = true;
	button.style.left = "0%";
	button.style.top = "0%";

	runIfPresent(data, "image", () => {
		button.src = "../rooms/" + roomId + "/" + data.image;
	});
	runIfPresent(data, "pixelArt", () => {
		if(data.pixelArt)
			button.style.imageRendering = "crisp-edges";
		else
			button.style.imageRendering = "smooth";
	});

	runIfPresent(data, "left", () => {
		button.style.left = `${data.left}%`;
	});
	runIfPresent(data, "top", () => {
		button.style.top = `${data.top}%`;
	});
	runIfPresent(data, "width", () => {
		button.style.width = `${data.width}%`;
	});
	runIfPresent(data, "height", () => {
		button.style.width = `${data.height}%`;
	});

	let dragOffsetX = 0;
	let dragOffsetY = 0;
	button.addEventListener("dragstart", (event) => {
		dragOffsetX = button.offsetLeft - event.clientX;
		dragOffsetY = button.offsetTop - event.clientY;
	});
	button.addEventListener("dragover", (event) => {
		let newPosX = ((event.clientX + dragOffsetX)/roomWidth) * 100;
		let newPosY = ((event.clientY + dragOffsetY)/roomHeight) * 100;

		button.style.left = `${newPosX}%`;
		button.style.top = `${newPosY}%`;

		document.getElementById(`${button.id}-left`).value = `${newPosX}%`;
		document.getElementById(`${button.id}-top`).value = `${newPosY}%`;

		event.preventDefault();
	});
	button.addEventListener("dragend", (event) => {
		console.log(`Drag end`);
	});

	room.appendChild(button);
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

	const buttonContainer = document.getElementById("inspectorButtons");
	const buttons = buttonContainer.querySelectorAll("details");

	roomObj.buttons = new Array();

	buttons.forEach((button) => {
		const currentId = button.id;
		let buttonObj = new Object();

		buttonObj.id = document.getElementById(`${currentId}-buttonId`).value;

		buttonObj.image = document.getElementById(`${currentId}-imageLabel`).innerHTML;
		buttonObj.imageHover = document.getElementById(`${currentId}-imageHoverLabel`).innerHTML;
		buttonObj.imageDown = document.getElementById(`${currentId}-imageDownLabel`).innerHTML;
		buttonObj.imageAltText = document.getElementById(`${currentId}-imageAltText`).value;
		buttonObj.pixelArt = document.getElementById(`${currentId}-pixelArt`).checked;

		buttonObj.destination = document.getElementById(`${currentId}-destination`).value;
		buttonObj.tooltip = document.getElementById(`${currentId}-tooltip`).value;

		buttonObj.left = document.getElementById(`${currentId}-left`).value;
		buttonObj.top = document.getElementById(`${currentId}-top`).value;
		buttonObj.width = document.getElementById(`${currentId}-width`).value;
		buttonObj.height = document.getElementById(`${currentId}-height`).value;

		roomObj.buttons.push(buttonObj);
	});

	console.log(roomObj);

	let roomJson = JSON.stringify(roomObj, null, "\t");
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
	let addButtonButton = document.getElementById("addButton");
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
		console.log(backgroundColour.value);
	});

	script.addEventListener("change", (event) => {
		document.getElementById("scriptLabel").innerHTML = event.target.files[0].name;
	});

	addButtonButton.addEventListener("click", (event) => {
		addButton(null);
		addButtonControls(null);
	});

	saveRoomButton.addEventListener("click", (event) => {
		saveRoom();
	});
	viewRoomButton.addEventListener("click", (event) => {
		window.open(`../?room=${roomId}`);
	});
});
