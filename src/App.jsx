import { motion, AnimatePresence } from "framer-motion";
import { useState } from 'react';
import './App.css';

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
    <motion.div
    initial={{scale: 0}}
    animate={{scale: 1}} 
    onClick={handleClick} 
    className={`${isSelected? "bg-blue-700": ""} border border-solid border-white rounded-lg text-5xl text-center h-full flex justify-center items-center cursor-pointer`}>
      {children}
    </motion.div>
  )
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURN.x);
  const [winner, setWinner] = useState(null);
  const [pointX, setPointX] = useState(0);
  const [poinTO, setPointO] = useState(0);

  const checkWinner = (boardToCheck) => {
    for (const combo of winnerCombos) {
      const [a, b, c] = combo;
      if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a]
      }
    }
    return null;
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every(square => square !== null)
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

      const newWinner = checkWinner(newBoard);
      if(newWinner) {
        setWinner(newWinner);
      } else if(checkEndGame(newBoard)) {
        setWinner(false);
      }
    }
  }

  const addPoints = () => {
    if (winner == "x") {
      setPointX(pointX + 1);
    } else if (winner == "o") {
      setPointO(poinTO + 1);
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    addPoints();
    setTurn(winner);
    setWinner(null);
  }

  return (
    <main className='relative'>
      <h1 className='text-3xl mb-7'>TIC-TAC-TOE</h1>

      <section className='w-full h-auto flex justify-around py-6 text-4xl'>
        <div>x: {pointX}</div>
        <div>o: {poinTO}</div>
      </section>

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

      <AnimatePresence>
      {
        winner !== null && (
          
          <motion.section
            key="modal"
           initial={{opacity: 0}} 
           animate={{opacity: 1}} 
           exit={{scale: 0, opacity: 0}} className='absolute top-0 left-0 h-full w-full flex justify-center items-center'>
            <div className='w-auto bg-slate-700 text-center rounded-2xl shadow-2xl'>
              <h2 className='py-6 px-8 font-bold sm:text-2xl'>
                {
                  winner === false ? 'Empate':`Ganan las ${winner}`
                }
              </h2>
              <div className='px-4'>
                <button onClick={resetGame} className='py-3 px-5 bg-slate-300 rounded-2xl text-slate-700 font-bold sm:text-2xl'>Siguiente ronda</button>
              </div>
            </div>
          </motion.section>
          
        )
      }
      </AnimatePresence>
    </main>
  )
}

export default App
