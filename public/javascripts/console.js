/**
 * Created by yohann on 28/09/2016.
 */

function blinkingCursor() { // blinking cursor
    var cont = $("#cursor");
    if (cont.text().substring(cont.text().length - 1, cont.text().length) == "|") // if last char is the cursor
        $("#cursor").html($("#cursor").html().substring(0, cont.length - 1)); // remove it
    else
        cont.text(cont.text() + "|")// else write it
}

var br = 0;
function write(value, color) {

    var str = String.fromCharCode(value.which);
    var $console = $("#console");
    var cont = $("#cursor");
    if (cont.text().substring(cont.text().length - 1, cont.text().length) == "|") // if last char is the cursor
        $("#cursor").html($("#cursor").html().substring(0, cont.length - 1)); // remove it
    $console.html($console.html() + "<br>");
     $console.text(($console.text() + str));
    $console.html($console.html() + "<span id='cursor'>|</span>");
    console.log(str);
}


$(document).keypress(function (e) {
    switch (e.which) {
        case 13:
            execute(""); //TODO put the stored command as parameter
            break;
        //TODO add \r case here
        default:
    }
    write(e);
});
setInterval(blinkingCursor, 1000);
