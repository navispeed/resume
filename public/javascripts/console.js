/**
 * Created by yohann on 28/09/2016.
 */

var lineNumber = 1;
var name = "";
var innib = 0;
var cl = [0, 0];
var clRow = 0;

function blinkingCursor() {
    var cont = $("#cursor");
    if (cont.text().substring(cont.text().length - 1, cont.text().length) == "|")
        cont.html(cont.html().substring(0, cont.length - 1));
    else
        cont.text(cont.text() + "|");
}

function extracted() {
    var cont = $("#cursor");
    if (cont.text().substring(cont.text().length - 1, cont.text().length) == "|")
        cont.html(cont.html().substring(0, cont.length - 1));
}

function write(str, color) {
    var $actualLine = $("#line" + lineNumber);
    extracted();
    if ($actualLine[0] == undefined) {
        $("#console").append("<br><text id=" + "line" + lineNumber + "></text>")
        $actualLine = $("#line" + (lineNumber));
        $actualLine.text(($actualLine.text() + str));
        lineNumber++;
        return
    }
    $actualLine.text(($actualLine.text() + str));
    $actualLine.html($actualLine.html() + "<span id='cursor'>|</span>");
}

function writeNl(str, color) {
    write(str);
    var $actualLine = $("#line" + lineNumber);
    extracted();
    $actualLine.html($actualLine.html() + "<br>");
    $actualLine.html($actualLine.html() + "<span id='cursor'>|</span>");
}



function execute(str) {
    var $actualLine = $("#line" + lineNumber);
    lineNumber++;
    extracted();
    if (name == "") {
        name = $actualLine.text().split(":")[1];
        if (name == "")
            name = "Petit Lapinou";
        subsytem.execute("help");
    }
    $actualLine.text(($actualLine.text() + str));
    subsytem.execute($actualLine.text().replace("\r", ""));
    $("#console").append("<br>" + "<span class='name'>" + name + "@DESKTOP-5VL27MA: </span>" + "<text id=" + "line" + lineNumber + "></text>")
    write("");
    window.scrollTo(0, 4000000);
}

function backspace() {
    var actualLine = $("#line" + lineNumber);
    actualLine.text(actualLine.text().substring(0, actualLine.text().length - 1)); // remove it
    actualLine.html(actualLine.html() + "<span id='cursor'>|</span>");
}


function makeIntro() {
    document.getElementById("line0").style.visibility = "visible";
    var $cursor = $("#cursor");
    var $line1 = $("#line1");
    var $line0 = $("#line0");
    $cursor.hide();
    $line1.hide();
    var LineIntro = $line0;
    var textIntro = $line0.text().split("\n");
    LineIntro.text("");
    var buff;
    var j = 0;

    function writeBoot() {
        setTimeout(function () {
            LineIntro.html(LineIntro.html() + "<h3>Loading Linux Kernel</h3>");
        }, 1000);
        setTimeout(function () {
            LineIntro.html(LineIntro.html() + "<h3>Booting into Linux</h3>");
        }, 2000);

    }

    function writeLine() {
        if (textIntro[j + 1] == undefined) {
            textIntro[j + 1] = "";
        }
        buff = textIntro[j].replace("OK", "<span class='g'>OK</span>") + '<br>' + textIntro[j + 1].replace("OK", "<span class='g'>OK</span>");
        buff = buff.replace("KO", "<span class='r'>KO</span>");
        LineIntro.html(LineIntro.html() + buff + "<br>");
        j += 2;
        if (j < textIntro.length) {
            window.scrollTo(0, 4000000);
            setTimeout(writeLine, 1);
        } else {
            console.log("finish");
            $cursor.show();
            $line1.show();
            window.scrollTo(0, 4000000);
            innib = 1;
        }

    }

    writeBoot();
    setTimeout(writeLine, 3000);
}

function clearWin(addNewLine) {
    var console = $("#console");
    console.html("");
    if (addNewLine == 0)
    execute("");
    cl = [0, 0];
}

$(document).keydown(function (e) {
    if (innib == 1) {
        clRow = (clRow == 0) ? 1 : 0;
        cl[clRow] = e.which;
        if (cl[0] == 17 && cl[1] == 76)
            e.which = -1;
        switch (e.which) { //TODO faire marcher ca avec autre chose que de l'azerty
            case -1:
                clearWin(0);
                break;
            case 13:
                execute(String.fromCharCode(e.which));
                break;
            case 8:
                backspace();
                break;
            case 17:
                break;
            case 91:
                break;
            case 190:
                write(".");
                break;
            case 191:
                write("/");
                break;
            default:
                write(String.fromCharCode(e.which).toLowerCase());
        }
}
});
setInterval(blinkingCursor, 1000);
window.onload = makeIntro;