$(function() {
  $("#firstScreen a").click(function(e){
    e.preventDefault();
    var a = $(this).attr('href');
    $("#firstScreen,#readerScreen,#writerScreen").addClass('hidden');
    $(a).removeClass('hidden');
    if(a == "#readerScreen"){
      $('head').append('<link rel="stylesheet" href="css/reader.min.css" media="screen" title="no title">');
    }else if(a== "#writerScreen"){
      $('head').append('<link rel="stylesheet" href="css/writer.min.css" media="screen" title="no title">');
      $('#m').focus();
    } else {
      alert(a);
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
