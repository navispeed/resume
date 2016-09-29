/**
 * Created by grimaceplume on 28/09/2016.
 */

var subsytem = {

    system: [],
    env: [],

    getBinairieIn: function (path) {
        var res = [];
        var pwd = this.system;

        console.log("system: ", this.system);
        var split = path.split("/");
        try {
            split.forEach(function (folder) {
                if (folder == "")
                    return;
                console.log("j'accède à : <" + folder + ">");
                pwd = pwd.get(folder);
                console.log("pwd: ", pwd);
                if (folder.permission == 0) {
                    throw "no permission for this folder (";
                }
            });
        } catch (e) {
            console.log("e: ", e);
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
        console.log("execute(cmd:" + cmd + ")");
        var args = cmd.split(" ");
        var binairieIn = this.getBinairieIn(this.env.get("PATH"));

        for (var i = 0; i < binairieIn.length ; ++i) {

        }
    },

    downloadFileSystem: function () {
        $.ajax({
            method: "GET",
            url: "/directory.json",
        }).done(function (msg) {
            subsytem.system = eval(msg);
            subsytem.system.get = function (name) {
                console.log("get: ", name);
                console.log("get 2: ", this);
                for (var i = 0; i < this.content.length; ++i) {
                    console.log("get 3: ", this.content[i].name);
                    if (this.content[i].name == name) {
                        return this.content[i];
                    }
                }
                return undefined;
            };
            function assignFunction(directory) {
                console.log("directory: ", directory);
                for (var i = 0; i < directory.content.length; ++i) {
                    var child = directory.content[i];
                    if (child.content == undefined) {
                        child.execute = binairies[child.name];
                        console.log("child: ", child);
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
            console.log("this: ", this);
            console.log("this.lenght: ", this.length);
            for (var i = 0; i < this.length; ++i) {
                console.log("name: " + name + ", this[" + i + "].name =" + this[i].name);
                if (this[i].name == name) {
                    return this[i].value;
                }
            }
            return undefined;
        };
    }, init: function () {
        this.downloadFileSystem();
        this.initEnv();

        console.log("system: ", this.system);
    },
};

subsytem.init();
console.log("Subsytem Loaded");