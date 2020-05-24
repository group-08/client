# Brändi Dog around the World

## Introduction

Welcome to Team 08's Brändi Dog around the World application. <br>
The project's aim was to implement a web application based on the popular board game *Brändi dog* but with a twist. 


## Technologies
The frontend of the application is based on React. We use the REST-API to exchange data with the backend.

## High-level components
The two main components are
- User
- Game

The users identify the player and carry ID, login credentials, status and leader board score.<br>
The game contains several sub components such as
- Cards
- Fields
- Players
- etc.

The Player is linked to one user and receives the cards. The fields display where the pieces are on and let a player choose a move.<br>
The main class of the game is gameboard in gameboard.js

## Launch & Deployment
For your local development environment you'll need Node.js >= 8.10. You can download it [here](https://nodejs.org). All other dependencies including React get installed with:

### `npm install`

This has to be done before starting the application for the first time (only once).

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console (use Google Chrome!).

### `npm run test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Illustrations

Brändi Dog around the World starts with login mask. If the user has not created an account yet he needs to sign up and log in, the link for the sign up is on the login mask. <br> 
After successful login the user gets redirected to the lobby where her can see who else is online and a open a game. There is also a Leaderboard accessible. Other users can join the host in this game, only the host can remove players from the game. The host can start the game at any point, if there are less than four players the remaining slots will be filled with automated bots.<br>
Every time cards are distributed each player needs to select one to swap with his partner. The game is quite intuitive with simply clicking on Cards, Pieces and Fields that get illuminated if they are reachable. There is also a link to the game rules available. The previously mentioned twist of the game is that we visit different places and depending on the weather we have some special fields. <br>
When the game has finished the winners are displayed and the user can go back to the lobby using a link.

## Roadmap

There are some possible contributions new developers could add
- A six player map could be realized.
- One could add more weather states and more places we can travel to.
- The joker could realize the 7 card.

## Authors and acknowledgement
Brändi Dog around the World is a group project of the following five members.

- Oliver Kamer (Team Lead, Back- and Frontend)
- Philip Flury (Back- and Frontend)
- Felix Hoffmann (Frontend)
- Nick Kipfer (Backend)
- Flurin Knellwolf (Backend)

We want to thank everybody involved with the Module SoPra and especially Alex Scheitlin, our TA that guided us through the last three months. 

## License

GNU General Public License v3.0 