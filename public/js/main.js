$(function() {
  if(localStorage.getItem("styles") !== null || localStorage.getItem("styles") != null)
  {
    var a = localStorage.getItem('styles');
    $("body").removeAttr('class').addClass(a);
  }
  $("button.sectionNavigation").click(function(e){
    e.preventDefault();
    var a = $(this).attr('href');
    if(a == "#readerScreen"|| a == "#writerScreen" || a == "#firstScreen")
    {
      $("#firstScreen,#readerScreen,#writerScreen").addClass('hidden');
      $(a).removeClass('hidden');
    }
    if(a == "#readerScreen"){
      $('#varCss').attr('href', 'css/reader.min.css');
    }else if(a== "#writerScreen"){
      $('#varCss').attr('href', 'css/writer.min.css');
      $//('#m').focus();
    }else if(a== "#firstScreen"){
      $('#varCss').attr('href', 'css/main.min.css');
    }else if(a == "#save"){
      var a = $("body").attr('class');
      localStorage.setItem('styles', a);
    }else if(a == "#reset"){
      $("body").removeAttr('class').addClass('font-color-primary background-color-primary font-family-secundary');
    }else if(a == "#alertClose"){
      $(".alert").hide();
    } else {
      alert(a + ": Report to developer");
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
    }
    $('body').addClass(a);
  });
  var readPosition = 0;
  $(document).keydown(function(e) {
    if(!$('#readerScreen').hasClass("hidden")){
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

          case 13: // return
            $('.alert').show();
          break;

          default: return; // exit this handler for other keys
      }
    }
  });

    var socket = io();
    $('form').submit(function() {
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });
    socket.on('chat message', function(msg) {
      $('.messagesWrite').append('<div><p contenteditable="true">'+ msg +'</p></div>');
      $('.messagesRead').append('<div><p>'+ msg +'</p></div>');
      $('#m').focus();
    });

});
