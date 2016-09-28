/**
 * Created by grimaceplume on 28/09/2016.
 */

var system = [];
var env = [];

system.get = function (name) {
    for (var i = 0; i < this.length; ++i) {
        if (this[i].name == name) {
            return this[i];
        }
    }
    return undefined;
};

env.get = function (name) {
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

function getBinairieIn(path) {
    var res = [];
    var pwd = system;

    var split = path.split("/");
    try {
        split.forEach(function (folder) {
            if (folder == "")
                return;
            console.log("j'accède à : <" + folder + ">");
            pwd = pwd[folder];
            if (folder.permission == 0) {
                throw "no permission for this folder (";
            }
        });
    } catch (e) {
        console.log("e: ", e);
        return [];
    }
    pwd.forEach(function (element) {
        if (element.content == undefined && element.permission == 7) {
            res.push(element);
        }
    });
    console.log("binaire trouvé dans " + path + " : ", res);
    return res;
}


function execute(cmd) {
    return;

    var args = cmd.split(" ");
    var binairieIn = getBinairieIn(env.get("PATH"));
}

function init() {
    env.push({name: "PWD", value: "/home/user"});
    env.push({name: "OLDPWD", value: "/home/user"});
    env.push({name: "PATH", value: "/bin"});
}

init();

console.log("Subsytem Loaded");