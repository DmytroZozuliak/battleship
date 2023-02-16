import { boardSize } from '../constants/constants'
import { Direction } from '../types/types'

const maxAmount = Math.max(boardSize.boardHeight, boardSize.boardWidth)

export function getRandomNumber(min: number = 0, max: number = maxAmount): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getDirection(): Direction {
  const directionIndex = getRandomNumber(0, 3)
  const directions = [Direction.down, Direction.left, Direction.right, Direction.up]
  return directions[directionIndex]
}
