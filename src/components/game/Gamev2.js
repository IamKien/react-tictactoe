import React from 'react';
import Board from '../board/Boardv2';


class Game extends React.Component {
    constructor() {
      super();
      this.state = {
        history: [{
          squares: this.createSquares(3,3),
          movedLocation: null,
          player: null,
          isGameOver: false
        }],
        xIsNext: true,
        stepNumber: 0,
        isAscend: true
      }
    }

    handleClick(row,col) {
      let history = this.state.history.slice(0, this.state.stepNumber + 1);
      let current = history[history.length - 1];
      let isGameOver = current.isGameOver;
      const squares = current.squares;

      if (squares[row][col].value || isGameOver) {
        return;
      }

      squares[row][col].value = this.state.xIsNext ? 'X' : 'O';
      const winningSquares = calculateWinner(squares);
      let location = `(${row},${col})`;

      if (winningSquares) {
        for (let i = 0; i < winningSquares.length; i++) {
          squares[winningSquares[i][0]][winningSquares[i][1]].winner = true;
        }
        isGameOver = true;
      }
      this.setState({
        history: history.concat([{
          squares: squares,
          movedLocation: location,
          player: this.state.xIsNext ? 'X' : 'O',
          isGameOver: isGameOver
        }]),
        xIsNext: !this.state.xIsNext,
        stepNumber: history.length
      });
    }

    jumpTo(event,step) {
      event.preventDefault();
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) ? false : true,
      });
    }

    createSquares(numbersOfRows, numbersOfColumns) {
      let array = new Array(numbersOfRows);

      for (let i = 0; i < numbersOfRows; i++) {
        array[i] = new Array(numbersOfColumns);
        for (let j = 0; j < numbersOfColumns; j++) {
          array[i][j] = {
              column: j,
                row: i,
                value: null,
                winner: false
            };
        }
      }

      return array;
    };

    handleToggle() {
      this.setState({
        isAscend: !this.state.isAscend
      });
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winningSquares = calculateWinner(current.squares);
      const winner = this.state.xIsNext ? 'O' : 'X';

      let status;
      if (winningSquares) {
        status = 'Winner: ' + winner;
      } else if (this.state.stepNumber === 9) {
        status = 'Tie';          
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      const moves = history.map((step, move) => {
        const text = move ? `${step.player} moved to ${step.movedLocation}` : 'Game start';
        let link = null;
        
        if (move === this.state.stepNumber) {
          link = <p>{text}</p>;
        } else {
          link = <a href="#" onClick={(event) => this.jumpTo(event,move)}>{text}</a>
        }
        return (
          <li key={move}>
            {link}
          </li>
        );
      }, this);

      return (
        <div>
          <div className="game">
            <div className="game-board">
              <Board 
                squares={current.squares}
                onClick={(row,col) => this.handleClick(row,col)}
              />
            </div>
          </div>
          <div className="game-info">
            <button className="btn" onClick={() => this.handleToggle()}>
              { this.state.isAscend ? 'ASCEND' : 'DESCEND' }
            </button>
            <p>{status}</p>
            <ol>{ this.state.isAscend ? moves : moves.reverse() }</ol>
          </div>
        </div>
      );
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