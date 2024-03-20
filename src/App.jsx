import { useState } from 'react'
import './App.css'

const TURN = {
  x: "x",
  o: "o"
}



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

  const updateBoard = (index) => {
    const newBoard = [...board];
    newBoard[index] = turn;
    const newTurn = turn === TURN.x ? TURN.o : TURN.x;
    setBoard(newBoard);
    setTurn(newTurn);
    console.log(index)
  }

  return (
    <main>
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
    </main>
  )
}

export default App
