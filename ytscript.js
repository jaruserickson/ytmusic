
  var player;
  function onYouTubeIframeAPIReady(pID) {

    var ctrlq = document.getElementById("youtube-audio");
    ctrlq.innerHTML = '<img id="youtube-icon" src="img/ic_pause_black_48dp.png"/><div id="youtube-player"></div>';
    ctrlq.style.cssText = 'width:150px;margin:2em auto;cursor:pointer;cursor:hand;display:none';
    ctrlq.onclick = toggleAudio;
    var w = window.innerWidth;
    var h = window.innerHeight;
    player = new YT.Player('youtube-player', {
      height: h,
      width: w,
      playerVars: {
        listType:'playlist',
        list: pID,
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        showinfo: 0
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }

  function togglePlayButton(play) {
    document.getElementById("youtube-icon").src = play ? "img/ic_pause_black_48dp.png" : "img/ic_play_arrow_black_48dp.png";
  }

  function toggleAudio() {
    if ( player.getPlayerState() == 1 || player.getPlayerState() == 3 ) {
      player.pauseVideo();
      togglePlayButton(false);
    } else {
      player.playVideo();
      togglePlayButton(true);
    }
  }

  function onPlayerReady(event) {
    player.setPlaybackQuality("large");
    document.getElementById("youtube-audio").style.display = "block";
    togglePlayButton(player.getPlayerState() !== 5);
  }

  function onPlayerStateChange(event) {
    if (event.data === 0) {
      togglePlayButton(false);
    }
    if (player.getPlayerState() == 1) {
        document.getElementById("subtext").innerText = player.getVideoData().title;
    }
  }
