/**
 * Created by yohann on 28/09/2016.
 */

var lineNumber = 1;
var name = "";

function blinkingCursor() {
    var cont = $("#cursor");
    if (cont.text().substring(cont.text().length - 1, cont.text().length) == "|")
        $("#cursor").html($("#cursor").html().substring(0, cont.length - 1));
    else
        cont.text(cont.text() + "|");
}

function extracted() {
    var cont = $("#cursor");
    if (cont.text().substring(cont.text().length - 1, cont.text().length) == "|")
        $("#cursor").html($("#cursor").html().substring(0, cont.length - 1));
}
function write(str, color) {

    var $actualLine = $("#line" + lineNumber);
    extracted();
    $actualLine.text(($actualLine.text() + str));
    $actualLine.html($actualLine.html() + "<span id='cursor'>|</span>");
}

function execute(str) {
    var $actualLine = $("#line" + lineNumber);
    lineNumber++;
    extracted();
    if (name == "")
        name = $actualLine.text().split(":")[1];
    $actualLine.text(($actualLine.text() + str));
    $("#console").append("<br>" + "<span class='name'>" + name + "@DESKTOP-5VL27MA: </span>" + "<text id=" + "line" + lineNumber + "></text>")
    subsytem.execute(str); //TODO faire marcher cette ligne
}

function carriageReturn() {
    var actualLine = $("#line" + lineNumber);
    console.log("carriageReturn()", actualLine.text())
    actualLine.text(actualLine.text().substring(0, actualLine.text().length - 1)); // remove it
    actualLine.html(actualLine.html() + "<span id='cursor'>|</span>");
    console.log("carriageReturn() FINISH", actualLine.text())
}

$(document).keydown(function (e) {
    switch (e.which) {
        case 13:
            execute(String.fromCharCode(e.which)); //TODO put the stored command as parameter
            break;
        case 8:
            carriageReturn()
            break;
        default:
            write(String.fromCharCode(e.which));
    }
});
setInterval(blinkingCursor, 1000);