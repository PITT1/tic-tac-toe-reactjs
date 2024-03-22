import { useState } from 'react'
import './App.css'

const TURN = {
  x: "x",
  o: "o"
}

const winnerCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const Square = ({ children, updateBoard, index, isSelected}) => {
  const handleClick = () =>{
    updateBoard();
  }

  return(
    <div onClick={handleClick} className={`${isSelected? "bg-blue-700": ""} border border-solid border-white rounded-lg text-5xl text-center h-full flex justify-center items-center cursor-pointer`}>
      {children}
    </div>
  )
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURN.x);
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
    for (const combo of winnerCombos) {
      const [a, b, c] = combo;
      if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a]
      }
    }
    return null;
  }

  const updateBoard = (index) => {
    if(board[index]) {
      return
    } else {
      const newBoard = [...board];
      newBoard[index] = turn;
      const newTurn = turn === TURN.x ? TURN.o : TURN.x;
      setBoard(newBoard);
      setTurn(newTurn);
      console.log(index)

      const newWinner = checkWinner(newBoard);
      if(newWinner) {
        setWinner(newWinner);
      }
    }
  }

  return (
    <main className='relative'>
      <h1 className='text-3xl mb-7'>TIC-TAC-TOE</h1>
      <section className='h-64 sm:h-96 grid grid-cols-3 grid-rows-3 aspect-square justify-items-stretch items-stretch gap-1'>{
        board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={() => updateBoard(index)}>
              {board[index]}
            </Square>
          )
        })
      }</section>

      <section className='flex justify-evenly mt-7 '>
        <Square isSelected={turn === TURN.x}>{TURN.x}</Square>
        <Square isSelected={turn === TURN.o}>{TURN.o}</Square>
      </section>

      {
        winner !== null && (
          <section className='absolute top-0 left-0 h-full w-full flex justify-center items-center'>
            <div className='w-auto bg-slate-700 text-center rounded-2xl shadow-2xl'>
              <h2 className='py-6 px-8 font-bold sm:text-2xl'>
                {
                  winner === false ? 'Empate':`Ganan las ${winner}`
                }
              </h2>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
