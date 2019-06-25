var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var GroceryListViewModel = require("../../shared/view-models/grocery-list-view-model");

var page;

var groceryList = new GroceryListViewModel([]);
var pageData = observableModule.fromObject({
    groceryList: groceryList
});

exports.loaded = function (args) {
    page = args.object;
    page.bindingContext = pageData;
};
