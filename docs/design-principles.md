# Biome Labyrinth Design Principles
In some ways the Biome Labyrinth is the successor of the original
[Biome Gallery](https://www.niallmoody.com/work/biome-gallery/), but in other
ways it is attempting to solve a slightly different set of problems. The
labyrinth is not intended to be a shared online space with individual avatars,
but something closer to a collaborative community art project (to be fair, the
Biome Gallery *was* a collaborative community art project, it was just *also*
a mini MMO).

This page lays out the core design principles behind the Biome Labyrinth
project.

The Biome Labyrinth is intended to be:
- [Technically simple](#technically-simple)
- [Easily archivable](#easily-archivable)
- [Extensible](#extensible)
- [Accessible](#accessible)
- [Responsive](#responsive)

## Technically simple
Complex code is hard to maintain and tends to be fragile as a result. A lot of
modern web development revolves around very complex codebases built on a stack
of complex interdependent libraries and frameworks. It could possibly be argued
that this is necessary for companies operating on the scale of Google and
Amazon, but for individuals or small communities, it makes for a very complex
development environment.

As such, the code for the Biome Labyrinth is intended to be as simple as
possible. The Labyrinth is essentially a static site, with rooms consisting of
json data and images, laid out with some
[fairly minimal javascript code](../labyrinth.js). As a result, there's no need
to set up a custom server (e.g. using Node.js), and the entire Labyrinth can be
served from a standard web server.

The most complex code in the project is reserved for the
[room editor](https://biomecollective.github.io/biome-labyrinth/room-editor), which is intentionally designed to allow
non-technical community members to add rooms to the Labyrinth without needing to
edit text files or write any code.

## Easily archivable
The Biome Labyrinth is gone. We saved the code and assets, but it was tightly
tied to our glitch.com hosting service, and it would be a huge amount of work to
resurrect it to allow it to live on as an active archive. One of the core goals
of the Biome Labyrinth is to ensure it never ends up in a similar situation. If
our current hosting goes away it should be trivial to move it to a new host and
keep it as an archive of the community's work.

This is another one of the reasons that the Labyrinth is designed as a static
site, relying on just standard HTML, CSS, and Javascript.

## Extensible
While the core Labyrinth code is designed to be as simple as possible, Biome is
full of very talented people, and there's a lot of fun things you can do with
Javascript and a modern web browser. As such, the Labyrinth is designed to allow
individual room authors to add functionality to their rooms with Javascript.
With the caveat that such custom functionality is essentially siloed to that
room, to avoid adding complexity to the core Labyrinth implementation.

## Accessible
While the Labyrinth is oriented towards images, it aims to be as accessible as
possible, and support screen readers via alt text and ARIA descriptors where
relevant. Pages are rendered as HTML using standard elements (`div`, `button`,
and `img`) and - unless a room author has done something unusual - are all
navigable by keyboard.

There is probably more we can do in this area.

## Responsive
It's always a little sad when you go to check out a cool web page on your phone
and you find yourself having to constantly zoom and scroll to take the whole
thing in. The Biome Labyrinth aims to work just as well on mobile as on desktop.

At the time of writing the main stylesheet ([style.css](../style.css))
represents a first pass on a responsive design; it could probably be improved.

---

These principles were written by Niall for the first iteration of the Labyrinth.
As the Labyrinth is intended to be a community project, they are obviously
subject to change based on the interests and needs of the community.
