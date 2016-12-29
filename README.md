# DigiPromp
A  digital autocue for a fast one-way communication

For use with
Live interview (for internet) or Presentation

Version 0.8.1 beta

# Project
* It's a simple side project, based on a simple idea
* This project is still in beta, but it works perfectly
* You can download it, it's free, but please leave somme suggestions for future upgrades

# What it can do
* Insert text in the highlighted section (Writer)
* Display live the entered text in Writer (Reader)
* Work in rooms
* Switch fast between Writer and Reader
* Set somme customisation, such as Font-family, hightlighted color, background-color
* Font scales with browser width
* Save customisation and reset it, localStorage based
* Keyboard trigger for scrolling or emergency call to writer

# What it will do in future
* Customisation, such as scroll type

# Short ToDo's for the future
* Fast input a list of questions, based on markdown
* Auto insert comments from social media

# Somme side notes
* With every page refresh all the input is lost
* It's still in beta BUT IT WORKS

# Used libraries
* jQuery v1.12.4
* NodeJS v4.1
* Express v4.14
* Socket.io v1.5.1
* fontawesome.io

# How to install it
1. Install nodejs and npm (install Xcode if necessary)
+ Run `npm install` in your terminal to install express and socket.io if is not allready installed
+ Run `node server.js` in your terminal
+ Open your browser en open two separated windows, surf to  `http://localhost:3000`
+ Click to Writer or Reader for each tab.
+ Discover ...

# How to use it
* Load page on serveral devices
* A room will be created automatically, you can rename it, confirm by clicking ** join **
* Be sure that all other devices have the same room name.
* Click on writer and insert your text, by pressing the `enter-key`

OR

* Click on Reader and go trough the text.

# Controls
- Keypress Previous slide `A`, `Q`, `F`, `Left arrow key`, `Up arrow key`
- Keypress Next slide `E`, `D`, `J`, `Right arrow key`, `Down arrow key`, `Spacebar key`
- Keypress Emergency `Return key`

**Side note**: To use with 2 separated devices, Go to the local ip-adress of your computer with the running server. *Example http://192.168.0.10:3000*

# Online Demo
You can find a working demo
[digipromp.herokuapp.com](https://digipromp.herokuapp.com)

# Know bug
- Emergency function, won't send to other devices

## Created by
[quinten.mares.be](http://quinten.mares.be) &copy; 2016 - 2017
