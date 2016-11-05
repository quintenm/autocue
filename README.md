# DigiPromp
A  digital autocue for a fast one-way communication

For use with
Live interview (for internet) or Presentation

# Project
* It's a simple side project, bassed on a simple idea
* This project is still in beta
* You can download it, it's free, but please leave somme suggestions for future upgrades

# What it can do
* Insert text in the highlighted section (Writer)
* Display live the entered text in Writer (Reader)
* Switch fast between Writer and Reader
* Set somme customisation, such as Font-family, hightlighted color, background-color
* Font scales with browser width
* Save customisation and reset it, localStorage bassed
* Keyboard trigger for scrolling or emergency call to writer

# What it will do in future
* Communicate with an secure PIN.
* Customisation, such as scroll type

# Short ToDo's for the future
* Fast input a list of questions, based on markdown
* Auto insert comments from social media

# Somme side notes
* With every page refresh all the input is lost
* It's still in beta

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
+ Click to Writer en Reader for each tab.
+ Discover ...

**Side note**: To use with 2 separated devices, Go to the local ip-adress of your computer with the running server. *Example http://192.168.0.10:3000*

# Online Demo
You can find a working demo
[digipromp.herokuapp.com](https://digipromp.herokuapp.com)

## Created by
[quinten.mares.be](http://quinten.mares.be) &copy; 2016
