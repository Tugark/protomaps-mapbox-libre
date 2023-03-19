import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { ProtomapsBaseMapStyle, WorldMapService } from './world-map.service';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss'],
})
export class WorldMapComponent implements AfterViewInit, OnInit {
  public readonly baseMapStyles = ProtomapsBaseMapStyle;
  public currentBaseMapStyle: ProtomapsBaseMapStyle =
    this.worldMapService.getDefaultBaseMapStyle();
  private readonly subscriptions: Subscription = new Subscription();

  @ViewChild('map') private readonly mapContainer!: ElementRef;
  constructor(private readonly worldMapService: WorldMapService) {}

  public ngAfterViewInit(): void {
    this.worldMapService.initializeMap(this.mapContainer.nativeElement);
  }

  public ngOnInit(): void {}

  public switchBaseMapStyle() {
    this.worldMapService.switchBaseMapStyle(this.currentBaseMapStyle);
  }
}
