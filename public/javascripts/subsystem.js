/**
 * Created by grimaceplume on 28/09/2016.
 */

var subsytem = {

    system: [],
    env: [],
    pwd: {},
    who: {},

    getFile: function (path) {
        var split = path.split("/");
        var origin = null;
        if (path == "." || path == "./") {
            return this.pwd;
        }
        if (path.charAt(0) == '/') {             //Absolute
            origin = this.system;
        } else {                                 //Relative
            origin = this.pwd;
        }
        for (var i = 0; i < split.length; ++i) {
            var c = split[i];
            if (c == "") {
                continue;
            }
            if (c == "..") {
                origin = origin.parent;
                continue;
            }
            origin = origin.get(c);
        }
        return origin;
    },

    explore: function (path) {
        var res = [];
        var pwd = this.system;

        var split = path.split("/");
        try {
            split.forEach(function (folder) {
                if (folder == "")
                    return;
                pwd = pwd.get(folder);
                if (folder.permission == 0) {
                    throw "no permission for this folder (";
                }
            });
        } catch (e) {
            return [];
        }
        pwd.content.forEach(function (element) {
            res.push(element);
        });
        return res;
    },

    getBinairieIn: function (path) {
        var res = [];
        var pwd = this.system;

        var split = path.split("/");
        try {
            split.forEach(function (folder) {
                if (folder == "")
                    return;
                pwd = pwd.get(folder);
                if (folder.permission == 0) {
                    throw "no permission for this folder (";
                }
            });
        } catch (e) {
            return [];
        }
        pwd.content.forEach(function (element) {
            if (element.content == undefined && element.permission == 7) {
                res.push(element);
            }
        });
        return res;
    },


    execute: function (cmd) {
        var args = cmd.split(" ");
        var binairieIn = this.getBinairieIn(this.env.get("PATH"));

        for (var i = 0; i < binairieIn.length; ++i) {
            if (String(binairieIn[i].name) == String(args[0])) {
                console.log("execute");
                binairieIn[i].execute(args.length, args);
                return;
            }
        }
    },

    downloadUser: function () {
        function downloadPicture(name) {
            $.ajax({
                method: "GET",
                url: "/profils/" + name,
            }).done(function (msg) {
                subsytem.who.picture = msg;
            });
        }
        $.ajax({
            method: "GET",
            url: "/who",
        }).done(function (msg) {
            console.log(msg);
            subsytem.who = msg;
            subsytem.env.push({name: "MAIL", value: msg.email}); //TODO add dynamic value
            downloadPicture(msg.ascii);
        });
    },

    downloadFileSystem: function () {
        $.ajax({
            method: "GET",
            url: "/directory.json",
        }).done(function (msg) {
            subsytem.system = eval(msg);
            function assignFunction(directory) {
                for (var i = 0; i < directory.content.length; ++i) {
                    var child = directory.content[i];
                    if (child.content == undefined) {
                        child.execute = binairies[child.name];
                    } else {
                        assignFunction(child);
                    }
                }
            }

            function setUnixStyleDirectory(current, parent) {
                current.parent = parent;
                for (var i = 0; i < current.content.length; ++i) {
                    if (current.content[i].content != undefined) {
                        setUnixStyleDirectory(current.content[i], current);
                    }
                }
                current.get = function (name) {
                    for (var i = 0; i < this.content.length; ++i) {
                        if (this.content[i].name == name) {
                            return this.content[i];
                        }
                    }
                    return undefined;
                };
            }

            function setPwd() {
                subsytem.pwd = subsytem.system.content[1].content[0];
            }

            setUnixStyleDirectory(subsytem.system, subsytem.system);
            assignFunction(subsytem.system);
            setPwd();
        });
    },
    initEnv: function () {
        this.env.push({name: "PWD", value: "/home/user"});
        this.env.push({name: "OLDPWD", value: "/home/user"});
        this.env.push({name: "PATH", value: "/bin"});
        this.env.get = function (name) {
            for (var i = 0; i < this.length; ++i) {
                if (this[i].name == name) {
                    return this[i].value;
                }
            }
            return undefined;
        };
    },

    init: function () {
        this.downloadFileSystem();
        this.downloadUser();
        this.initEnv();
    },
};
subsytem.init();
console.log("Subsytem Loaded");