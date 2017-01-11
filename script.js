//global variables
var channelName;

function keyData(x){
    if (x && x.keyCode === 13){
        if (document.getElementById("channel").value != "" && document.getElementById("channel").value.length > 2){
            submit();
        }
        return x.keyCode != 13;
    }
}

function submit() {
    //animations
    $("#main").addClass("animated fadeOutUp");
    $("#main").hide();
    $("#profile").fadeIn();
    $("#profile").addClass("animated fadeInUp");

    channelName = document.getElementById("channel").value;

    //get profile data
    $.get(
        "https://www.googleapis.com/youtube/v3/channels",{
            part: 'snippet',
            forUsername: channelName,
            key: 'AIzaSyDQsKfmF5Jy8XUat__SPdqw034lV9MuZAI'},
            function(data){
                $.each(data.items, function(i, item) {
                    profilePicURL = item.snippet.thumbnails.high.url;
                    profileName = item.snippet.title;

                    $("#profile").append('<a href="https://youtube.com/' + channelName + '"><img id="avatar" src="' + profilePicURL + '"/></a>');
                    $("#profile").append('<h1 id="title">' + profileName + '</h1>');
                    //creates background and play button
                    $.get(
                        "https://www.googleapis.com/youtube/v3/channels",{
                            part: 'brandingSettings',
                            forUsername: channelName,
                            key: 'AIzaSyDQsKfmF5Jy8XUat__SPdqw034lV9MuZAI'},
                            function(data){
                                $.each(data.items, function(i, item) {
                                    profileBannerURL = item.brandingSettings.image.bannerImageUrl;

                                    //css for background image has to be done here?
                                    $("#profile").css("background", "linear-gradient(rgba(255, 255, 255, 0.6),rgba(255, 255, 255, 0.6)), url(" + profileBannerURL + ")");
                                    $("#profile").css("background-repeat", "no-repeat");
                                    $("#profile").css("background-position", "center");
                                    $("#profile").css("background-size", "auto 100%");
                                    $("#profile").append('<a id="clicker" onclick="playAll()"><img id="play" src="img/ic_play_circle_filled_black_48dp.png"/></a><h3 id="subtext">play all</h3>');
                                })
                            }
                    );
                })
            }
    );

}

function playAll() {
    //when this is run i want to get rid of the play all button, in its place put
    //current video title and time
    //also do the rest
    console.log("playing");
    //gets uploads playlist and creates player
    document.getElementById("clicker").onclick = null;
    document.getElementById("subtext").innerText = "...";
    $("#clicker").css("cursor", "default");
    $("#play").fadeTo(300, 0.000001);
    $("#subtext").animate({marginTop: '-40px', marginLeft: '53px'}, 1000);


    $.get(
        "https://www.googleapis.com/youtube/v3/channels",{
            part: 'contentDetails',
            forUsername: channelName,
            key: 'AIzaSyDQsKfmF5Jy8XUat__SPdqw034lV9MuZAI'},
            function(data){
                $.each(data.items, function(i, item){
                    console.log(item);
                    uploadsID = item.contentDetails.relatedPlaylists.uploads;
                    getVids(uploadsID);
                    onYouTubeIframeAPIReady(uploadsID);
                    $("#footer").addClass("new-item");
                    $("#player").fadeIn();
                })
            }
    );
}
//get uploads playlistItems
//add the div which has video thumbnails as album titles
//add the fixed div at the bottom for audio player

function getVids(upID) {
    //gets video data by bounds of the API call
    $.get(
        "https://www.googleapis.com/youtube/v3/playlistItems",{
            part: 'snippet',
            maxResults: 10, //should make a further api call when needed.
            playlistId: upID,
            key: 'AIzaSyDQsKfmF5Jy8XUat__SPdqw034lV9MuZAI'},
            function(data){
                var output;
                $.each(data.items, function(i, item) {
                    console.log(item);
                    vidTitle = item.snippet.title;
                    vidThumbnailURL = item.snippet.thumbnails.maxres.url;
                    vidId = item.snippet.resourceId.videoId;

                    output = '<li>' + vidTitle + '</li>';
                })
            }
    );
}
