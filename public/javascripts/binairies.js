/**
 * Created by grimaceplume on 28/09/2016.
 */

var binairies = {

    ls: function (ac, av) {

    },

    cd: function (ac, av) {
        writeNl("You can't change directory :'), please contact me")
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
        for (var i = 0; i < binairieIn.length ; ++i) {
            writeNl("- " + binairieIn[i].name + " : " + binairieIn[i].desc);
        }
        write("Enjoy :)")
    }
};