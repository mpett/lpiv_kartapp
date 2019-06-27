import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import * as geolocation from "nativescript-geolocation";

@Component({
    selector: "Map",
    moduleId: module.id,
    templateUrl: "./map.component.html"
})
export class MapComponent implements OnInit {

    currentLat: number;
    currentLng: number;

    constructor() {
        // Use the component constructor to inject providers.
    }

    @ViewChild("map", null) public mapbox: ElementRef;

    onMapReady(args: any) {
        args.map.setCenter(
            {
                lat: this.currentLat, // mandatory
                lng: this.currentLng, // mandatory
                animated: true, // default true
                zoomLevel: 14
            }
        )
    }

    ngOnInit(): void {
        console.log("Cheking if geolocation is enabled.");
        geolocation.isEnabled().then(enabled => {
            console.log('isEnabled =', enabled);
            if (enabled) {
                this.watch();
            } else {
                this.request();
            }
        }, e => {
            console.log('isEnabled error', e);
            this.request();
        });
    }

    request() {
        console.log('enableLocationRequest()');
        geolocation.enableLocationRequest().then(() => {
            console.log("Location enabled.");
            this.watch();
        }, e => {
            console.log("Failed to enable. ", e);
        });
    }

    watch() {
        console.log("watchLocation()");
        geolocation.watchLocation(position => {
            this.currentLat = position.latitude;
            this.currentLng = position.longitude;
        }, e => {
            console.log("Failed to get location");
        }, {
            desiredAccuracy: 3,
            minimumUpdateTime: 500
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
