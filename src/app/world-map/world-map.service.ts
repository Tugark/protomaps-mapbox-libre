import { Injectable } from "@angular/core";
import maplibregl, { Map as MapLibreGlMap } from "maplibre-gl";
import * as pmtiles from "pmtiles";

@Injectable({
  providedIn: "root"
})
export class WorldMapService {
  private map: MapLibreGlMap | undefined;

  constructor() {
    this.setupPmTiles();
  }


  public initializeMap(container: HTMLElement) {
    this.map = new MapLibreGlMap({
      container: container,
      hash: true,
      center: [21.056, 40.2376],
      zoom: 11,
      maxZoom: 13,
      style: {
        version: 8,
        glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
        sources: {

          contourPm: {
            "type": "vector",
            "url": "pmtiles://http://localhost:3000/ogr_frompg_reduced.pmtiles",
          },
                    osm: {
            type: "raster",
            tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "&copy; OpenStreetMap Contributors",
            maxzoom: 19
          },
        },
        layers: [

          {
            id: "osm",
            type: "raster",
            source: "osm"
          },
          {
            id: "contour",
            type: "line",
            source: "contourPm",
            'source-layer': 'merged_raster',
            paint: {
                'line-color': '#ff69b4',
                'line-width': 4
            }
          },

        ]
      }
    });
  }

  /**
   * Configure the required protocols for using pmtiles.
   */
  private setupPmTiles(): void {
    const protocol = new pmtiles.Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);
  }
}
