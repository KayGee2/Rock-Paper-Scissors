# Rock Paper Scissors

A browser-based Rock Paper Scissors game built with HTML, CSS and vanilla JavaScript, with no frameworks or build tools. Play against the computer, track your score, and hear sound effects for every result. The game is dedicated to the women of South Africa and links to organisations that support victims of gender-based violence.

Features
Play against the CPU with a live scoreboard (your wins, rounds played, CPU wins)
Short suspense animation before each result is revealed
Result messages that explain why you won or lost, for example "Paper covers Rock"
Sound effects for win, lose and draw, plus looping background music
Single-page navigation between Landing, Game, How to Play and Credits screens
Reset button to start a new match
Responsive layout for phones and desktops
Dark-mode colour support through CSS variables
Scrolling sponsor and support logos linking to women's safety organisations
Tech stack
Area	Tools
Markup	HTML5
Styling	CSS3 (custom properties, flexbox, keyframe animations)
Logic	Vanilla JavaScript (ES6)
Fonts	Google Fonts: Space Grotesk, Source Serif 4
Audio	HTML5 Audio API
Project structure
rock-paper-scissors/
├── index.html                    # All four screens in one page
├── style.css                     # Layout, theme and animations
├── script.js                     # Navigation, game logic, audio
├── background-upbeat-jazz.mp3
├── winning-horn.mp3
├── losing-horn.mp3
├── draw-clash-sound.mp3
└── images/                       # Support organisation logos
Getting started
Download or clone the project.
Keep the four .mp3 files in the same folder as index.html.
Open index.html in a browser, or serve the folder:
bash
   python -m http.server 8000
Visit http://localhost:8000.

Browsers block audio until the user interacts with the page, so the music starts on your first click.

How the game works
Lookup tables instead of long if-chains

The rules are stored as an object, where each move maps to the move it defeats:

js
const BEATS = { rock: 'scissors', paper: 'rock', scissors: 'paper' };

A second object, REASON, holds the message for each winning pairing. Adding a new move only means adding entries to these objects.

A round, step by step
The player clicks a throw, which calls playGame(choice).
A guard clause (if (playing) return;) ignores clicks while a round is still running.
The playing flag is set, the throw buttons are disabled, and a shaking CSS class starts the animation.
After 550 ms (setTimeout), the CPU picks a random throw:
js
   ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)]
The result is decided with three branches:
same throw → draw
BEATS[playerChoice] === opponentChoice → win
otherwise → lose
The scoreboard and result message update, the matching sound plays, and the buttons unlock.
Single-page navigation

go(name) removes the active class from every .screen and adds it to #screen-<name>. The CSS shows only .screen.active, so there are no page reloads.

Audio

Sounds are created with new Audio(...). Playback is wrapped in .catch() because play() returns a promise that can be rejected by browser autoplay rules. Clips rewind with currentTime = 0, so they can replay immediately.

Roadmap
 Best-of-five and best-of-ten match modes
 Save high scores with localStorage
 Mute and volume controls
 Highlight the active tab in the navigation
 Connect the donation button to a verified fundraising page
 Keyboard shortcuts (R, P, S)
What I learned
Managing game state (scores, rounds, a lock flag) without a framework
Using objects as lookup tables to simplify logic
Letting JavaScript toggle CSS classes while CSS handles the animation
Handling asynchronous behaviour with setTimeout and promises
Working within browser autoplay restrictions
Credits
Design and build: Kagisho Madigwe (game logic and structure); styling assisted by Claude (AI)
Typefaces: Space Grotesk, Source Serif 4
Icons: Luna

In dedication of all the women of South Africa.

# Author
# Kagisho Madigwe

In dedication of all the women of South Africa. Stop the violence.

Author
