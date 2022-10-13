
import React from 'react';
import "./App.css";

function Board() {
  const [cells, setCells] = React.useState(Array(9).fill(null));

  const nextValue = calculateTurn(cells);
  const winner = calculateWinner(cells);
  const status = isGameOver(winner, cells, nextValue);

  function selectCell(cell) {
    //check if won or all cells full
    if (winner || cells[cell]) {
      return;
    }
    const cellsCopy = [...cells];
    cellsCopy[cell] = nextValue;
    setCells(cellsCopy);
  }

  function restart() {
    setCells(Array(9).fill(null));
  }

  function renderCell(i) {
    return (
      <button className="cell" onClick={() => selectCell(i)}>
        {cells[i]}
      </button>
    );
  }

  return (
    <div>
      <div className="game-info">{status}</div>
      <div className="board-row">
        {renderCell(0)}
        {renderCell(1)}
        {renderCell(2)}
      </div>
      <div className="board-row">
        {renderCell(3)}
        {renderCell(4)}
        {renderCell(5)}
      </div>
      <div className="board-row">
        {renderCell(6)}
        {renderCell(7)}
        {renderCell(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

// Check if game over
function isGameOver(winner, cells, nextValue) {
  //ToDo: this could be refactored
  if(winner) {
    return `Winner: ${winner}`;
  }
  if(cells.every(Boolean)) {
    return `Oops!: Its a tie`;
  }
  return `Next player: ${nextValue}`;
  
}

//check player turn
function calculateTurn(cells) {
  return cells.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

/* 
calculte winner,
the winning patterns are saved in an array, with the index
of top left cell starting at 0 and bottom right endng at 8.
ex. row 0 = [0, 1, 2] or column 0 = [0, 3, 6]
*/
function calculateWinner(cells) {
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningPatterns.length; i++) {
    const [a, b, c] = winningPatterns[i];
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}

function App() {
  return <Game />
}

export default App
