# Biome Labyrinth ToDo

## Questions
- [ ] What license are we using?
- [ ] Support background image for body?
- [ ] Regarding the BDS chat at the meeting, should we move away from github?
	- [ ] And if so, what alternatives offer easy hosting, automatically
		  deployed on push?
		- [Codeberg?](https://codeberg.org/)
- [ ] Should the code for the testing web server be included in the repository?
- [ ] Do we want to add visible room credits? (the data's already there)
- [ ] Should rooms be added via pull requests or are we happy to give any interested Biome members write access to the repo?
- [ ] What's a good Git UI to recommend to community members not familiar with Git?
- [ ] Add text element, similar to buttons?
	- **Downside:** Would move us away from some of the initial implementation's
	  simplicity
	- **Upside:** Would be better accessibility-wise, as without it, text will
	  have to be rendered as an image
	- Would probably want to move to the Outliner + Inspector approach proposed
	  below to support this

## Immediate

### Room Editor
- [ ] Draggable handles for buttons (scale + rotate)
	- See [wwwobble.org](https://wwwobble.org/)'s approach for inspiration
- [ ] Respect user's light mode/dark mode preferences
- [ ] Update readme to make the process of adding a room a little clearer
- [ ] Add eyedropper for background colour
	- [ ] Eyedropper API not supported on firefox :(
- [x] Confirm when leaving page if you've not saved your changes
- [x] Switch to mouse move instead of drag for dragging buttons?
	- [x] Would skip the glitchy 2nd copy of the image
	- [x] Would (I think) also fix the weird drag behaviour on zoom, and when
		  dragging a button over another
- [x] Check button aspect ratio is correctly updated if you replace the image
- [x] Highlight button in inspector when it's clicked/dragged
- [x] Fix image drag and drop when zoomed in
- [x] Dragging buttons does not really work when the room is zoomed out

### Labyrinth
- [ ] Tooltips persist on mobile after clicking buttons
- [ ] Better css for things like tooltips, room editor inspector
- [ ] Add favicon
- [x] Swap to implementing button images as child `<img>` instead of setting the
	  backgroundImage property of the `<button>` itself. Would allow us to
	  actually use the alt text
- [x] Draw tooltips above buttons (z-order), not interleaved (buttons can
	  currently overlap other buttons' tooltips)

## Longer Term

### Room Editor
- [ ] Move to an Outliner + Inspector approach, where you have a hierarchical
	  list of all the elements in the room (background + one or more buttons),
	  and only see the properties of the currently-selected element. Selecting
	  a button would select it in the Outliner and show its properties in the
	  Inspector
