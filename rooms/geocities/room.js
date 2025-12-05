let starButton = document.getElementById("starButton");
let planetButton = document.getElementById("planetButton");

const stars = [`url("./rooms/geocities/star2.gif")`, `url("./rooms/geocities/star.gif")`];
let starIndex = 0;

const explosionSound = new Audio("./rooms/geocities/explosion.mp3");

if(starButton) {
	starButton.addEventListener("click", () => {
		++starIndex;
		starIndex %= 2;

		starButton.style.backgroundImage = stars[starIndex];
	});
}

if(planetButton) {
	planetButton.addEventListener("click", () => {
		planetButton.style.backgroundImage = `url("./rooms/geocities/explosion.gif")`;
		explosionSound.play();
	});
}