
  var player;
  function onYouTubeIframeAPIReady(pID) {

    var ctrlq = document.getElementById("youtube-audio");
    ctrlq.innerHTML = '<img id="youtube-icon" src=""/><div id="youtube-player"></div>';
    ctrlq.style.cssText = 'width:150px;margin:2em auto;cursor:pointer;cursor:hand;display:none';
    ctrlq.onclick = toggleAudio;

    player = new YT.Player('youtube-player', {
      height: '225',
      width: '400',
      playerVars: {
        listType:'playlist',
        list: pID
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
    player.setPlaybackQuality("small");
    document.getElementById("youtube-audio").style.display = "block";
    togglePlayButton(player.getPlayerState() !== 5);
  }

  function onPlayerStateChange(event) {
    if (event.data === 0) {
      togglePlayButton(false);
    }
  }
