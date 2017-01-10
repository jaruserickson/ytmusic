document.onreadystatechange = function () {
    var state = document.readyState
    if (state == 'interactive') {
        //do nothing
    }else if (state == 'complete') {
        setTimeout(function(){
            $("#load").fadeOut();
            $("#main").fadeIn();
        })
    }
}
