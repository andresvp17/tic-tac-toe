import { useState } from 'react'
import { Turns } from '../types.d'

const SETS_TO_WIN = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

export const Board: React.FC = () => {
  const isTurn = 'selected'
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(Turns.X)
  const [winner, setWinner] = useState<string | null>(null)
  const [winningCombo, setWinningCombo] = useState<number[]>([])

  const draw = board.every((x) => x)

  const resetGame = (): void => {
    setBoard(Array(9).fill(null))
    setTurn(Turns.X)
    setWinner(null)
  }

  const handleSquare = (index: number): void => {
    if (board[index] != null || winner != null) return

    const updatedBoard = [...board]
    updatedBoard[index] = turn
    setBoard(updatedBoard)

    const changeTurn = turn === Turns.X ? Turns.O : Turns.X
    setTurn(changeTurn)

    const checkWinner = isMatchWon(updatedBoard)

    if (checkWinner != null) {
      setWinner(checkWinner)
    }
  }

  const isMatchWon = (currentBoard: string[]): string | undefined => {
    for (const match of SETS_TO_WIN) {
      const [a, b, c] = match

      if (
        (Boolean(currentBoard[a])) &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        setWinningCombo(match)
        return currentBoard[a]
      }
    }
  }

  return (
    <>
      <section className="board">
        {board.map((_cell, index) => (
          <span onClick={() => { handleSquare(index) }} className={`cell ${winningCombo.includes(index) && 'winningCells'}`} key={index}>{board[index]}</span>
        ))}
      </section>
      <footer className='footer'>
        <h2 className='footerTitle'>Turns</h2>
        <div className='footerElements'>
          <span className={`${turn === Turns.X && isTurn}`}>{Turns.X}</span>
          <span className={`${turn === Turns.O && isTurn}`}>{Turns.O}</span>
        </div>
      </footer>

      {(winner != null) && (
        <section className='winnerSection'>
          <p>The winner is:</p>
          <span className='cell'>{winner}</span>
          <button className='resetButton' onClick={resetGame}>Reset</button>
        </section>
      )}

      {draw && (
        <section className='winnerSection'>
          <p>Draw!</p>
          <button className='resetButton' onClick={resetGame}>Reset</button>
        </section>
      )}
    </>
  )
}
