export enum Direction {
  'left' = 'left',
  'right' = 'right',
  'up' = 'up',
  'down' = 'down',
}

export interface Cell {
  isShip: boolean
  isShotted: boolean
  coordinates: Point
}

export interface Point {
  x: number
  y: number
}

export interface Ship {
  length: number
}
