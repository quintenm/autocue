var fbAppId = '146198745974205',
    reloadInterval = 10 * 1000,
    lastReloadTime,
    countdownTime;
$(function() {
  "use strict";

  applyConfig(loadConfig());

  countdownTime = $('.countdown');
    $('.reactionGroup').hide();
    onFrame();

    applyConfig(loadConfig());

    countdownTime.click(function() {
      refresh();
    });

    $('[data-action="login"]').click(function() {
      FB.login(function(res) {
        location.reload();
      }, {
        scope: 'user_photos,user_videos'
      });
    });
    FB.getLoginStatus(function(res) {
    if (res.status !== 'connected') {
      $('.login').show();
      $('.comments').hide();
      return;
    }
    $('.comments').show();
    refresh();
  });

  //end GLOBAL
  $("button.sectionNavigation").click(function(e){
    e.preventDefault();
    var u = $(this).attr('href');
    var b = $("#room").val();
    if(u== "#firstScreen"){
      document.location.href="/";
    } else if (u == "#alertClose"){
      $(".alert").hide();
    } else if (u == "#uploadpage"){
      $(".uploadpage").show();
    } else if (u == "#uploadClose"){
      $(".uploadpage").hide();
    } else if (u == "#writerScreenInfo"){
      $(".writerScreenInfo").show();
      $("html").addClass("no-scroll");
    } else if (u == "#writerScreenInfoClose"){
      $(".writerScreenInfo").hide();
      $("html").removeClass("no-scroll");
    } else if (u == "#facebookLiveButton"){
      $('.editContainer').toggleClass('FacebookscreenVisible');
      $(".facebookLiveScreen,.facebookClose").toggle();
    } else if (u == "#uploadButton"){
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
    } else if (u == "#downloadButton"){
      download('DigitalAutocue',collectAndPullText());
    } else if (u == "#fullscreen") {
      setConfigItem('fullscreen', !loadConfig().fullscreen);
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
      if(localStorage.config !== null && localStorage.config != "")
      {
        room = loadConfig().room;
      }else {
        document.location.href="/";
      }

      socket.on('connect', function() {
        // Connected, let's sign-up for to receive messages for this room
        console.log("writer: " + room);
        socket.emit('room', room);
      });
      $('#m').bind('keypress', function(e) {
        if ((e.keyCode || e.which) == 13) {
          $(this).parents('form').submit();
          return false;
        }
      });
      $('#inputForm').submit(function(e) {
        socket.emit('chat message', { room: room, msg: $('#m').val()});
        $('#m').val('');
        return false;
      });
      socket.on('chat message', function(msg) {
        console.log("Successfully send: " + msg);
        $('.messagesWrite').append('<div><p contenteditable="false">'+ msg +'</p></div>');//contenteditable will be soon true, so you can edit later.
        $('#m').focus();// inputfield
        document.body.scrollIntoView(false);
      });
      socket.on('controlls', function(msg, msgextra) {
        if(msg == "alert")
        {
          $('.alert-text').text('There is a problem reported');
          $('.alert').show();
        }else{
          console.log(msgextra + ": Unknown error in controlls, report to developer");
        }
      });
  // end socket
});
// Application
if (!fbAppId) {
  alert('You must set a Facebook Graph API app ID in js/main.js to use this application.');
}
// Promisify FB.api(), for easier use
function fbApi(path, method, params, callback) {
  return jQuery.Deferred(function(dfd) {
    if (callback) {
      dfd.then(callback);
    }
    FB.api(path, method, params, function(res) {
      if (!res || res.error) {
        return dfd.reject(res.error || res);
      }
      dfd.resolve(res);
    });
  }).promise();
}

// Get the most recent (which should be the current) live video for the connected user
function getLastLiveVideo() {
  return fbApi(
    '/me/live_videos',
    'get', {
      broadcast_status: ['LIVE'],
      limit: 1
    }
  ).then(function(videoRes) {
    if (!videoRes.data || !videoRes.data[0]) {
      throw new Error('No live videos found.');
    }

    // Use the first video.  Due to server-side sort, this should be the most recent.
    return videoRes.data[0];
  });
}

// Get current comments for a given video ID, sorted from newest to oldest
function getComments(id) {
  return fbApi(
    '/' + encodeURIComponent(id) + '/comments',
    'get', {
      order: 'reverse_chronological'
    }
  ).then(function(commentRes) {
    if (!commentRes || !commentRes.data || !commentRes.data.length) {
      throw new Error('No recent comments.');
    }
    return commentRes.data;
  });
}

// Get reactions (wow, haha, like, etc.) for a given video ID, and count them
function getReactions(id) {
  return fbApi(
    '/' + encodeURIComponent(id) + '/reactions',
    'get'
  ).then(function(reactionRes) {
    var reactions = {
      // For testing... uncomment these
      /*
      like: 1337,
      love: 8088,
      haha: 303,
      wow: 808,
      sad: 2,
      angry: 1
      */
    };

    if (!reactionRes || !reactionRes.data || !reactionRes.data.length) {
      return reactions;
    }

    reactionRes.data.forEach(function(reaction) {
      reaction.type = reaction.type.toLowerCase();
      reactions[reaction.type] = reactions[reaction.type] || 0;
      reactions[reaction.type]++;
    });

    return reactions;
  });
}

function refresh() {
  countdownTime.removeAttr('value');
  lastReloadTime = null;

  return getLastLiveVideo().then(function(video) {
    // Merge video with comments and reactions
    return $.when(
      getComments(video.id),
      getReactions(video.id)
    ).then(function(comments, reactions) {
      video.comments = comments;
      video.reactions = reactions;
      return video;
    });

  }).then(function(video) {
    $('.comments').empty();
    video.comments.forEach(function(comment) {
      $('.comments').append(
        $('<div class="comment"></div>').append(
          $('<h2 class="name">').text(comment.from.name),
          $('<p class="time"></p>').text(
            Math.floor(
              (new Date() - new Date(comment.created_time)) / 1000 / 60
            ) + ' min. ago'
          ),
          $('<p></p>').text(comment.message)
        )
      );
    });

    $('.reactionGroup').hide();
    Object.keys(video.reactions).forEach(function(key) {
      $('.reactionGroup.' + key).show();
      $('.reactionGroup.' + key).find('.count').text(video.reactions[key].toLocaleString());
    });

  })
  // .catch(function(err) {
  //   $('.comments')
  //     .empty()
  //     .append($('<p class="error comment"></p>').text(err.message || err.toString()));
  //
  // })
  .always(function() {
    lastReloadTime = new Date();
  });

}

function onFrame() {
  requestAnimationFrame(onFrame);
  if (!lastReloadTime) {
    return;
  }
  var timeLeft = (reloadInterval - (new Date() - lastReloadTime));
  if (timeLeft <= 0) {
    refresh();
    return;
  }
  countdownTime.attr('max', reloadInterval).val(timeLeft);
}

FB.init({
  appId: fbAppId,
  version: 'v2.7',
  status: true
});

function loadConfig() {
  if (!localStorage.config) {
    document.location.href="/";
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
  // $('#room,#defaultRoomName').val(config.room);
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
}
function getURLQuery(variable)
{
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i=0;i<vars.length;i++){
    var pair = vars[i].split("=");
    if(pair[0] == variable){return pair[1];}
  }
  return(false);
}
// start case functions
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
// end case functions
