# Digital Autocue
A  digital autocue for a fast one-way communication

For use with
Live interview (for internet) or Presentation

Version 1.1.1 alpha

# Project
* It's a simple side project, based on a simple idea
* This project is an alpha, there can be still bugs, bug-reporting will be appreciated.
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
* Upload txt-file with autocue text for a fast input.

# What it will do in future
* Customisation, such as reading scroll type
* Auto insert comments from social media

# Somme side notes
* With every page refresh all the input is lost

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
* Load webpage on serveral devices
* A **room** will be created automatically, you can rename it, confirm by clicking ** join **
* Be sure that all other devices joined the same room.
* Click on **Writer** and insert your text, by pressing the `enter-key`
* You can upload an txt-file via **Upload autocue** see the demofile as example.

OR

* Click on **Reader** and go trough the text.

# Extra

## Style
* Change default background color;
* Change default font color
* Change default font family
* Change default display style in Reader (currently disabled)
* Save or restore settings

## Controls
- Keypress Previous slide `A`, `Q`, `F`, `Left arrow key`, `Up arrow key`
- Keypress Next slide `E`, `D`, `J`, `Right arrow key`, `Down arrow key`, `Spacebar key`
- Keypress Emergency `Return key`

**Side note**: To use with 2 separated devices, Go to the local ip-adress of your computer with the running server. *Example http://192.168.0.10:3000*

# Online Demo
You can find a working demo
[digitalautocue.herokuapp.com](https://digitalautocue.herokuapp.com)

# Know bug
- Emergency function, won't send to other devices

## Created by
[quinten.mares.be](http://quinten.mares.be) &copy; 2016 - 2017
