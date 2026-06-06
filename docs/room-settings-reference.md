# Room settings reference

## Room settings
| Setting   |Description																											 |
|-----------|------------------------------------------------------------------|
|Zoom       |Zoom in and out using the **-** and **+** buttons.|
|Room Name  |A human-readable version of the room name, used for the web page title and seen on the browser's tab for the page (the page title will be `Biome Labyrinth - <Room Name>`). By default this will be set to the room's folder name.|
|Background |The background image for the room, can be any image format supported by web browsers.|
|Alt Text   |Alt text for the room's background image.|
|Pixel Art  |Check this box to ensure pixel art background images keep their sharp edges when scaled.|
|Page Colour|The background colour for the whole page. Rooms are centred on the page, so you may want to design your background image to blend in with this colour.|
|Script     |**[OPTIONAL]** A javascript script that will run once the page has loaded and can be used to extend the basic functionality of the labyrinth for this room.|
|Author     |Name of the person who created this room *(currently unused, but that will hopefully change)*.|
|Author Link|Link to the room author's website *(currently unused, but that will hopefully change)*.|

## Button settings
| Setting   |Description																											 |
|-----------|------------------------------------------------------------------|
|ID         |An identifier used to identify the button. By default this will just be a number, but you can rename it to be more easily understandable at a glance (particularly useful if you've got a room with a lot of buttons).|
|Image      |The main image for the button, can be any image format supported by web browsers.|
|Image Hover|**[OPTIONAL]** An image to display while the mouse is hovering over the button.|
|Image Down |**[OPTIONAL]** An image to display while the button is being clicked.|
|Alt Text   |Alt text to describe the button's image.|
|Pixel Art  |Check this box to ensure pixel art button images keep their sharp edges when scaled.|
|Destination|What happens when someone clicks the button. Can be either a standard URL (e.g. [https://www.biomecollective.com/](https://www.biomecollective.com/)) or a direct link to another room in the labyrinth. Direct links take the form `room:<room folder>`. i.e. to link to the `hallway` room, the destination would be `room:hallway`.|
|Tooltip    |Text to display when the mouse hovers over the button. Usually this will be a short description of the room or URL that the button leads to.|
|Left       |The position of the button's left edge. Note that this is a percentage value; buttons are positioned **relative** to the background image. A button positioned so its left edge is exactly in the centre of the background would have a `Left` value of `50`, i.e. 50% of the width of the background image. In most cases it will be easier to position buttons by dragging them than setting the `Left` value directly.|
|Top        |The position of the button's top edge. See notes on `Left` setting for details.|
|Width      |The width of the button, relative to the background image. i.e. a width of 100 *(100%)* would mean the button takes up the entire width of the background image.|
|Height     |The height of the button, relative to the background image.|
|Reset Size |If you have changed the width or height of the button, this will reset its size to its original size relative to the background image.|
|Delete     |Deletes the button.|
