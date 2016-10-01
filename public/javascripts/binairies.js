/**
 * Created by grimaceplume on 28/09/2016.
 */

var binairies = {

    finish: 0,

    getPwd: function () {
        var c = subsytem.pwd;
        var l = [];
        var s = "";

        while (c.name != subsytem.system.name) {
            l.push(c.name);
            c = c.parent;
        }
        for (var i = l.length - 1; i >= 0; --i) {
            s += "/" + l[i];
        }
        return s;
    },

    ls: function (ac, av) {
        var s = "";

        av[1] = (av[1] == undefined ? "./" : av[1]);
        subsytem.getFile(av[1]).content.forEach(function (e) {
            s += e.name + "   ";
        });
        if (ac > 2) {
            for (var i = 2; i < ac; ++i) {
                subsytem.getFile(av[i]).content.forEach(function (e) {
                    s += e.name;
                });
            }
        }
        writeNl(s);
    },

    rm: function (ac, av) {
        var i = 0;
        clearWin();
        var split = subsytem.who.rmmsg.split("\n");
        function writeSlow() {
            setTimeout(function () {
                writeHTML("<span class='dontDoIt'>" + split[i++]+ "</span>");
                if (i < split.length)
                    setTimeout(writeSlow, 800);
                else
                {
                    setTimeout(function () {
                        clearWin();
                        execute("");
                    }, 800);
                }
            }, 800);
        }
        writeSlow();
    },
    clear: function (ac, av) {
        clearWin(1);
    },

    cat: function (ac, av) {
        if (ac == 1) {
            writeNl("Can't open stdin, maybe you should try with a file");
            writeNl("usage : cat [file 1] [file 2] ... [fileN]");
            return;
        }
        var file = subsytem.getFile(av[1]);
        if (file == undefined || file.content != undefined) {
            writeNl("Cannot access " + av[1]);
            return;
        }
        if (av[1] == "me.ascii") {
            subsytem.execute("author picture");
            return;
        }
        console.log("file:", file);
        $.ajax({
            method: "GET",
            url: file.url,
        }).done(function (msg) {
            console.log("done");
            var split = msg.split("\n");
            for (var i = 0; i < split.length; ++i) {
                writeNl(split[i]);
            }
        });
    },

    cd: function (ac, av) {
        av[1] = av[1] == undefined ? "/home/user" : av[1];
        var file = subsytem.getFile(av[1]);

        if (file == undefined) {
            writeNl("Cannot find " + av[1]);
        }

        if (file.content != undefined) {
            subsytem.pwd = file;
            for (var i = 0; i < subsytem.env.length; ++i) {
                if (subsytem.env[i].name == "PWD") {
                    subsytem.env[i].value = binairies.getPwd();
                    return;
                }
            }
        } else {
            writeNl("Cannot access " + av[1] + " : not a directory");
        }
    },
    picture: function () {
        {
            var split = subsytem.who.picture.split("\n");
            var i = 0;
            writeNl("");
            function showLine() {
                if (split[i] == undefined) {
                    prompt();
                    return;
                }
                writeNl(split[i]);
                ++i;
                setTimeout(showLine, 10);
            }

            setTimeout(showLine, 0);
        }
    }, author: function (ac, av) {
        console.log("author");
        if (ac == 1) {
            writeNl("usage: ");
            writeNl("author resume => show ascii resume ");
            writeNl("author picture => show ascii picture ");
            return;
        }
        switch (av[1]) {
            case "resume":
                writeNl("");
                break;
            case "picture":
                binairies.picture();
        }
    },

    github: function (ac, av) {
        window.open(subsytem.who.github);
    },

    linkedin: function (ac, av) {
        window.open(subsytem.who.linkedin);
    },

    sendmail: function (ac, av) {
        open("mailto:" + subsytem.env.get("MAIL"));
        writeNl("sendmail: if nothing happen, you can also contact me at " + subsytem.env.get("MAIL"))
    },

    help: function (ac, av) {
        console.log("help", write);
        writeNl("This is a list of available commands: ");
        var binairieIn = subsytem.getBinairieIn("/bin");
        for (var i = 0; i < binairieIn.length; ++i) {
            writeNl("- " + binairieIn[i].name + " : " + binairieIn[i].desc);
        }
        write("");
        write("Don't forget you can clear the windows with Ctrl + L");
        write("Enjoy :)");
    },

    env: function (ac, av) {
        for (var i = 0; i < subsytem.env.length; ++i) {
            writeNl(subsytem.env[i].name + "=" + subsytem.env[i].value);
        }
    },
    pwd: function (ac, av) {
        var s = binairies.getPwd();
        writeNl(s);
    },

    welcome: function () {
        writeNl("Hey, I'm " + subsytem.who.firstname + " " + subsytem.who.lastname);
        writeHTML("<h3>Welcome on my resume</h3>")
    }
};