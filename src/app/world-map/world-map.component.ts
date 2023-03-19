import { Component, OnInit } from '@angular/core';
import * as maplibregl from 'maplibre-gl';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss'],
})
export class WorldMapComponent implements OnInit {
  ngOnInit(): void {
    const map = new maplibregl.Map({
      container: 'map',
      style: 'https://demotiles.maplibre.org/style.json',
      center: [8.54027, 47.37785],
      zoom: 7,
    });
  }
}
