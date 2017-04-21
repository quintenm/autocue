$(function() {
  "use strict";
  //start GLOBAL
  var getURLToken = getQueryVariable("room"),
  b;
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
    }else if(u == "#uploadpage"){
      $(".uploadpage").show();
    }else if(u == "#uploadClose"){
      $(".uploadpage").hide();
    }else if(u == "#writerScreenInfo"){
      $(".writerScreenInfo").show();
      $("html").addClass("no-scroll");
    }else if(u == "#writerScreenInfoClose"){
      $(".writerScreenInfo").hide();
      $("html").removeClass("no-scroll");
    }else if(u == "#uploadButton"){
      if (!window.FileReader) {
          alert('Your browser is not supported')
      }
      var input = $('#file').get(0);

      // Create a reader object
      var reader = new FileReader();
      if (input.files.length) {
          var textFile = input.files[0];
          reader.readAsText(textFile);
          $(reader).on('load', processFile);
          $(".uploadpage").hide();
      } else {
          alert('Please upload a file before continuing')
      }
    }else if(u == "#downloadButton"){
      download('DigitalAutocue',collectAndPullText());
    } else {
      console.log(u + ": There was a button that won't work, Report to the developer");
      alert(u + ": Report to developer");
    }
  });
  //start down and upload
  function download(filename, text)
  {
    var d = new Date();
    filename = filename + "_" + d.toLocaleDateString() + "_" + d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds() + ".txt";
    var element = document.createElement("a");
    element.setAttribute('href', "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    element.setAttribute('download',filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
  }
  function collectAndPullText(){
    var text = "", container;
    container = document.getElementById('messageWriter').getElementsByTagName('p');
    for (var i = 2, len = container.length; i < len; i++)
    {
      text += container[i].innerHTML + "\n";
    }
    return text;
  }
  function processFile(e) {
      var file = e.target.result,
          results;
      if (file && file.length) {
          results = file.split("\n");
          for (index = 0, len = results.length; index < len; ++index) {
            socket.emit('chat message', { room: room, msg: results[index]});
          }
      }
  }
  // end down and upload
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

      $('#inputForm').submit(function() {
        socket.emit('chat message', { room: room, msg: $('#m').val()});
        $('#m').val('');
        return false;
      });
      socket.on('chat message', function(msg) {
        console.log(msg);
        $('.messagesWrite').append('<div><p contenteditable="false">'+ msg +'</p></div>');//contenteditable will be soon true, so you can edit later.
        $('#m').focus();// inputfield
      });
      socket.on('controlls', function(msg, msgextra) {
        if(msg == "alert")
        {
          $('.alert-text').text('There is a problem reported');
          $('.alert').show();
        }else{
          console.log(msgextra + ": Unknown error in width controlls, report to developer");
        }
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
