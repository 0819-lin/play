
export enum TreeState {
  CHAOS = 'CHAOS',
  FORMED = 'FORMED'
}

export interface OrnamentData {
  chaosPos: [number, number, number];
  targetPos: [number, number, number];
  type: 'ball' | 'gift' | 'light';
  weight: number;
  color: string;
}

export interface FoliageData {
  chaosPositions: Float32Array;
  targetPositions: Float32Array;
  count: number;
}
