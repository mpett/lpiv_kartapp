var frameModule = require('ui/frame');
var UserViewModel = require("../../shared/view-models/user-view-model");
var dialogsModule = require("ui/dialogs");

var user = new UserViewModel({
    email: 'martin@tivala.se',
    password: 'password'
});
var page;
var email;

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = user;
};

exports.signIn = function() {
    user.login()
        .catch(function (error) {
            console.log(error);
            dialogsModule.alert({
                message: "Could not login.",
                okButtonText: "Ok"
            });
            return Promise.reject();
        })
        .then(function() {
            frameModule.topmost().navigate("views/list/list");
        });
};

exports.register = function() {
    var topmost = frameModule.topmost();
    topmost.navigate("views/register/register");
};
