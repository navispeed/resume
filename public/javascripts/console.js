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
    subsytem.execute($actualLine.text());
}

function backspace() {
    var actualLine = $("#line" + lineNumber);
    actualLine.text(actualLine.text().substring(0, actualLine.text().length - 1)); // remove it
    actualLine.html(actualLine.html() + "<span id='cursor'>|</span>");
}


function makeIntro() {
    document.getElementById("line0").style.visibility = "visible"
    var LineIntro= $("#line0");
    var textIntro= $("#line0").text().split("\n");
    LineIntro.text("");
    var buff;
    for(var i = 0; textIntro.length != i ; i++)
    {
        buff = textIntro[i].replace("OK", "<span class='g'>OK</span>");
        buff = buff.replace("done", "<span class='g'>done</span>");
        LineIntro.html(LineIntro.html() + buff + "<br>");

    }
}
function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return [curtop];
    }
}

$(document).keydown(function (e) {

    switch (e.which) {
        case 13:
            execute(String.fromCharCode(e.which)); //TODO put the stored command as parameter
            break;
        case 8:
            backspace()
            break;
        default:
            write(String.fromCharCode(e.which));
    }
});
setInterval(blinkingCursor, 1000);
window.onload = makeIntro;