$(function() {
  "use strict";
  var arrAnimals = ["ant","bird"," cat","chicken","cow","dog","elephant","fish","fox","horse","kangaroo","lion","monkey","penguin","pig","rabbit","sheep","tiger","whale","wolf","zebra"],
      a,b,u,
      readerTimerScroll = true,
      readerScrollTop = 0,
      scrollSpeed = 100, //scroll speed readerStyle-Two
      readerScrollAutoDown = 0,
      getURLToken,// check if url contains variable room (get)
      defaultRoomName = ""; //  CUSTOMIZE: set a default roomname.
  function token() {
    // 1. check if url containts variable room (get)
    getURLToken = getQueryVariable("room")
    if(getURLToken == false)
    {
      // 2. check if localStorage token170103 exists
      if(localStorage.getItem("token170103") !== null && localStorage.getItem("token170103") != "")
      {
        b = localStorage.getItem('token170103');
        localStorage.setItem('room170103', b);
        return b;
      }else{
        // 3. Generate a custom token
        if(defaultRoomName == ""){
          var randAnimal = arrAnimals[Math.floor(Math.random() * arrAnimals.length)].toLowerCase();
          var number = Math.floor(Math.random() * 1000) + 1;
          var room = randAnimal + "" + number;
          localStorage.setItem('room170103', room);
      	  return room;
        }else {
          localStorage.setItem('room170103', defaultRoomName);
      	  return defaultRoomName;
        }

      }
    }else {
      // Set token with the get from url
      localStorage.setItem('room170103', getURLToken);
      return getURLToken;
    }
  }
  function getQueryVariable(variable)
  {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i=0;i<vars.length;i++){
      var pair = vars[i].split("=");
      if(pair[0] == variable){return pair[1];}
    }
    return(false);
  }
  var roomByStartup = token();
  $('#room,#defaultRoomName').val(roomByStartup);
  //start GLOBAL
  if(localStorage.getItem("design170103") !== null || localStorage.getItem("design170103") != null)
  {
    a = localStorage.getItem('design170103');
    $("body").removeAttr('class').addClass(a);
  }
  //end GLOBAL
  // button.sectionNavigation begin
  $("button.sectionNavigation").click(function(e){
    e.preventDefault();
    u = $(this).attr('href');
    b = $("#room").val();

    if(u == "#reader"){
      document.location.href="/reader/";
    }else if(u== "#writer"){
      document.location.href="/writer/";
    }else if(u== "#firstScreen"){
      }else if(u == "#save"){
        a = $("body").attr('class');
        localStorage.setItem('design170103', a);
        localStorage.setItem('token170103', b);
      }else if(u == "#reset"){
        $("body").removeAttr('class').addClass('font-color-primary background-color-primary font-family-secundary readerStyle-One text-weight-regular text-transform-normal');
        a = $("body").attr('class');
        localStorage.setItem('design170103', a);
        localStorage.setItem('token170103', "");
      }else if(u == "#alertClose"){
        $(".alert").hide();
      }else if(u == "#mainScreenOptions"){
        $(".mainScreenOptions").show();
        $("html").addClass("no-scroll");
      }else if(u == "#mainScreenOptionsClose"){
        $(".mainScreenOptions").hide();
        $("html").removeClass("no-scroll");
      }else if(u == "#mainScreenHelp"){
        $(".mainScreenHelp").show();
        $("html").addClass("no-scroll");
      }else if(u == "#mainScreenHelpClose"){
        $(".mainScreenHelp").hide();
        $("html").removeClass("no-scroll");
      }else if(u == "#mainScreenPrevious"){
        $('.part2').addClass('hidden');
        $('.part1').removeClass('hidden');
      }else if(u == "#mainScreenNext"){
        $('.part1').addClass('hidden');
        $('.part2').removeClass('hidden');
      }else{
      console.log(u + ": There was a button that won't work, Report to the developer");
      alert(u + ": Report to developer");
    }
  });
  // button.sectionNavigation end
  // start settings config
  $(".dropdown-content a").click(function(e){
    e.preventDefault();
    var a = $(this).data('href');
    if (a.match("^font-color-*")) {
      $("body[class*='font-color-']").removeClass (function (index, css) {
         return (css.match (/(^|\s)font-color-\S+/g) || []).join(' ');
      });
    }else if (a.match("^background-color-*")) {
      $("body[class*='background-color-']").removeClass (function (index, css) {
         return (css.match (/(^|\s)background-color-\S+/g) || []).join(' ');
      });
    }else if (a.match("^font-family-*")) {
      $("body[class*='font-family-']").removeClass (function (index, css) {
         return (css.match (/(^|\s)font-family-\S+/g) || []).join(' ');
      });
    }else if (a.match("^readerStyle-*")) {
      $("body[class*='readerStyle-']").removeClass (function (index, css) {
         return (css.match (/(^|\s)readerStyle-\S+/g) || []).join(' ');
      });
    }else if (a.match("^text-weight-*")) {
      $("body[class*='text-weight-']").removeClass (function (index, css) {
         return (css.match (/(^|\s)text-weight-\S+/g) || []).join(' ');
      });
    }else if (a.match("^text-transform-*")) {
      $("body[class*='text-transform-']").removeClass (function (index, css) {
         return (css.match (/(^|\s)text-transform-\S+/g) || []).join(' ');
      });
    }
    $('body').addClass(a);
  });
  // end settings config
  // start create room
  $('#createRoom, #arrow-right').click(function(e){
    e.preventDefault();
    var roomId = $('#room').val();
    var roomByStartup = $('#defaultRoomName').val();
    localStorage.setItem('room170103', roomId);
    $('#defaultRoomName').val(roomId);
    $('.alert-text').text('Room has been created');
    $('.alert').show();
  });
  // end create room
});
// start case functions
function launchFullscreen(element) {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||
  (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    $('.fullscreen').addClass('compress').removeClass('expand');
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }else{
    $('.fullscreen').addClass('expand').removeClass('compress');
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if(element.msCancelFullscreen) {
      element.msCancelFullscreen();
    }
  }
}
// end case functions
