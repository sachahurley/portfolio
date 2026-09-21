export interface TileMeta { source: string; src: string; tile: number; pitch: number; cols: number; rows: number; width: number; height: number }
export interface TileRecord { id: string; x: number; y: number; w: number; h: number; [key: string]: unknown }
export function writeManifest(file: string, meta: TileMeta, tiles: TileRecord[]): void
export function writeIndex(file: string, meta: TileMeta, tiles: TileRecord[]): void
export function writeAtlas(file: string, meta: TileMeta, tiles: TileRecord[]): void
export function writeSheet(file: string, meta: TileMeta): void
