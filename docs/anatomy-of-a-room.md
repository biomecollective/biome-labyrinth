# The anatomy of a room
The Biome Labyrinth is a static site. As such, a **room** in the Labyrinth is
just a folder in the `rooms` directory containing a series of files.

![Screenshot of a file explorer showing the contents of a room folder, with the
folder path, background image, button images, optional javascript file and
room data file all labelled and highlighted.](images/anatomy-of-a-room.png)

## Room folder
The **Room folder** is a folder in the `rooms` directory of the Labyrinth,
containing all of the files needed by that room. The name of the **Room folder**
will be used as the URL of the room, so it must be lowercase with no spaces.

The above `example` room would have the URL
`https://biomecollective.github.io/biome-labyrinth/?room=example`

## Background image
The background image for the room. Can be any image format supported by modern
web browsers (jpg, png, gif, etc.).

## Button image(s)
Each button consists of at least one image. You can optionally include a
**hover** image (shown when the mouse cursor hovers over the button) and a
**down** image (shown when the button is clicked). Again, can be any image
format supported by modern web browsers (jpg, png, gif, etc.).

## Custom javascript
A room may optionally included a javascript (.js) file to run custom code (e.g.
play sounds when buttons are pressed, etc.). This should get loaded after the
rest of the room has loaded.

## Room data
Each room has a `room.json` file containing all of the information about the
room (what to use as a background image, where buttons are placed, etc.). You
can edit this by hand, but it's recommended to use the
[room editor](https://biomecollective.github.io/biome-labyrinth/room-editor/).

## Additional files
The above files are the only files handled directly by the labyrinth, but with
the option of custom javascript you can load additional files manually. These
should similarly be placed within the **Room folder**. While it is possible to
load files stored on other sites, this would go against the goal of the
Labyrinth being easy to archive.
