import './App.css'

function App() {
  const turns = {
    x: "x",
    o: "o"
  }

  const board = Array(9).fill(null);

  return (
    <>
    <h1 className='text-3xl'>TIC-TAC-TOE</h1>
    <section className='grid grid-cols-3 grid-rows-3'>{
    board.map((_, index) => {
      return(
        <div key={index}>
          <span>
            {index}
          </span>
        </div>
      )
    })
    }</section>
    </>
  )
}

export default App
