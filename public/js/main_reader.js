$(function() {
  "use strict";
  //start GLOBAL
  var getURLToken = getQueryVariable("room")
  if(getURLToken == false)
  {
    if(localStorage.getItem("design170103") !== null || localStorage.getItem("design170103") != null)
    {
      a = localStorage.getItem('design170103');
      $("body").removeAttr('class').addClass(a);
    }
  }else {
    // Set token with the get from url
    localStorage.setItem('room170103', getURLToken);
    return getURLToken;
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
  //end GLOBAL
  $("button.sectionNavigation").click(function(e){
    e.preventDefault();
    u = $(this).attr('href');
    b = $("#room").val();
    if(u== "#firstScreen"){
      document.location.href="/";
    }else if(u == "#alertClose"){
      $(".alert").hide();
    }else if(u == "#readerScreenInfo"){
      $(".readerScreenInfo").show();
      $("html").addClass("no-scroll");
    }else if(u == "#readerScreenInfoClose"){
      $(".readerScreenInfo").hide();
      $("html").removeClass("no-scroll");
    }else{
      console.log(u + ": There was a button that won't work, Report to the developer");
      alert(u + ": Report to developer");
    }
  });
  // start navigate in scroll
  var readPosition = 0;
  $(document).keydown(function(e) {
    //Alert
    if(!$('#readerScreen').hasClass("hidden")){
      e.preventDefault();
      switch(e.which) {
          //alert
          case 13: // return
            socket.emit('controlls', { room: room, msg: "alert",msgextra: null});
          break;
      }
    }
    //readerStyle-One
    if(!$('#readerScreen').hasClass("hidden") && $("body").hasClass("readerStyle-One")){
      e.preventDefault();
      switch(e.which) {
          case 65: // character a
          case 81: // character q
          case 70: // character f
          case 37: // left
          case 38: // up
            if(readPosition != "0"){
              readPosition--;
            }
            socket.emit('controlls', { room: room, msg: "position",msgextra: readPosition});
          break;

          case 69: // character e
          case 68: // character d
          case 74: // character j
          case 39: // right
          case 40: // down
          case 32: // spacebar
            if(readPosition != ($(".messagesRead div").length - 1)){
              readPosition++;
            }
            socket.emit('controlls', { room: room, msg: "position",msgextra: readPosition});
          break;
          default: return; // exit this handler for other keys
      }
    }
    //readerStyle-Two
    else if(!$('#readerScreen').hasClass("hidden") && $("body").hasClass("readerStyle-Two")){
      e.preventDefault();
      switch(e.which) {
          //up
          case 65: // character a
          case 81: // character q
          case 70: // character f
          case 37: // left
          case 38: // up
            if(readPosition != "0"){
              readPosition--;
            }
            socket.emit('controlls', { room: room, msg: "position",msgextra: readPosition});
          break;
          //down
          case 69: // character e
          case 68: // character d
          case 74: // character j
          case 39: // right
          case 40: // down
            if(readPosition != ($(".messagesRead div").length - 1)){
              readPosition++;
            }
            socket.emit('controlls', { room: room, msg: "position",msgextra: readPosition});
          break;
          case 32: // spacebar
          //hier
          readerScrollTop = $(window).scrollTop();
          socket.emit('controlls', { room: room, msg: "positionscrollauto",msgextra: readerScrollTop});
          default: return; // exit this handler for other keys
      }
    }
  });
  // end navigate in scroll
  // start socket
  var socket = io.connect();
      var socket = io();
      var room;
      if(localStorage.getItem("room170103") !== null && localStorage.getItem("room170103") != "")
      {
        room = localStorage.getItem("room170103");
      }else {
        document.location.href="/";
      }

      socket.on('connect', function() {
        // Connected, let's sign-up for to receive messages for this room
        console.log("writer: " + room);
        socket.emit('room', room);
      });

      socket.on('chat message', function(msg) {
        console.log(msg);
        $('.messagesRead').append('<div><p>'+ msg +'</p></div>');
      });
      socket.on('controlls', function(msg, msgextra) {
        if(msg == "alert")
        {
          $('.alert-text').text('There is a problem reported');
          $('.alert').show();
        }else if(msg =="position"){
          $("body").animate({ scrollTop: ($('.messagesRead').height() / $(".messagesRead div").length) * msgextra }, 'fast');
        }else if(msg =="positionscrollauto"){
          var readerScrollTop = msgextra;
          if (readerTimerScroll == true){
            readerTimerScroll = false;
            readerScrollAutoDown =
              setInterval(function () {
                readerScrollTop += scrollSpeed;
                if($(window).scrollTop() + $(window).height() > $(document).height() - 500){
                  clearInterval(readerScrollAutoDown);
                  $('.alert-text').text('End of cue');
                  $('.alert').show();
                }
                $("body").animate({ scrollTop: readerScrollTop }, 700, 'linear');
              }, 300);
          } else if(readerTimerScroll == false){
            readerTimerScroll = true;
            clearInterval(readerScrollAutoDown);
          }
        }else {
          console.log(msgextra + ": Unknown error in width controlls, report to developer")
        }
      });
      $('#createRoom, #arrow-right').click(function(e){
        e.preventDefault();
        var roomId = $('#room').val();
        socket.emit('room', roomId);
        $('#defaultRoomName').val(roomId);
        $('.alert-text').text('Room has been created');
        $('.alert').show();
      });
  // end socket
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
