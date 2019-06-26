
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";

class Producer {
    constructor(public name: string) {}
}

let localProducers = ["Adelsåsens Vilt AB", "Resville Mathantverk", "Kullans Lycka", "Stadsnära Lantbruk", "Bondfrun", "Gården Partihandel", "Wästgötarna"];

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements OnInit {

    public producers: Array<Producer>;

    constructor() {
        this.producers = [];

        for (let i = 0; i < localProducers.length; i++) {
            this.producers.push(new Producer(localProducers[i]));
        }

        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onItemTap(args):void {
        console.dir(args);
    }
}
