import React from 'react'
import { Cell } from '../types/types'

interface CellItemProps {
  cell: Cell
  onShootHandler: () => void;
  showShips: boolean;
}

const CellItem = ({ cell, onShootHandler, showShips }: CellItemProps) => {
  return (
    <div
      className={"cell " + ((cell.isShip && showShips) ? "ship " : "") + ((cell.isShotted && cell.isShip) ? "shot" : '') + ((cell.isShotted && !cell.isShip) ? "miss" : '')}
      onClick={onShootHandler}
    />
  )
}

export default CellItem
