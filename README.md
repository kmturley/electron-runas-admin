# electron-runs-admin

Example app showing how to elevate admin privileges for a child process using:

* NodeJS 12.x
* Electron 17.x
* Typescript 4.x
* `whoami` bash command

## Screenshots

<img src="screenshots/1-app.png?raw=true" alt="App" width="300" />

<img src="screenshots/2-whoami.png?raw=true" alt="Awhoamipp" width="300" />

<img src="screenshots/3-elevated-popup.png?raw=true" alt="Elevated popup" width="300" />

<img src="screenshots/4-elevated-whoami.png?raw=true" alt="Elevated whoami" width="300" />


## whoami

Displays user, group and privileges information for the user who is currently logged on to the local system. If used without parameters, whoami displays the current domain and user name. [Read more](https://en.wikipedia.org/wiki/Whoami)


## Installation

Install node dependencies using:

    npm install


## Usage

Build Typescript source and run Electron using:

    npm start


## Build app

Build production app file using:

    npm run build


## Contact

For more information please contact kmturley
