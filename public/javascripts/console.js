/**
 * Created by yohann on 28/09/2016.
 */

var lineNumber = 1;
var name = "USER";
var innib = 0;
var cl = [0, 0];
var clRow = 0;

function writeTab(str, delim) {
    var tab = str.split(delim);
    var i = 0;
    while (i != tab.length) {
        writeNl(tab[i]);
        i++;
    }
}
function write(str) {
    $("#console").append(str);
}

function writeNl(str) {
    $("#console").append("<br>" + str);
}
function writeHTML(str) {
    $("#console").append(str);
}

function addInput() {
    $("#console").append("<input id=" + "line" + lineNumber +">")
    $("#line" + lineNumber).focus();
    lineNumber++;
}

function prompt() {

    $("#console").append("<br>" + "<span class='name'>" + name + "@DESKTOP-5VL27MA: </span>" + "<input id=" + "line" + lineNumber +">")
    $("#line" + lineNumber).focus();
    $("#line" + (lineNumber - 1)).attr("readonly", true);
    window.scrollTo(0, 4000000);
}

function execute(str) {
    var $actualLine = $("#line" + lineNumber);
    lineNumber++;
    subsytem.execute($actualLine.val());
    prompt();
}

function makeIntro() {
    $("#line0")[0].style.visibility = "visible";
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
            $cursor.show();
            $line1.show();
            window.scrollTo(0, 4000000);
            innib = 1;
            binairies.welcome();
            binairies.help();
            prompt();
        }

    }

    writeBoot();
    setTimeout(writeLine, 3000);
}


function clearWin(addNewLine) {
    var console = $("#console");
    console.html("");
    if (addNewLine == 0)
        prompt();
    cl = [0, 0];
}

$(document).keydown(function (e) {
    if (innib == 1) {
        clRow = (clRow == 0) ? 1 : 0;
        cl[clRow] = e.which;
        if (cl[0] == 17 && cl[1] == 76)
            e.which = -1;
        switch (e.which) {             case -1:
                e.preventDefault();
                clearWin(0);
                break;
            case 13:
                execute(String.fromCharCode(e.which));
                break;
        }
    }
});
window.onload = makeIntro;