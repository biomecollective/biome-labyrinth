var roomId = "";
var buttonId = 0;
var roomWidth = 0;
var roomHeight = 0;
var zoomLevel = 1.0;

//-- Helper functions ----------------------------------------------------------
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

//Adds a 'beforeinput' event listener to limit characters allowed in text input
//boxes (passed-in regexp defines which characters are allowed).
function limitInput(inputElement, regexp) {
	inputElement.addEventListener("beforeinput", (event) => {
		if(event.data != null) {
			let rx = new RegExp(regexp);

			if(!rx.test(event.data)) {
				event.preventDefault();
			}
		}
	});
}

//-- Directory requester -------------------------------------------------------
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
		else {
			alert("Room directory is empty. Please add one or more image files to directory to use the room editor.");
		}
	});
}

//-- Inspector functions -------------------------------------------------------
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
			}
		}
	}
	catch(error) {
		console.log(`populateInspector Error: ${error}`);
	}
}

//Only ever called from addButton function.
function addButtonControls(data) {
	let container = document.createElement("details");
	let summary = document.createElement("summary");
	let inspectorButtons = document.getElementById("inspectorButtons");
	let idBase = `button${buttonId}`;

	container.id = `${idBase}-inspector`;

	if(data == null)
		container.open = true;

	summary.id = `${idBase}-summary`;
	summary.innerHTML = `${buttonId}`;

	container.appendChild(summary);

	//Add controls.
	//Button ID
	addInspectorParam(container, () => {
		return `<label for="${idBase}-buttonId">ID</label>
				<input type="text" name="${idBase}-buttonId" id="${idBase}-buttonId"></input>`;
	});

	//Image
	addInspectorParam(container, () => {
		return `<span>Image</span>
				<label class="fileSelect" for="${idBase}-image" id="${idBase}-imageLabel">Select Image</label>
				<input type="file" name="${idBase}-image" id="${idBase}-image" accept="image/*"></input>`;
	});

	//Image Hover
	addInspectorParam(container, () => {
		return `<span>Image Hover</span>
				<label class="fileSelect" for="${idBase}-imageHover" id="${idBase}-imageHoverLabel">Select Image</label>
				<input type="file" name="${idBase}-imageHover" id="${idBase}-imageHover" accept="image/*"></input>`;
	});

	//Image Down
	addInspectorParam(container, () => {
		return `<span>Image Down</span>
				<label class="fileSelect" for="${idBase}-imageDown" id="${idBase}-imageDownLabel">Select Image</label>
				<input type="file" name="${idBase}-imageDown" id="${idBase}-imageDown" accept="image/*"></input>`;
	});

	//Alt Text
	addInspectorParam(container, () => {
		return `<label for="${idBase}-imageAltText">Alt Text</label>
				<input type="text" name="${idBase}-imageAltText" id="${idBase}-imageAltText"></input>`;
	});

	//Pixel Art
	addInspectorParam(container, () => {
		return `<label for="${idBase}-pixelArt">Pixel Art</label>
				<input type="checkbox" name="${idBase}-pixelArt" id="${idBase}-pixelArt"></input>`;
	});

	//Destination
	addInspectorParam(container, () => {
		return `<label for="${idBase}-destination">Destination</label>
				<input type="text" name="${idBase}-destination" id="${idBase}-destination"></input>`;
	});

	//Tooltip
	addInspectorParam(container, () => {
		return `<label for="${idBase}-tooltip">Tooltip</label>
				<input type="text" name="${idBase}-tooltip" id="${idBase}-tooltip"></input>`;
	});

	//Left
	addInspectorParam(container, () => {
		return `<label for="${idBase}-left">Left</label>
				<input type="text" name="${idBase}-left" id="${idBase}-left"></input>`;
	});

	//Top
	addInspectorParam(container, () => {
		return `<label for="${idBase}-top">Top</label>
				<input type="text" name="${idBase}-top" id="${idBase}-top"></input>`;
	});

	//Width
	addInspectorParam(container, () => {
		return `<label for="${idBase}-width">Width</label>
				<input type="text" name="${idBase}-width" id="${idBase}-width"></input>`;
	});

	//Height
	addInspectorParam(container, () => {
		return `<label for="${idBase}-height">Height</label>
				<input type="text" name="${idBase}-height" id="${idBase}-height"></input>`;
	});

	//Delete button.
	addInspectorParam(container, () => {
		return `<label for="${idBase}-delete">&nbsp;</label>
				<button class="fileSelect" type="button" id="${idBase}-delete">Delete</button>`;
	});

	//If data is not empty, fill out the various parameters.
	if(data != null) {
		runIfPresent(data, "id", () => {
			summary.innerHTML = data.id;
			container.querySelector(`#${idBase}-buttonId`).value = data.id;
		});

		runIfPresent(data, "image", () => {
			container.querySelector(`#${idBase}-imageLabel`).innerHTML = data.image;
		});
		runIfPresent(data, "imageHover", () => {
			container.querySelector(`#${idBase}-imageHoverLabel`).innerHTML = data.imageHover;
		});
		runIfPresent(data, "imageDown", () => {
			container.querySelector(`#${idBase}-imageDownLabel`).innerHTML = data.imageDown;
		});
		runIfPresent(data, "imageAltText", () => {
			container.querySelector(`#${idBase}-imageAltText`).value = data.imageAltText;
		});
		runIfPresent(data, "pixelArt", () => {
			container.querySelector(`#${idBase}-pixelArt`).checked = data.pixelArt;
		});

		runIfPresent(data, "destination", () => {
			container.querySelector(`#${idBase}-destination`).value = data.destination;
		});
		runIfPresent(data, "tooltip", () => {
			container.querySelector(`#${idBase}-tooltip`).value = data.tooltip;
		});

		runIfPresent(data, "left", () => {
			container.querySelector(`#${idBase}-left`).value = data.left;
		});
		runIfPresent(data, "top", () => {
			container.querySelector(`#${idBase}-top`).value = data.top;
		});
		runIfPresent(data, "width", () => {
			container.querySelector(`#${idBase}-width`).value = data.width;
		});
		runIfPresent(data, "height", () => {
			container.querySelector(`#${idBase}-height`).value = data.height;
		});
	}

	inspectorButtons.appendChild(container);

	//Add event listeners.
	container.querySelector(`#${idBase}-buttonId`).addEventListener("change", () => {
		document.getElementById(`${idBase}-summary`).innerHTML = document.getElementById(`${idBase}-buttonId`).value;
	});

	container.querySelector(`#${idBase}-image`).addEventListener("change", () => {
		let button = document.getElementById(idBase);

		button.src = `../rooms/${roomId}/${event.target.files[0].name}`;

		document.getElementById(`${idBase}-imageLabel`).innerHTML = event.target.files[0].name;
	});
	container.querySelector(`#${idBase}-imageHover`).addEventListener("change", () => {
		document.getElementById(`${idBase}-imageHoverLabel`).innerHTML = event.target.files[0].name;
	});
	container.querySelector(`#${idBase}-imageDown`).addEventListener("change", () => {
		document.getElementById(`${idBase}-imageDownLabel`).innerHTML = event.target.files[0].name;
	});

	container.querySelector(`#${idBase}-pixelArt`).addEventListener("change", () => {
		let button = document.getElementById(idBase);

		if(container.querySelector(`#${idBase}-pixelArt`).checked)
			button.style.imageRendering = "crisp-edges";
		else
			button.style.imageRendering = "auto";
	});

	container.querySelector(`#${idBase}-left`).addEventListener("change", () => {
		let button = document.getElementById(idBase);

		button.style.left = `${container.querySelector(`#${idBase}-left`).value}%`;
	});
	container.querySelector(`#${idBase}-top`).addEventListener("change", () => {
		let button = document.getElementById(idBase);

		button.style.top = `${container.querySelector(`#${idBase}-top`).value}%`;
	});
	container.querySelector(`#${idBase}-width`).addEventListener("change", () => {
		let button = document.getElementById(idBase);
		let newWidth = container.querySelector(`#${idBase}-width`).value;

		button.style.width = `${newWidth}%`;
		
		button.labAspectRatio = container.querySelector(`#${idBase}-height`).value/newWidth;
	});
	container.querySelector(`#${idBase}-height`).addEventListener("change", () => {
		let button = document.getElementById(idBase);
		let newHeight = container.querySelector(`#${idBase}-height`).value;

		button.style.height = `${newHeight}%`;
		
		button.labAspectRatio = newHeight/container.querySelector(`#${idBase}-width`).value;
	});

	container.querySelector(`#${idBase}-delete`).addEventListener("click", () => {
		document.getElementById(idBase).remove();

		container.remove();
	});
	
	limitInput(container.querySelector(`#${idBase}-destination`), "^[^\\s]*$");
	limitInput(container.querySelector(`#${idBase}-left`), "^[0-9.]*$");
	limitInput(container.querySelector(`#${idBase}-top`), "^[0-9.]*$");
	limitInput(container.querySelector(`#${idBase}-width`), "^[0-9.]*$");
	limitInput(container.querySelector(`#${idBase}-height`), "^[0-9.]*$");

	++buttonId;
}

//-- Update room elements functions --------------------------------------------
function setBackground(fileName) {
	let backgroundImage = document.getElementById("backgroundImage");
	let backgroundLabel = document.getElementById("backgroundLabel");
	let updateButtons = false;

	//Check whether we potentially need to update the buttons' aspect ratios.
	if(backgroundImage.src != "") {
		updateButtons = true;
		console.log(`setBackground: Updating button sizes...`);
	}
	
	//We use this to store the size of the room image.
	backgroundImage.addEventListener("load", function() {
		let oldWidth = roomWidth;
		let oldHeight = roomHeight;
		let oldAspectRatio = roomHeight/roomWidth;
		let newAspectRatio = oldAspectRatio;

		roomWidth = this.naturalWidth;
		roomHeight = this.naturalHeight;
		newAspectRatio = roomHeight/roomWidth;
		
		//If the aspect ratio of the background image has changed, update all
		//buttons to ensure their aspect ratio stays as it was.
		if(updateButtons && (newAspectRatio != oldAspectRatio)) {
			let buttons = document.querySelectorAll(".roomButton");

			buttons.forEach((button) => {
				runIfPresent(button, "labAspectRatio", () => {
					let origW = button.naturalWidth;
					let origH = button.naturalHeight;
					let scaledW = button.labRelativeWidth/100.0;
					let scaledH = button.labRelativeHeight/100.0;
					
					let newScaleW = (scaledW * oldWidth)/origW;
					let newScaleH = (scaledH * oldHeight)/origH;

					let newW = ((origW/roomWidth) * newScaleW) * 100.0;
					let newH = ((origH/roomHeight) * newScaleH) * 100.0;

					button.labRelativeWidth = newW;
					button.labRelativeHeight = newH;

					button.style.width = `${newW}%`;
					button.style.height = `${newH}%`;

					document.getElementById(`${button.id}-width`).value = newW;
					document.getElementById(`${button.id}-height`).value = newH;
				});
			});
		}
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

	if(data != null) {
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
			button.style.height = `${data.height}%`;
		});
	}

	//Update our size relative to the room image.
	button.addEventListener("load", function() {
		button.labRelativeWidth = (this.naturalWidth/roomWidth) * 100;
		button.labRelativeHeight = (this.naturalHeight/roomHeight) * 100;
		button.labAspectRatio = this.naturalHeight/this.naturalWidth;

		runIfPresent(data, "width", () => {
			button.labRelativeWidth = data.width;
		});
		runIfPresent(data, "height", () => {
			button.labRelativeHeight = data.height;
		});

		let buttonWidth = document.getElementById(`${button.id}-width`);
		let buttonHeight = document.getElementById(`${button.id}-height`);

		if(buttonWidth != null)
			buttonWidth.value = data.width;
		if(buttonHeight != null)
			buttonHeight.value = data.height;

		//If the user drag & dropped the image, centre the button on that
		//position.
		runIfPresent(data, "dropped", () => {
			let left = parseFloat(button.style.left) - (button.labRelativeWidth * 0.5);
			let top = parseFloat(button.style.top) - (button.labRelativeHeight * 0.5);

			button.style.left = `${left}%`;
			button.style.top = `${top}%`;

			document.getElementById(`${button.id}-left`).value = `${left}`;
			document.getElementById(`${button.id}-top`).value = `${top}`;
		});
	});

	button.labDragging = false;

	let dragOffsetX = 0;
	let dragOffsetY = 0;
	button.addEventListener("dragstart", (event) => {
		dragOffsetX = button.offsetLeft - event.clientX;
		dragOffsetY = button.offsetTop - event.clientY;
		
		button.labDragging = true;
	});
	button.addEventListener("dragover", (event) => {
		if(button.labDragging) {
			let newPosX = ((event.clientX + dragOffsetX)/roomWidth) * 100;
			let newPosY = ((event.clientY + dragOffsetY)/roomHeight) * 100;

			button.style.left = `${newPosX}%`;
			button.style.top = `${newPosY}%`;

			document.getElementById(`${button.id}-left`).value = `${newPosX}`;
			document.getElementById(`${button.id}-top`).value = `${newPosY}`;

			event.preventDefault();
		}
	});
	button.addEventListener("dragend", (event) => {
		button.labDragging = false;
	});

	room.appendChild(button);

	addButtonControls(data);
}

//-- Save room -----------------------------------------------------------------
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
		const currentId = button.id.substring(0, button.id.indexOf("-"));
		let buttonObj = new Object();

		console.log(currentId);

		buttonObj.id = document.getElementById(`${currentId}-buttonId`).value;

		let buttonImage = document.getElementById(`${currentId}-imageLabel`).innerHTML;
		let hoverImage = document.getElementById(`${currentId}-imageHoverLabel`).innerHTML;
		let downImage = document.getElementById(`${currentId}-imageDownLabel`).innerHTML;

		if(buttonImage != "Select Image")
			buttonObj.image = buttonImage;
		if (hoverImage != "Select Image")
			buttonObj.imageHover = hoverImage;
		if (downImage != "Select Image")
			buttonObj.imageDown = downImage;
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

//-- Initialisation ------------------------------------------------------------
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
	let zoomOut = document.getElementById("zoomOut");
	let zoomIn = document.getElementById("zoomIn");
	let background = document.getElementById("background");
	let pixelArt = document.getElementById("pixelArt");
	let backgroundColour = document.getElementById("pageColour");
	let script = document.getElementById("script");
	let addButtonButton = document.getElementById("addButton");
	let saveRoomButton = document.getElementById("saveRoom");
	let viewRoomButton = document.getElementById("viewRoom");

	zoomOut.addEventListener("click", (event) => {
		zoomLevel *= 1.0/1.25;
		document.getElementById("room").style.transform = `scale(${zoomLevel})`;
	});
	zoomIn.addEventListener("click", (event) => {
		zoomLevel *= 1.25;
		document.getElementById("room").style.transform = `scale(${zoomLevel})`;
	});

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
	});

	saveRoomButton.addEventListener("click", (event) => {
		saveRoom();
	});
	viewRoomButton.addEventListener("click", (event) => {
		window.open(`../?room=${roomId}`);
	});

	//Set up file dropping.
	//First, prevent the browser from just opening any image files you drop.
	//The following 2 event listeners are apparently necessary to prevent this.
	window.addEventListener("drop", (event) => {
		const fileItems = [...event.dataTransfer.items].filter((item) => item.kind === "file");

		if(fileItems.length > 0) {
			for(let i=0;i<fileItems.length;++i) {
				if(fileItems[i].type.startsWith("image/")) {
					//If we don't have a background image yet, set it.
					if(document.getElementById("backgroundLabel").innerHTML == "Select Image") {
						setBackground(event.dataTransfer.files[i].name);
					}
					//Otherwise add the image as a button.
					else {
						let roomBox = document.getElementById("room").getBoundingClientRect();
						let data = new Object();

						data.image = event.dataTransfer.files[i].name;
						if(roomWidth > 0)
							data.left = ((event.clientX - roomBox.x)/roomWidth) * 100;
						else
							data.left = 0;
						if(roomHeight > 0)
							data.top = ((event.clientY - roomBox.y)/roomHeight) * 100;
						else
							data.top = 0;

						//We use this to centre the button on the point that the
						//user dropped it.
						data.dropped = true;

						addButton(data);
					}
				}
			}

			event.preventDefault();
		}
	});
	window.addEventListener("dragover", (event) => {
		const fileItems = [...event.dataTransfer.items].filter((item) => item.kind === "file");

		if(fileItems.length > 0) {
			event.preventDefault();
		}
	});
});
