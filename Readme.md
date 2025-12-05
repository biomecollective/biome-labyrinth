# The Biome Labyrinth
Inspired by the original Biome Gallery but taken in a different direction, the
Biome Labyrinth will be a sprawling collection of rooms create by members of
[Biome Collective](https://www.biomecollective.com/) that you can explore in
your browser.

If you are a member of Biome Collective and would like to add a room to the
labyrinth, contact Niall on discord or slack.

# Adding a Room to the Labyrinth
Rooms consist of a background image and one or more smaller images which can be
used as buttons to navigate to other rooms, or any web URL.

1. Checkout the repository on github
2. Create a new folder in the `rooms` directory. You can name it however you
   like, but **don't include spaces in the file name**.
3. Add your background image and any button images to the new directory.
4. In order to set up the room you will need to serve the labyrinth from a web
   server. If you're on Windows you can do this by double-clicking the
   `Web Server.bat` file. If you're on other platforms you will need to install
   a web server of your own and tell it to serve files from the main
   `biome labyrinth` folder.
5. In your web browser navigate to http://127.0.0.1:8000/room-editor
6. Click the `Select Directory` button and select the new room directory you
   created. If you get a popup asking if you want to upload all the files in the
   directory, say yes.
7. You can now edit the room and add images etc.
8. When you're done, click `Save Room` and save it as `room.json` in the new
   room directory you created.

# Design Principles
The core principles Niall worked to when initially designing the code for the
labyrinth:

- The labyrinth is a collection of rooms with buttons (doors?) for navigating
  between rooms.
- Keep things simple. The core functionality should be as simple as possible. If
  additional functionality is needed, it can be added on a per-room basis by
  individual room authors (via the room script).
- The labyrinth should be easily archive-able.
- No server-side code; everything runs client-side. This simplifies the
  programming and makes it easier to archive the entire labyrinth.
	- Related: the labyrinth should consist entirely of static files.
- The labyrinth should follow responsive design principles and work equally on
  desktop and mobile. To aid this, all room object coordinates and sizes should
  be percentages relative to the size of the background image.
- The labyrinth should be accessible via screen reader. Alt text and ARIA
  descriptors should be used wherever appropriate.
		- Related: all labyrinth elements should be standard HTML elements to
		  ensure screen readers understand them and they can be navigated via
		  keyboard (tab).
