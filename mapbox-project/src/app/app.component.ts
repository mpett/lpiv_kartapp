import { Component, ViewChild, ElementRef } from "@angular/core";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})
export class AppComponent {

    @ViewChild("map") public mapbox: ElementRef;

    public onMapReady(args: any) {
        this.mapbox.nativeElement.addMarkers([
            {
                lat: 37.7397,
                lng: -121.4252,
                title: "Tracy, CA",
                subtitle: "Home of The Polyglot Developer!",
                onCalloutTap: () => {
                    console.log("Test");
                }
            }
        ]);
    }

}
