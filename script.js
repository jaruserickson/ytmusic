$("#profile").hide();

function keyData(x){
    if (x && x.keyCode === 13){
        if (document.getElementById("channel").value != ""){
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

    var channelName = document.getElementById("channel").value;

    //get profile data
    $.get(
        "https://www.googleapis.com/youtube/v3/channels",{
            part: 'snippet',
            forUsername: channelName,
            key: 'AIzaSyDQsKfmF5Jy8XUat__SPdqw034lV9MuZAI'},
            //AIzaSyAu0wr25RZ-EwESsvpo4FW3Dib9-_OQ0LY for online
            function(data){
                $.each(data.items, function(i, item) {
                    console.log(item);
                    profilePicURL = item.snippet.thumbnails.high.url;
                    profileName = item.snippet.title;
                    profileDesc = item.snippet.description;
                    console.log(profilePicURL);

                    $("#profile").append('<img id="avatar" src="' + profilePicURL + '"/>')
                })
            }
    );
    $.get(
        "https://www.googleapis.com/youtube/v3/channels",{
            part: 'snippet',
            forUsername: channelName,
            key: 'AIzaSyDQsKfmF5Jy8XUat__SPdqw034lV9MuZAI'},
            //AIzaSyAu0wr25RZ-EwESsvpo4FW3Dib9-_OQ0LY for online
            function(data){
                $.each(data.items, function(i, item) {
                    console.log(item);
                    profilePicURL = item.snippet.thumbnails.high.url;
                    profileName = item.snippet.title;
                    profileDesc = item.snippet.description;
                    console.log(profilePicURL);

                    $("#profile").append('<img id="avatar" src="' + profilePicURL + '"/>')
                })
            }
    );
    //document.getElementById("return").innerHTML = x;
}

function getVids(upID) {
    $.get(
        "https://www.googleapis.com/youtube/v3/playlistItems",{
            part: 'snippet',
            maxResults: 10,
            playlistId: upID,
            key: 'AIzaSyDQsKfmF5Jy8XUat__SPdqw034lV9MuZAI'},
            //AIzaSyAu0wr25RZ-EwESsvpo4FW3Dib9-_OQ0LY for online
            function(data){
                var output;
                $.each(data.items, function(i, item) {
                    console.log(item);
                    vidTitle = item.snippet.title;

                    output = '<li>' + vidTitle + '</li>';

                    $("#results").append(output);
                })
            }
    );
}
