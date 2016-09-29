/**
 * Created by grimaceplume on 28/09/2016.
 */

var subsytem = {

    system: [],
    env: [],

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

    downloadFileSystem: function () {
        $.ajax({
            method: "GET",
            url: "/directory.json",
        }).done(function (msg) {
            subsytem.system = eval(msg);
            subsytem.system.get = function (name) {
                for (var i = 0; i < this.content.length; ++i) {
                    if (this.content[i].name == name) {
                        return this.content[i];
                    }
                }
                return undefined;
            };
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

            assignFunction(subsytem.system)
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
    }, init: function () {
        this.downloadFileSystem();
        this.initEnv();

    },
};

subsytem.init();
console.log("Subsytem Loaded");