$(function() {
  var arrAnimals = ["ant","bird"," cat","chicken","cow","dog","elephant","fish","fox","horse","kangaroo","lion","monkey","penguin","pig","rabbit","sheep","tiger","whale","wolf","zebra"],
      a,b,
      readerTimerScroll = true,
      readerScrollTop = 0,
      scrollSpeed = 100, //snelheid voor scrollen bij readerStyle-Two
      readerScrollAutoDown = 0;

  function token() {
    if(localStorage.getItem("token170103") != false)
    {
      b = localStorage.getItem('token170103');
      return b;
    }else{
  	  var randAnimal = arrAnimals[Math.floor(Math.random() * arrAnimals.length)].toLowerCase();
      var number = Math.floor(Math.random() * 1000) + 1;
  	  return randAnimal +""+ number;
    }
  }
  $('#room').val(token);
  if(localStorage.getItem("design170103") !== null || localStorage.getItem("design170103") != null)
  {
    a = localStorage.getItem('design170103');
    $("body").removeAttr('class').addClass(a);
  }
  $("button.sectionNavigation").click(function(e){
    e.preventDefault();
    u = $(this).attr('href');
    b = $("#room").val();
    if(u == "#readerScreen"|| u == "#writerScreen" || u == "#firstScreen")
    {
      $("#firstScreen,#readerScreen,#writerScreen").addClass('hidden');
      $(u).removeClass('hidden');
    }
    if(u == "#readerScreen"){
      $('#varCss').attr('href', 'css/reader.min.css');
    }else if(u== "#writerScreen"){
      $('#varCss').attr('href', 'css/writer.min.css');
    }else if(u== "#firstScreen"){
      $('#varCss').attr('href', 'css/main.min.css');
    }else if(u == "#save"){
      a = $("body").attr('class');
      localStorage.setItem('design170103', a);
      localStorage.setItem('token170103', b);
    }else if(u == "#reset"){
      $("body").removeAttr('class').addClass('font-color-primary background-color-primary font-family-secundary readerStyle-One');
      a = $("body").attr('class');
      localStorage.setItem('design170103', a);
      localStorage.setItem('token170103', "");
    }else if(u == "#alertClose"){
      $(".alert").hide();
    }else if(u == "#uploadpage"){
      $(".uploadpage").show();
    }else if(u == "#uploadClose"){
      $(".uploadpage").hide();
    }else if(u == "#readerScreenInfo"){
      $(".readerScreenInfo").show();
    }else if(u == "#readerScreenInfoClose"){
      $(".readerScreenInfo").hide();
    }else if(u == "#writerScreenInfo"){
      $(".writerScreenInfo").show();
    }else if(u == "#writerScreenInfoClose"){
      $(".writerScreenInfo").hide();
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
    } else {
      console.log(u + ": Report to developer");
      alert(u + ": Report to developer");
    }
  });
  function processFile(e) {
      var file = e.target.result,
          results;
      if (file && file.length) {
          results = file.split("\n");
          for (index = 0, len = results.length; index < len; ++index) {
            socket.emit('chat message', { room: room, msg: results[index]});
          }
          //$('#name').val(results[0]);
          //$('#age').val(results[1]);
      }
  }

  $('.navigation').click(function(e){
    if($(this).hasClass('previous')){
      $('.part2,.navigation.previous').addClass('hidden');
      $('.part1,.navigation.next').removeClass('hidden');
    }else if($(this).hasClass('next')){
      $('.part1,.navigation.next').addClass('hidden');
      $('.part2,.navigation.previous').removeClass('hidden');
    }
  });
  $("#options-button").click(function(e){
    e.preventDefault();
    $('#help-list').hide();
    $('#options-list').slideToggle();
  });
  $("#help-button").click(function(e){
    e.preventDefault();
    $('#options-list').hide();
    $('#help-list').slideToggle();
  });
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
    }
    $('body').addClass(a);
  });
  $('#createRoom').click(function(){

  });
  var readPosition = 0;
  $(document).keydown(function(e) {
    //Alert
    if(!$('#readerScreen').hasClass("hidden")){
      e.preventDefault();
      switch(e.which) {
          //alert
          case 13: // return
            $('.alert-text').text('There is a problem reported');
            $('.alert').show();
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
            $("body").animate({ scrollTop: ($('.messagesRead').height() / $(".messagesRead div").length) * readPosition }, 'fast');
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
            $("body").animate({ scrollTop: ($('.messagesRead').height() / $(".messagesRead div").length) * readPosition }, 'fast');
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
            $("body").animate({ scrollTop: ($('.messagesRead').height() / $(".messagesRead div").length) * readPosition }, 'fast');
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
            $("body").animate({ scrollTop: ($('.messagesRead').height() / $(".messagesRead div").length) * readPosition }, 'fast');
          break;

          case 32: // spacebar
          readerScrollTop = $(window).scrollTop();
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
                  $("body").animate({ scrollTop: readerScrollTop }, 300, 'linear');
                }, 300);
            } else if(readerTimerScroll == false){
              readerTimerScroll = true;
              clearInterval(readerScrollAutoDown);
            }

          default: return; // exit this handler for other keys
      }
    }
  });

var socket = io.connect();
    var socket = io();
    var room = $('#room').val();

    socket.on('connect', function() {
      // Connected, let's sign-up for to receive messages for this room
      socket.emit('room', room);
    });

    $('#inputForm').submit(function() {
      socket.emit('chat message', { room: room, msg: $('#m').val()});
      $('#m').val('');
      return false;
    });
    socket.on('chat message', function(msg) {
      $('.messagesWrite').append('<div><p contenteditable="true">'+ msg +'</p></div>');
      $('.messagesRead').append('<div><p>'+ msg +'</p></div>');
      $('#m').focus();
    });
    $('#createRoom').click(function(e){
      e.preventDefault();

      var roomId = $('#room').val();
      socket.emit('room',roomId);
      $('.alert-text').text('Room has been created');
      $('.alert').show();

    });

});
