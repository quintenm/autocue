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
    } else {
      alert(a);
    }
  });
  $("#options-button").click(function(e){
    e.preventDefault();
    $('#options-list').slideToggle();
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
