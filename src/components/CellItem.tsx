import { Cell } from '../types/types'

interface CellItemProps {
  cell: Cell
  onShootHandler: () => void;
  showShips: boolean;
}

const CellItem = ({ cell, onShootHandler, showShips }: CellItemProps) => {

  const classes = ["cell"]
  if (cell.isShip && showShips) {
    classes.push("ship")
  }
  if (cell.isShotted && cell.isShip) {
    classes.push("shot")
  }
  if (cell.isShotted && !cell.isShip) {
    classes.push("miss")
  }

  return (
    <div
      className={classes.join(" ")}
      onClick={onShootHandler}
    />
  )
}

export default CellItem
