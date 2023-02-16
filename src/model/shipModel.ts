import { getDirection, getRandomNumber } from '../helpers/helpers'
import { Cell, Direction, Point, Ship } from '../types/types'

export const drawAllShips = (initialBoard: Cell[][]): Cell[][] => {
  // copying initialBoard to manipulate deeply
  const boardCopy: Cell[][] = JSON.parse(JSON.stringify(initialBoard))

  // to manipulate of quantity and length of ships in future
  for (let i = 1; i <= 1; i++) {
    buildShip({ length: 4 }, boardCopy)
  }
  for (let i = 1; i <= 2; i++) {
    buildShip({ length: 3 }, boardCopy)
  }
  for (let i = 1; i <= 3; i++) {
    buildShip({ length: 2 }, boardCopy)
  }
  for (let i = 1; i <= 4; i++) {
    buildShip({ length: 1 }, boardCopy)
  }

  return boardCopy
}

function buildShip(ship: Ship, board: Cell[][]): void {
  let direction = getDirection()
  let shipCoordinates = []

  let startPoint: Point = {
    x: getRandomNumber(),
    y: getRandomNumber(),
  }

  if (!isValidSibling(board, startPoint, direction)) {
    buildShip(ship, board)
    return
  }

  let currentPoint = startPoint

  for (let i = 1; i <= ship.length; i++) {
    let nextPoint = i === 1 ? startPoint : getNextPoint(currentPoint, direction)

    if (!isValidPoint(board, nextPoint, direction)) {
      buildShip(ship, board)
      return
    }

    currentPoint = nextPoint
    shipCoordinates.push(currentPoint)

    if (shipCoordinates.length === ship.length) {
      if (!isValidSiblingEnd(board, nextPoint, direction, ship.length)) {
        buildShip(ship, board)
        return
      }
    }
  }

  if (shipCoordinates.length === ship.length) {
    shipCoordinates.forEach((coordinate) => {
      board[coordinate.x][coordinate.y].isShip = true
    })
    return
  }
}

function getNextPoint(currentPoint: Point, direction: Direction) {
  let nextPoint: Partial<Point> = {}
  switch (direction) {
    case Direction.left:
      nextPoint.x = currentPoint.x
      nextPoint.y = currentPoint.y - 1
      break
    case Direction.right:
      nextPoint.x = currentPoint.x
      nextPoint.y = currentPoint.y + 1
      break
    case Direction.up:
      nextPoint.x = currentPoint.x - 1
      nextPoint.y = currentPoint.y
      break
    case Direction.down:
      nextPoint.x = currentPoint.x + 1
      nextPoint.y = currentPoint.y
      break
    default:
      throw 'invalid'
  }
  return nextPoint as Point
}

function isValidPoint(board: Cell[][], point: Point, direction: Direction) {
  // check for exist cell
  if (!board[point.x] || !board[point.x][point.y]) {
    return false
  }
  // check for ship exist
  if (board[point.x][point.y].isShip) {
    return false
  }
  // check siblings
  if (!isValidSibling(board, point, direction)) {
    return false
  }
  return true
}

function isValidSibling(board: Cell[][], point: Point, direction: Direction) {
  switch (direction) {
    case Direction.left:
      if (
        board?.[point.x]?.[point.y + 1]?.isShip ||
        board?.[point.x + 1]?.[point.y]?.isShip ||
        board?.[point.x - 1]?.[point.y]?.isShip ||
        board?.[point.x - 1]?.[point.y + 1]?.isShip ||
        board?.[point.x + 1]?.[point.y + 1]?.isShip
      ) {
        return false
      }
      break
    case Direction.right:
      if (
        board?.[point.x]?.[point.y - 1]?.isShip ||
        board?.[point.x + 1]?.[point.y]?.isShip ||
        board?.[point.x - 1]?.[point.y]?.isShip ||
        board?.[point.x - 1]?.[point.y - 1]?.isShip ||
        board?.[point.x + 1]?.[point.y - 1]?.isShip
      ) {
        return false
      }
      break
    case Direction.up:
      if (
        board?.[point.x + 1]?.[point.y]?.isShip ||
        board?.[point.x]?.[point.y + 1]?.isShip ||
        board?.[point.x]?.[point.y - 1]?.isShip ||
        board?.[point.x + 1]?.[point.y - 1]?.isShip ||
        board?.[point.x + 1]?.[point.y + 1]?.isShip
      ) {
        return false
      }
      break
    case Direction.down:
      if (
        board?.[point.x - 1]?.[point.y]?.isShip ||
        board?.[point.x]?.[point.y + 1]?.isShip ||
        board?.[point.x]?.[point.y - 1]?.isShip ||
        board?.[point.x - 1]?.[point.y - 1]?.isShip ||
        board?.[point.x - 1]?.[point.y + 1]?.isShip
      ) {
        return false
      }
      break
    default:
      throw 'invalid'
  }
  return true
}

function isValidSiblingEnd(
  board: Cell[][],
  point: Point,
  direction: Direction,
  shipLength: number
) {
  if (shipLength === 1) {
    if (
      board?.[point.x]?.[point.y - 1]?.isShip ||
      board?.[point.x]?.[point.y + 1]?.isShip ||
      board?.[point.x + 1]?.[point.y]?.isShip ||
      board?.[point.x - 1]?.[point.y]?.isShip ||
      board?.[point.x - 1]?.[point.y - 1]?.isShip ||
      board?.[point.x - 1]?.[point.y + 1]?.isShip ||
      board?.[point.x + 1]?.[point.y - 1]?.isShip ||
      board?.[point.x + 1]?.[point.y + 1]?.isShip
    ) {
      return false
    }
  }
  switch (direction) {
    case Direction.left:
      if (
        board?.[point.x]?.[point.y - 1]?.isShip ||
        board?.[point.x - 1]?.[point.y - 1]?.isShip ||
        board?.[point.x + 1]?.[point.y - 1]?.isShip
      ) {
        return false
      }
      break
    case Direction.right:
      if (
        board?.[point.x]?.[point.y + 1]?.isShip ||
        board?.[point.x - 1]?.[point.y + 1]?.isShip ||
        board?.[point.x + 1]?.[point.y + 1]?.isShip
      ) {
        return false
      }
      break
    case Direction.up:
      if (
        board?.[point.x - 1]?.[point.y]?.isShip ||
        board?.[point.x - 1]?.[point.y - 1]?.isShip ||
        board?.[point.x - 1]?.[point.y + 1]?.isShip
      ) {
        return false
      }
      break
    case Direction.down:
      if (
        board?.[point.x + 1]?.[point.y]?.isShip ||
        board?.[point.x + 1]?.[point.y - 1]?.isShip ||
        board?.[point.x + 1]?.[point.y + 1]?.isShip
      ) {
        return false
      }
      break
    default:
      throw 'invalid position'
  }

  return true
}
