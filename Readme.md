# The Biome Labyrinth
Inspired by the original
[Biome Gallery](https://www.niallmoody.com/work/biome-gallery/) but taken in a
different direction, the Biome Labyrinth will eventually be a sprawling
collection of rooms create by members of
[Biome Collective](https://www.biomecollective.com/) that you can explore in
your browser.

If you are a member of Biome Collective and would like to add a room to the
labyrinth, contact Niall on discord or slack.

If you want to create your own labyrinth using this code, just clone the
repository and delete the contents of the `rooms` folder.

# Adding a Room to the Labyrinth
**Note:** The following instructions assume you have some familiarity with
					[Git](https://git-scm.com/) and [GitHub](https://github.com/). If
					you've not used Git before, talk to Niall for an intro.

Rooms consist of a background image and one or more smaller images which can be
used as buttons to navigate to other rooms, or any web URL.

1. Checkout the repository on github
2. Create a new folder in the `rooms` directory. You can name it however you
   like, but **don't include spaces in the file name**.
3. Add your background image and any button images to the new directory.
4. In order to test your room you'll need to run a web server. A simple web
   server is included in the repository for Windows and Linux. If you're on
   Windows you can run it by double-clicking the `Web Server.bat` file. If
   you're on Linux you should be able to double-click the `WebServer.sh` file.
   If you're on mac you will need to install a web server of your own and tell
   it to serve files from the main `biome labyrinth` folder.
5. In your web browser navigate to http://127.0.0.1:8000/room-editor
6. Click the `Select Directory` button and select the new room directory you
   created. If you get a popup asking if you want to upload all the files in the
   directory, say yes.
7. You can now edit the room and add images etc.
8. When you're done, click `Save Room` and save it as `room.json` in the new
   room directory you created.
9. To see your room on the live website, push your changes to the git
   repository. The website should update automatically after a few moments.

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
	  ensure screen readers understand them and that they can be navigated via
	  keyboard (tab).
