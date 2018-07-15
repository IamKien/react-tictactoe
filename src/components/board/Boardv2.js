import React from 'react';
import './Board.css';
import Square from '../square/Squarev2';
import Game from '../game/Gamev2';

function Board(props){

  // take the Square component and render it
  function renderSquare(row, col){
    return(
      <Square 
        value={props.squares[row][col].value}
        onClick={()=> props.onClick(row, col)}
       />
    )
  }

  function createBoard(row, col){
    let board = [];
    for (let i = 0; i < row; i++) {
      let cells = [];
      for (let j = 0; j < col; j++) {
        cells.push(renderSquare(i, j));
      }
      board.push(
        <div key={i} className="board-row">
          {cells}
        </div>
      )
    }
    return board;
  }

  return(
    <div>
      {createBoard(3, 3)}
    </div>
  );
}

export default Board;