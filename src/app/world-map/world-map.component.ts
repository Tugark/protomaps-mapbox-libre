import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { WorldMapService } from "./world-map.service";

@Component({
  selector: "app-world-map",
  templateUrl: "./world-map.component.html",
  styleUrls: ["./world-map.component.scss"]
})
export class WorldMapComponent implements AfterViewInit, OnInit {

  @ViewChild("map") private readonly mapContainer!: ElementRef;

  constructor(private readonly worldMapService: WorldMapService) {
  }

  public ngAfterViewInit(): void {
    this.worldMapService.initializeMap(this.mapContainer.nativeElement);
  }

  public ngOnInit(): void {
  }

}
