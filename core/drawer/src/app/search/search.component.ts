import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { ObservableArray } from "tns-core-modules/data/observable-array";

import * as app from "tns-core-modules/application";

class DataItem {
    constructor(public name: string) {}
}

@Component({
    selector: "Search",
    moduleId: module.id,
    templateUrl: "./search.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
    public searchPhrase: string;
    private arrayItems: Array<DataItem> = [];
    public myItems: ObservableArray<DataItem> = new ObservableArray<DataItem>();

    constructor() {
        this.arrayItems.push(new DataItem("Franzéns champinjoner"));
        this.arrayItems.push(new DataItem("Johanssons Lamm & Ull"));
        this.arrayItems.push(new DataItem("Kisakulla AB"));
        this.arrayItems.push(new DataItem("Claessons Charkuteri"));
        this.arrayItems.push(new DataItem("Bondfrun"));
        this.arrayItems.push(new DataItem("Vilda Växter"));
        this.arrayItems.push(new DataItem("Adelsåsens Vilt AB"));

        this.myItems = new ObservableArray<DataItem>(this.arrayItems);
    }

    public onSubmit(args) {
        let searchBar = <SearchBar>args.object;
        let searchValue = searchBar.text.toLowerCase();
        this.myItems = new ObservableArray<DataItem>();

        if (searchValue !== "") {
            for (let i = 0; i < this.arrayItems.length; i++) {
                if (this.arrayItems[i].name.toLowerCase().indexOf(searchValue) !== -1) {
                    this.myItems.push(this.arrayItems[i]);
                }
            }
        }
    }

    public onClear(args) {
        let searchBar = <SearchBar>args.object;
        searchBar.text = "";
        searchBar.hint = "Sök matproducent";

        this.myItems = new ObservableArray<DataItem>();
        this.arrayItems.forEach(item => {
            this.myItems.push(item);
        });
    }

    public onTextChanged(args) {
        //let searchBar = <SearchBar>args.object;
        //alert("Du söker efter " + searchBar.text);
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
