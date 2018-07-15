import React from 'react';
import Board from '../board/Boardv2';
import {createBoard} from '../board/Boardv2';

class Game extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      xTurn: true,
      squares: this.createSquares(3,3),
      stepNumber: 0,

    }

    
  }

  

  createSquares(numberOfRow, numberOfColumn){
    let board = new Array(numberOfRow);

    for (var i = 0; i < numberOfRow; i++) {
      board[i] = new Array(numberOfColumn);
      for (var j = 0; j < numberOfColumn; j++) {
        board[i][j] = {
          column: j,
          row: i,
          value: null,
        }
      }
    }
    return board;
  };

  handleClick(row, col){
    const squares = this.state.squares.slice();

    if( calculateWinner(squares) || squares[row][col].value){
      return;
    }
    
    squares[row][col].value = this.state.xTurn? "X" : "O";
    
    this.setState({
      squares: squares,
      xTurn: !this.state.xTurn,
    })
  }


  render(){
    const squares = this.state.squares;
    const winningSquares =  calculateWinner(squares);
    const winner = this.state.xTurn? "O" : "X";

    let status;
    if(winningSquares){
      status = "Winner is " + winner;
    } else{
      status = "The next player: " + (this.state.xTurn? "X" : "O");
    }


    return(
      <div className="game"> 
        <div className="game-board">
          <Board 
            squares={squares}
            onClick={(row,col) => this.handleClick(row,col)}
          />
        </div>
        <div className="game-info">
          {status}
        </div>
      </div>
    )
  }
}

export default Game;

function calculateWinner(squares){
    const lines = [
      [[0,0], [0,1], [0,2]],
      [[1,0], [1,1], [1,2]],
      [[2,0], [2,1], [2,2]],
      [[0,0], [1,0], [2,0]],
      [[0,1], [1,1], [2,1]],
      [[0,2], [1,2], [2,2]],
      [[0,0], [1,1], [2,2]],
      [[0,2], [1,1], [2,0]],
    ];
    function valueAt(row, col){
      return squares[row][col].value
    }
    for (var i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (valueAt(a[0],a[1]) && valueAt(a[0],a[1]) === 
          valueAt(b[0],b[1]) && valueAt(a[0],a[1]) === 
          valueAt(c[0],c[1])) {
        return lines[i];
    } 
   }
   return null;
  };