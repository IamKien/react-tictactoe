import React from 'react';
import './Board.css';
import Square from '../square/Squarev2';
import Game from '../game/Gamev2';

function Board(props) {
    function renderSquare(row,col) {
      return <Square value={props.squares[row][col].value} winner={props.squares[row][col].winner} onClick={() => props.onClick(row,col)}/>;
    }

    function renderSquares (row, col) {
      let render = [];
      for (let i = 0; i < row; i++) {
        let cells = [];
        for (let j = 0; j < col; j++) {
          cells.push(renderSquare(i,j));  
        }
        render.push(<div key={i} className="board-row">{ cells }</div>);
      }
      return render;
    }

    return (
      <div>
        {renderSquares(3,3)}
      </div>
    );
  }

export default Board;