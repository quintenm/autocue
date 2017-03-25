# Digital Autocue
A  digital online autocue for a faster way to communicate

It has a simple writer and reader side

For use and support with
Live interviews (for internet) or Presentations

Version 1.3 alpha

# Project
* It's a simple side project, based on a simple idea
* This project is an alpha, there can be still bugs, bug-reporting will be appreciated.
* You can download it, it's free, but please leave somme suggestions for future upgrades

# What it can do
* Insert text in the highlighted section (Writer)
* Display live the entered text in Writer (Reader)
* Work in rooms
* Switch fast between Writer and Reader
* Set somme customisation, such as Font-family, text-transform, text-weight, hightlighted color, background-color and reading style
* Font scales with browser width
* Save customisation or roomname and reset it, localStorage based
* Keyboard trigger for scrolling or emergency call to writer
* Upload txt-file with autocue text for a fast input.

# What it will do in future
* Auto insert comments from social media (It would be cool)

# **Hey, for what reason will I use this awesome Autocue**
* As a presenter of your show you need a good overview of the last minute created questions.
* As director you need to have a overview with the text and a way to edit those lines while the show is recording.
* Autocue software is to expensive.
* Online tool is awesome
* You can contribute with multiple people
* a Really fast setup.
* You're dreaming of a way to link your  Facebook live or YouTube live chat with your autocue. This is a feature that will active in the future.

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
* A **room** will be created automatically, you can rename it and save as your default, confirm by clicking ** join **
* Be sure that all other devices joined the same room.
* Click on **Writer** and insert your text, by pressing the `enter-key`
* You can upload an txt-file via **Upload autocue** see the demofile as example.

OR

* Click on **Reader** and go trough the text.

# Extra
### Style
* Change default font color
  * white
  * black
  * red
  * green
  * blue
  * yellow
* Change default background color;
  * white
  * black
  * red
  * green
  * blue
  * yellow
* Change default font family
  * serif
  * sans-serif
* Change default text weight
  * light
  * normal
  * bold
* Change default text transform
  * none
  * capitalize
  * lowercase
  * uppercase
* Change default display style in Reader
  * Stick scroll (default)
  * Just scroll (classic)
* Save your default Room name
* Save or restore settings

### Controls
#### Writer
1. Click on the text input field
2. Type your text
3. Hit `Return` to submit
4. Type your next sentence

##### Reader
###### Stick Scroll (default)
* Keypress Previous `A`, `Q`, `F`
* Keypress Next `E`, `D`, `J`, `Spacebar`
* Keypress Emergency `Return`

###### Just Scroll (classic)
* Start and Stop scrolling `Spacebar`
* Normal Navigation
* Keypress Emergency `Return`

**Side note**: To use with a own local server and multiple separated devices, surf to the local ip-adress of th computer with the running server. *Example http://192.168.0.10:3000*

# Online Demo
You can find a working demo
[digitalautocue.herokuapp.com](https://digitalautocue.herokuapp.com)

# Known bug
- Emergency function on the Reader side, won't send to other devices

# Online uri
* [demo heroku.com](http://digitalautocue.herokuapp.com)
* [github.com](https://github.com/quintenm/digitalautocue)
* [gitlab.com](https://gitlab.com/quintenm/digitalautocue)
* [quintenm.github.io](http://quintenm.github.io/2016/12/31/Digital-autocue.html)

## Created by
[quinten.mares.be](http://quinten.mares.be) — [heroku Digital Autocue Demo](http://digitalautocue.herokuapp.com) &copy; 2016 - 2017
