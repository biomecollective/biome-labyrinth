# Biome Gallery 2 ToDo

## Questions
- What license are we using?
- Support background image for body?
- Regarding the BDS chat at the meeting, should we move away from github?
	- And if so, what alternatives offer easy hosting, automatically deployed on
	  push?

## Immediate

### Room Editor
- Switch to mouse move instead of drag for dragging buttons?
	- Would skip the glitchy 2nd copy of the image
	- Would (I think) also fix the weird drag behaviour on zoom, and when
		dragging a button over another
- Draggable handles for buttons (scale + rotate)
- Dragging buttons does not really work when the room is zoomed out
- Confirm when leaving page if you've not saved your changes
- Add eyedropper for background colour
	- Eyedropper API not supported on firefox :(
- Respect user's light mode/dark mode preferences
- Update readme to make the process of adding a room a little clearer

### Labyrinth
- Tooltips persist on mobile after clicking buttons
- Better css for things like tooltips, room editor inspector
- Add favicon

## Longer Term

### Room Editor
- Move to an Outliner + Inspector approach, where you have a hierarchical list
  of all the elements in the room (background + one or more buttons), and only
  see the properties of the currently-selected element. Selecting a button would
  select it in the Outliner and show its properties in the Inspector