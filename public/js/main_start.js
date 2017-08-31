var arrAnimals = ["ant", "bird", " cat", "chicken", "cow", "dog", "elephant", "fish", "fox", "horse", "kangaroo", "lion", "monkey", "penguin", "pig", "rabbit", "sheep", "tiger", "whale", "wolf", "zebra"],
  a, b, u,
  readerTimerScroll = true,
  readerScrollTop = 0,
  scrollSpeed = 100, //scroll speed for readerStyle-Two
  readerScrollAutoDown = 0,
  getURLToken, // check if url contains variable room (get)
  defaultRoomName = ""; //  CUSTOMIZE: set a default roomname.

$(function() {
  "use strict";
  applyConfig(loadConfig());

  // button.sectionNavigation begin
  $(".sectionNavigation").click(function(e) {
    e.preventDefault();
    u = $(this).attr('href');
    b = $("#room").val();

    if (u == "#reader") {
      document.location.href = "/reader/";
    } else if (u == "#writer") {
      document.location.href = "/writer/";
    } else if (u == "#reset") {
      saveConfig({
        fontColor: "font-color-primary",
        backgroundColor: "background-color-primary",
        fontFamily: "font-family-secundary",
        readerStyle: "readerStyle-One",
        textWeight: "text-weight-regular",
        textTransform: "text-transform-normal",
        room: token(),
        flipHorizontal: false,
        flipVertical: false,
        fullscreen: false
      });
      applyConfig(loadConfig());
    } else if (u == "#alertClose") {
      $(".alert").hide();
    } else if (u == "#mainScreenOptions") {
      $(".mainScreenOptions").show();
      $("html").addClass("no-scroll");
    } else if (u == "#mainScreenOptionsClose") {
      $(".mainScreenOptions").hide();
      $("html").removeClass("no-scroll");
    } else if (u == "#mainScreenHelp") {
      $(".mainScreenHelp").show();
      $("html").addClass("no-scroll");
    } else if (u == "#mainScreenHelpClose") {
      $(".mainScreenHelp").hide();
      $("html").removeClass("no-scroll");
    } else if (u == "#mainScreenRandom") {
      $('#room').val(generateRoomName());
    } else if (u == "#mainScreenPrevious") {
      $('.part2').addClass('hidden');
      $('.part1').removeClass('hidden');
    } else if (u == "#mainScreenNext") {
      $('.part1').addClass('hidden');
      $('.part2').removeClass('hidden');
    } else if (u == "#fullscreen") {
      setConfigItem('fullscreen', !loadConfig().fullscreen);
      // launchFullscreen(document.documentElement);
    } else {
      console.log(u + ": There was a button that won't work, Report to the developer");
      alert(u + ": Report to developer");
    }
  });
  // // button.sectionNavigation end
  // // start settings config
  $(".dropdown-content a").click(function(e) {
    e.preventDefault();
    var a = $(this).data('href');
    if (a.match("^font-color-*")) {
      setConfigItem('fontColor', a);
    } else if (a.match("^background-color-*")) {
      setConfigItem('backgroundColor', a);
    } else if (a.match("^font-family-*")) {
      setConfigItem('fontFamily', a);
    } else if (a.match("^readerStyle-*")) {
      setConfigItem('readerStyle', a);
    } else if (a.match("^text-weight-*")) {
      setConfigItem('textWeight', a);
    } else if (a.match("^text-transform-*")) {
      setConfigItem('textTransform', a);
    }
  });
  // end settings config
  // start create room
  $('#createRoom, #arrow-right').click(function(e) {
    e.preventDefault();
    var roomId = $('#room').val();
    var roomByStartup = $('#defaultRoomName').val();
    setConfigItem('room', roomId);
    $('#defaultRoomName').val(roomId);
    $('.alert-text').text('Room has been created');
    $('.alert').show();
  });
  //end create room
});


function token() {
  // 1. check if url containts variable room (get)
  getURLToken = getURLQuery("room");
  if (getURLToken == false) {
    // 3. Generate a custom token
    if (defaultRoomName == "") {
      return generateRoomName();
    } else {
      return defaultRoomName;
    }
  } else {
    return getURLToken;
  }
}

function generateRoomName() {
  var randAnimal = arrAnimals[Math.floor(Math.random() * arrAnimals.length)].toLowerCase(),
    number = Math.floor(Math.random() * 1000) + 1;
  return randAnimal + number;
}

function getURLQuery(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return (false);
}

function loadConfig() {
  if (!localStorage.config) {
    saveConfig({
      fontColor: "font-color-primary",
      backgroundColor: "background-color-primary",
      fontFamily: "font-family-secundary",
      readerStyle: "readerStyle-One",
      textWeight: "text-weight-regular",
      textTransform: "text-transform-normal",
      room: token(),
      flipHorizontal: false,
      flipVertical: false,
      fullscreen: false
    });
  }
  return JSON.parse(localStorage.config);
}

function saveConfig(config) {
  localStorage.config = JSON.stringify(config);
}

function setConfigItem(key, value) {
  var config = loadConfig();
  config[key] = value;
  saveConfig(config);
  applyConfig(config);
}

function applyConfig(config) {
  //config.room = token(config);
  //  setConfigItem('room', token());
  $('#room,#defaultRoomName').val(config.room);
  if (config !== null || config != null) {
    var a = config.fontColor,
      b = config.backgroundColor,
      c = config.fontFamily,
      d = config.readerStyle,
      e = config.textWeight,
      f = config.textTransform,
      total = a + " " + b + " " + c + " " + d + " " + e + " " + f;
    $("body").removeAttr('class').addClass(total);
  }
  launchFullscreen(document.documentElement,config.fullscreen);
  // $('html').css('font-size', (config.zoom || 1) + 'em');
}

//start case functions
function launchFullscreen(element,fullscreen) {

  if (fullscreen == false) {
    $('.fullscreen').addClass('fa-compress').removeClass('fa-expand');
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  } else if(fullscreen == true) {
    $('.fullscreen').addClass('fa-expand').removeClass('fa-compress');
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (element.msCancelFullscreen) {
      element.msCancelFullscreen();
    }
  }
}
//end case functions
