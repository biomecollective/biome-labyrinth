# The Biome Labyrinth
The [Biome Labyrinth](https://biomecollective.github.io/biome-labyrinth/) is a
virtual space made up of a sprawling collection of interconnected rooms,
navigable via a web browser. It is designed to be technically simple, easy to
archive in the event of hosting issues, and easy to add rooms to.

The Biome Labyrinth is inspired by the original
[Biome Gallery](https://www.niallmoody.com/work/biome-gallery/), but where the
Biome Gallery was essentially a collaborative community art work crossed with a
mini MMO, the Biome Labyrinth strips out the MMO elements in favour of a more
straightforward, easier-to-maintain design.

If you are a member of Biome Collective and would like to add a room to the
labyrinth, contact Niall on discord.

If you want to create your own labyrinth using this code, just clone the
repository and delete the contents of the `rooms` folder.

There's a quick intro explaining how to add a room to the labyrinth below. For
more detailed information about how to use/add to the labyrinth, see the
[docs](docs/Readme.md).

# Quick intro: Adding a Room to the Labyrinth
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
The core principles behind the technical design of the Biome Labyrinth are as
follows. The Biome Labyrinth is intended to be:

- [Technically simple](docs/design-principles.md#technically-simple)
- [Easily archivable](docs/design-principles.md#easily-archivable)
- [Extensible](docs/design-principles.md#extensible)
- [Accessible](docs/design-principles.md#accessible)
- [Responsive](docs/design-principles.md#responsive)

For a more detailed explanation, see the
[Design Principles](docs/design-principles.md) document.
