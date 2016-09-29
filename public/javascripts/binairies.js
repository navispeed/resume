/**
 * Created by grimaceplume on 28/09/2016.
 */

var binairies = {

    ls: function (ac, av) {
        console.log("ls");
    },

    cd: function (ac, av) {
        write("You can't change directory :'), please contact me")
    },

    help: function (ac, av) {
        console.log("help", write);
        writeNl("Welcome on my cv, this is a list of avalaible commands: ");
        var binairieIn = subsytem.getBinairieIn("/bin");
        for (var i = 0; i < binairieIn.length ; ++i) {
            writeNl("- " + binairieIn[i].name + " : " + binairieIn[i].desc);
        }
        write("Enjoy :)")
    }
};