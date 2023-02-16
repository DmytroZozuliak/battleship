import { Cell } from '../types/types'

export const boardSize = {
  boardWidth: 10,
  boardHeight: 10,
}

export const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

export function initialBoard(): Cell[][] {
  let emptyBoard: Cell[][] = []

  for (let x = 0; x < boardSize.boardHeight; x++) {
    emptyBoard.push([])
    for (let y = 0; y < boardSize.boardWidth; y++) {
      emptyBoard[x].push({
        isShotted: false,
        isShip: false,
        coordinates: {
          x: x,
          y: y,
        },
      })
    }
  }
  return emptyBoard
}
