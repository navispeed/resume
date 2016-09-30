/**
 * Created by grimaceplume on 28/09/2016.
 */

var binairies = {

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

    clear: function (ac, av) {
    clearWin(1);
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
    author: function (ac, av) {

    },

    github: function (ac, av) {
        window.open('https://github.com/grimaceplume');
    },

    linkedin: function (ac, av) {
        window.open('https://www.linkedin.com/in/gr%C3%A9goire-gu%C3%A9mas-9865abaa?trk=nav_responsive_tab_profile_pic');
    },

    sendmail: function (ac, av) {
        open("mailto:" + subsytem.env.get("MAIL"));
        writeNl("sendmail: if nothing happen, you can also contact me at " + subsytem.env.get("MAIL"))
    },

    help: function (ac, av) {
        console.log("help", write);
        writeNl("Welcome on my resume, this is a list of avalaible commands: ");
        var binairieIn = subsytem.getBinairieIn("/bin");
        for (var i = 0; i < binairieIn.length; ++i) {
            writeNl("- " + binairieIn[i].name + " : " + binairieIn[i].desc);
        }
        write("Enjoy :)")
    },

    env: function (ac, av) {
        for (var i = 0; i < subsytem.env.length; ++i) {
            writeNl(subsytem.env[i].name + "=" + subsytem.env[i].value);
        }
    },

    pwd: function (ac, av) {
        var s = binairies.getPwd();
        writeNl(s);
    }
};