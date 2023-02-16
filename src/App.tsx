import { useState, useLayoutEffect, useRef } from 'react';
import './App.css';
import { alphabet, boardSize, initialBoard } from './constants/constants';
import CellItem from './components/CellItem';
import { drawAllShips } from './model/shipModel';

function App() {
  const [board, setBoard] = useState(() => initialBoard())
  const [showShips, setShowShips] = useState(true)
  const isRender = useRef(true)

  const resetGame = () => {
    setBoard(drawAllShips(initialBoard()))
  }

  const shootShip = (x: number, y: number) => {
    setBoard(prevBoard => {
      return prevBoard.map((cells, indCells) => {
        if (indCells !== y) {
          return cells
        }
        return cells.map((cell, indCell) => {
          if (indCell !== x) {
            return cell
          }
          return { ...cell, isShotted: true }
        })

      })
    })
  }

  const toggleShips = () => {
    setShowShips(prev => !prev)
  }

  useLayoutEffect(() => {
    if (isRender.current) {
      setBoard(prevBoard => drawAllShips(prevBoard))
    }

    return () => {
      isRender.current = false
      resetGame()
    }
  }, [])

  return (
    <div className="App">
      <h1>Battleship</h1>
      <div className='board'>
        <div className='upperBar'>
          {alphabet.slice(0, boardSize.boardWidth).map((char, ind) => (<div className='cell' key={ind}>
            {char}
          </div>))}
        </div>

        <div className='sideBar'>
          {Array.from({ length: boardSize.boardHeight }).map((_, ind) => (<div className='cell' key={ind}>
            {ind + 1}
          </div>))}
        </div>

        {board.map((cells, indCells) => (
          <div
            key={indCells}
            className='cells'>
            {cells.map((cell, indCell) => (
              <CellItem
                key={indCells + indCell}
                cell={cell}
                onShootHandler={() => shootShip(indCell, indCells)}
                showShips={showShips}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="btns">
        <button type='button' onClick={resetGame}>Refresh</button>
        <button type='button' onClick={toggleShips}>Hide\show ships</button>
      </div>
    </div >
  );
}

export default App;
