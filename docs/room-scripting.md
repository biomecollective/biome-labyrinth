# Biome Labyrinth Room Scripting

- [Introduction](#introduction)
- [Snippets](#snippets)
	- [Change button image](#change-button-image)
	- [Play sound when button is clicked](#play-sound-when-button-is-clicked)
	- [Animate button position](#animate-button-position)

## Introduction
To add custom scripting to a room, create a javascript file (e.g. `room.js`) in
the room's folder, and set the room's `Script` to point to that file in the
room editor.

Scripts should run after the rest of the page has loaded, and you can use
standard javascript functions to get references to individual buttons etc. (e.g.
`document.getElementById("starButton");`).

It's recommended you rename your button IDs in the room editor so that they are
easier to reference from the room script.

**TODO:** Is there more to say here?

## Snippets
The following snippets are all taken from the
[geocities](https://biomecollective.github.io/biome-labyrinth/?room=geocities)
room, with additional comments explaining what the code is doing.

### Change button image
The following code toggles between two button images when the button is clicked.

```javascript
//Get references to the two page elements we are going to operate on: the button//itself, and the button's image.
let starButton = document.getElementById("starButton");
let starImage = document.querySelector("#starButton > img");

//We define an array with URLs to the two images we want to display, and a
//starIndex variable to keep track of which image we are currently displaying.
const stars = ["./rooms/geocities/star.gif", "./rooms/geocities/star2.gif"];
let starIndex = 0;

//Double-check that the starButton exists before operating on it.
if(starButton) {
	//Add an event listener to the starButton, to run our code when the button is
	//clicked.
	starButton.addEventListener("click", () => {
		//Increment starIndex and wrap it if it goes > 1.
		++starIndex;
		starIndex %= 2;

		//Similarly, double-check that starImage exists before operating on it.
		if(starImage) {
			//Change starImage's src variable to update it's image.
			starImage.src = stars[starIndex];
		}
	});
}
```

### Play sound when button is clicked
The following code plays a sound when the button is clicked.

**Important note:** If the button is set up to link to another page the sound
will be cut off almost immediately, as the new page will load straight away. The
following code assumes the button is implemented in the room editor with no
destination.

```javascript
//Get a reference to the button we're going to attach our sound to.
let planetButton = document.getElementById("planetButton");

//Create an Audio object and load our sound. Note that big sound files can take
//some time to load, so try and avoid large files if you want instant feedback
//immediately after page load.
const explosionSound = new Audio("./rooms/geocities/explosion.mp3");

//Double-check our planetButton exists before operating on it.
if(planetButton) {
	//Add an event listener to the planetButton, to run our code when the button
	//is clicked.
	planetButton.addEventListener("click", () => {
		//Play our sound.
		explosionSound.play();
	});
}
```

### Animate button position
The following code implements a very simple left-right tweening animation for
its button when it is clicked.

```javascript
//Get a reference to the button that we're going to move when it is clicked.
let ufo = document.getElementById("ufo");

//Double-check our ufo button exists before we operate on it.
if(ufo) {
	//This line ensures that when we assign the button a new position, it animates
	//towards that position, rather than jumping to it directly. The `2s` string
	//tells the browser to animate it to its new position over the course of
	//2 seconds.
	//
	//For more information about the transition property, see the MDN docs:
	//https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transition
	ufo.style.transition = `2s`;

	//Add an event listener to the ufo button, to run our code when the button
	//is clicked.
	ufo.addEventListener("click", () => {
		//Get the current x-axis position of the ufo.
		let ufoLeft = ufo.style.left;

		//If the ufo is to the left of the screen, update its position to be on the
		//right, otherwise update its position to be on the left.
		//
		//Note: when working with positions in the Biome Labyrinth, it's important
		//      to always use percentage positions. This ensures the page stays
		//      responsive to different resolutions and aspect ratios.
		if(ufoLeft == `15%`)
			ufo.style.left = `75%`;
		else
			ufo.style.left = `15%`;
	});
}
```
