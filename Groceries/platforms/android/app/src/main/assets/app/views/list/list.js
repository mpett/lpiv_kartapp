var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var GroceryListViewModel = require("../../shared/view-models/grocery-list-view-model");

var page;

var groceryList = new GroceryListViewModel([]);
var pageData = observableModule.fromObject({
    groceryList: groceryList,
    grocery: ''
});

exports.loaded = function (args) {
    page = args.object;
    var listView = page.getViewById('groceryList');
    page.bindingContext = pageData;
    groceryList.empty();
    pageData.set('isLoading', true);
    groceryList.load().then(function() {
        pageData.set("isLoading", false);
        listView.animate({
            opacity: 1,
            duration: 1000
        });
    });
};

exports.add = function () {
    // Check for empty submissions
    if (pageData.get("grocery").trim() === "") {
        dialogsModule.alert({
            message: "Enter a grocery item",
            okButtonText: "Ok"
        });
        return;
    }

    // Dismiss the keyboard
    page.getViewById("grocery").dismissSoftInput();
    groceryList.add(pageData.get("grocery"))
        .catch(function () {
            dialogsModule.alert({
                message: "An error occurred while adding an item to the list.",
                okButtonText: "Ok"
            });
        });
    
    // Empty the input field
    pageData.set("grocery", "");
};
