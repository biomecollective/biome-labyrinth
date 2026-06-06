let starButton = document.getElementById("starButton");
let starImage = document.querySelector("#starButton > img");
let planetButton = document.getElementById("planetButton");
let planetImage = document.querySelector("#planetButton > img");

const stars = ["./rooms/geocities/star2.gif", "./rooms/geocities/star.gif"];
let starIndex = 0;

const explosionSound = new Audio("./rooms/geocities/explosion.mp3");

if(starButton) {
	starButton.addEventListener("click", () => {
		++starIndex;
		starIndex %= 2;

		if(starImage) {
			starImage.src = stars[starIndex];
		}
	});
}

if(planetButton) {
	planetButton.addEventListener("click", () => {
		if(planetImage) {
			planetImage.src = "./rooms/geocities/explosion.gif";
		}

		explosionSound.play();
	});
}
