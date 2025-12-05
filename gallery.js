var roomId = "";

//Used to assign each tooltip a unique ID.
var tooltipId = 0;

//Simplifies some of the room.json loading code.
function runIfPresent(object, key, code) {
	if(Object.hasOwn(object, key)) {
		if(object.key != "") {
			code();
		}
	}
}

//------------------------------------------------------------------------------
function createButton(room, data) {
	let buttonObj = document.createElement("button");

	buttonObj.className = "roomButton";

	runIfPresent(data, "id", () => {
		buttonObj.id = data.id;
	});

	runIfPresent(data, "image", () => {
		buttonObj.style.backgroundImage = `url("./rooms/${roomId}/${data.image}")`;
		buttonObj.style.backgroundSize = "cover";
		buttonObj.style.backgroundPosition = "center";
	});

	let hasHover = false;
	let hasDown = false;

	//Set up mouse hover image
	runIfPresent(data, "imageHover", () => {
		//Preload image.
		let preloadImage = new Image();
		preloadImage.src = `./rooms/${roomId}/${data.imageHover}`;

		buttonObj.addEventListener("mouseover", () => {
			buttonObj.style.backgroundImage = `url("./rooms/${roomId}/${data.imageHover}")`;
		});
			
		hasHover = true;
	});
	//Set up button down image (making sure to return to correct original image
	//on mouse up).
	runIfPresent(data, "imageDown", () => {
		//Preload image.
		let preloadImage = new Image();
		preloadImage.src = `./rooms/${roomId}/${data.imageDown}`;

		buttonObj.addEventListener("mousedown", () => {
			buttonObj.style.backgroundImage = `url("./rooms/${roomId}/${data.imageDown}")`;
		});

		buttonObj.addEventListener("mouseup", () => {
			if(hasHover)
				buttonObj.style.backgroundImage = `url("./rooms/${roomId}/${data.imageHover}")`;
			else
				buttonObj.style.backgroundImage = `url("./rooms/${roomId}/${data.image}")`;
		});

		hasDown = true;
	});
	
	runIfPresent(data, "image", () => {
		if(hasHover || hasDown) {
			buttonObj.addEventListener("mouseout", () => {
				buttonObj.style.backgroundImage = `url("./rooms/${roomId}/${data.image}")`;
			});
		}
	});

	runIfPresent(data, "pixelArt", () => {
		if(data.pixelArt)
			buttonObj.style.imageRendering = "crisp-edges";
	});

	buttonObj.style.position = "absolute";
	buttonObj.style.top = `${data.top}%`;
	buttonObj.style.left = `${data.left}%`;
	buttonObj.style.width = `${data.width}%`;
	buttonObj.style.height = `${data.height}%`;

	room.appendChild(buttonObj);

	//Tooltips are added as an additional div to the room. Can't make them
	//children of the button as they get cut off by the button's viewport.
	//(correct me if I'm wrong!)
	runIfPresent(data, "tooltip", () => {
		let tooltip = document.createElement("div");

		tooltip.className = "tooltip";
		tooltip.id = `tooltip${tooltipId}`;
		++tooltipId;

		buttonObj.setAttribute("aria-describedby", tooltip.id);
		tooltip.setAttribute("role", "tooltip");

		tooltip.innerHTML = `<span>${data.tooltip}</span>`;

		//Position tooltip to be centred below the button.
		tooltip.style.left = `${parseFloat(data.left)}%`;
		tooltip.style.top = `${parseFloat(data.top) + parseFloat(data.height)}%`;

		//If the button is narrow, set the tooltip width to be wide enough
		//that its text isn't squashed.
		let width = parseFloat(data.width);
		if(width < 20) {
			width = 20;

			let left = parseFloat(data.left) + (parseFloat(data.width)/2) - 10;

			tooltip.style.left = `${left}%`;
		}
		tooltip.style.width = `${width}%`;

		room.appendChild(tooltip);

		//Show/hide tooltip depending on mouseover.
		buttonObj.addEventListener("mouseover", () => {
			tooltip.style.opacity = "75%";
		});
		buttonObj.addEventListener("mouseout", () => {
			tooltip.style.opacity = "0";
		});
	});

	//Add event handler with the room destination.
	runIfPresent(data, "destination", () => {
		let destination = data.destination;

		//If it's a link to another room in the gallery, update the url
		//accordingly. Otherwise it's just a regular url.
		if(destination.substring(0, 5) == "room:")
			destination = `./?room=${destination.substring(5)}`;

		buttonObj.addEventListener("click", () =>
		{
			if(destination != "")
				window.location.href = destination;
		});
	});
}

//------------------------------------------------------------------------------
async function loadRoomData() {
	try {
		const response = await fetch(`./rooms/${roomId}/room.json`);

		if(!response.ok)
			throw new Error(`Could not fetch room data. Response: ${response.status}`);

		const roomObj = await response.json();

		let room = document.getElementById("room");

		let roomImg = document.createElement("img");
		roomImg.src = `./rooms/${roomId}/${roomObj.image}`;
		roomImg.alt = roomObj.imageAltText;
		roomImg.style.width = "100%";
		if(roomObj.pixelArt)
			roomImg.style.imageRendering = "crisp-edges";

		room.appendChild(roomImg);

		if(Object.hasOwn(roomObj, "backgroundColour")) {
			if(roomObj.backgroundColour != "") {
				document.body.style.backgroundColor = roomObj.backgroundColour;
			}
		}

		if(Object.hasOwn(roomObj, "buttons")) {
			roomObj.buttons.forEach((button, index) => {
				createButton(room, button);
			});
		}

		if(Object.hasOwn(roomObj, "script")) {
			await import(`./rooms/${roomId}/${roomObj.script}`);
		}
	}
	catch(error) {
		console.log(`Error fetching room data. Error: ${error}`);
	}
}

//------------------------------------------------------------------------------
window.addEventListener("load", (event) => {
	//Get our room id from the ?room= string passed in to the url.
	const urlParams = new URLSearchParams(document.location.search);
	let urlRoom = urlParams.get("room");

	if(urlRoom != null)
		roomId = urlRoom;

	if(roomId == "")
		roomId = "lobby";

	loadRoomData();
});