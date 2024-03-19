import './App.css'

const turns = {
  x: "x",
  o: "o"
}

const board = Array(9).fill(null);

const Square = ({ children, updateBoard, index}) => {
  return(
    <div className='border border-solid border-white text-5xl text-center h-full flex justify-center items-center'>
      {children}
    </div>
  )
}

function App() {
  return (
    <>
      <h1 className='text-3xl'>TIC-TAC-TOE</h1>
      <section className='h-96 grid grid-cols-3 grid-rows-3 aspect-square justify-items-stretch items-stretch gap-1'>{
        board.map((_, index) => {
          return (
            <Square key={index} index={index}>
              {index}
            </Square>
          )
        })
      }</section>
    </>
  )
}

export default App
