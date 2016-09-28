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

function write(str, color) {

    var $console = $("#console");
    var cont = $("#cursor");
    if (cont.text().substring(cont.text().length - 1, cont.text().length) == "|") // if last char is the cursor
        $("#cursor").html($("#cursor").html().substring(0, cont.length - 1)); // remove it
    if (str != "\n")
        $console.text(($console.text() + str));
    else
        $console.html($console.html() + "<\br>");
    $console.html($console.html() + "<span id='cursor'>|</span>");
    console.log(str);
}


$(document).keypress(function (e) {
     if (String.fromCharCode(e.which) == "\n")
        function execute() {

        }
    write(String.fromCharCode(e.which));

})
setInterval(blinkingCursor, 1000);
