import { Injectable } from '@angular/core';
import maplibregl, {
  Map as MapLibreGlMap,
  StyleSpecification,
} from 'maplibre-gl';
import * as pmtiles from 'pmtiles';
import layers from 'protomaps-themes-base';

export enum ProtomapsBaseMapStyle {
  LIGHT = 'light',
  DARK = 'dark',
  BLACK = 'black',
  DEBUG = 'debug',
  GRAYSCALE = 'grayscale',
  WHITE = 'white',
}

const DEFAULT_BASE_MAP_STYLE: ProtomapsBaseMapStyle =
  ProtomapsBaseMapStyle.LIGHT;

@Injectable({
  providedIn: 'root',
})
export class WorldMapService {
  private map: MapLibreGlMap | undefined;

  constructor() {
    this.setupPmTiles();
  }

  public getDefaultBaseMapStyle(): ProtomapsBaseMapStyle {
    return DEFAULT_BASE_MAP_STYLE;
  }

  public initializeMap(container: HTMLElement) {
    this.map = new MapLibreGlMap({
      container: container,
      hash: true,
      style: this.getProtomapStyle(),
      center: [8.54027, 47.37785],
      zoom: 11,
    });
  }

  public switchBaseMapStyle(style: ProtomapsBaseMapStyle) {
    this.map?.setStyle(this.getProtomapStyle(style));
  }

  /**
   * Configure the required protocols for using pmtiles.
   */
  private setupPmTiles(): void {
    const protocol = new pmtiles.Protocol();
    maplibregl.addProtocol('pmtiles', protocol.tile);
  }

  /**
   * Returns the style specification for a given protomap style.
   * @param layerStyle
   * @returns
   */
  private getProtomapStyle(
    layerStyle: ProtomapsBaseMapStyle = ProtomapsBaseMapStyle.LIGHT
  ): StyleSpecification {
    return {
      version: 8,
      glyphs: 'https://cdn.protomaps.com/fonts/pbf/{fontstack}/{range}.pbf',
      sources: {
        protomaps: {
          type: 'vector',
          url: 'pmtiles:///assets/maps/data.pmtiles',
          attribution:
            '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>',
        },
      },
      layers: layers('protomaps', layerStyle),
    };
  }
}
