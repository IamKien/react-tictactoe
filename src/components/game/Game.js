import React from 'react';
import Board from '../board/Board';
import Square from '../square/Square';
import '../board/Board.css';

class Game extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      history: [{ 
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xTurn: true,
      isSorted: false,
   
      
    };

    this.calculateWinner = this.calculateWinner.bind(this);
  }

  calculateWinner(squares){
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return {
        winner: squares[a],
        winningPos: lines[i]
       }
      }

    }
    return null;
  }

 
 
  getLocation = (move) => {
  const locationMap = {
      0: 'row: 1, col: 1',
      1: 'row: 1, col: 2',
      2: 'row: 1, col: 3',
      3: 'row: 2, col: 1',
      4: 'row: 2, col: 2',
      5: 'row: 2, col: 3',
      6: 'row: 3, col: 1',
      7: 'row: 3, col: 2',
      8: 'row: 3, col: 3',
    };

    return locationMap[move];
  };




  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    
    if(this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xTurn? "X" : "O";

    this.setState({
      history: history.concat([{
        squares: squares,
        currentLocation: this.getLocation(i),
      }]),
      xTurn: !this.state.xTurn,
      stepNumber: history.length,

    });
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xTurn: (step % 2) === 0,
    });
  }

  sortMove(){
    this.setState({
      isSorted: !this.state.isSorted,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);
   

  
    const moves = history.map((step, move) => {
      const currentLocation = step.currentLocation? `(${step.currentLocation})` : '';
      const desc = move? 'Go to move #' + move: 'Go to game start';
      const currentBold = move === this.state.stepNumber? "bold" : "";
      

      return(
         <li key={move}>
          <button 
          className={`${currentBold} button`}
          onClick={() => this.jumpTo(move)
          }>
          {desc} {currentLocation}
          </button>
        </li>
      )
    })

    let status;
    let winningPos;
    if(winner){
      status = "Winner: " + winner.winningPos;
      winningPos = winner.winningPos;
    } else if(this.state.stepNumber === 9)
      status = "It's a tie";
    else{
      status = "Next player: " + (this.state.xTurn ? "X" : "O");
    }


    return(
      <div className="game">
        <div className="game-board">
          <Board 
          squares={current.squares}
          winningPos={winningPos}
          onClick={(i) => this.handleClick(i)}
          />
          
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button className="button" 
            onClick={() => this.sortMove()}
          >
            Sort moves
          </button>
          <ol>{ this.state.isSorted? moves: moves.reverse()}</ol>
        </div>
      </div>
    )
  }
}

export default Game;


// function does not need this. works for global
// function calculateWinner(squares){
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];

//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
//       return squares[a];
//     }

//   }
//   return null;
// }

// const getLocation = (move) => {
//   const locationMap = {
//     0: 'row: 1, col: 1',
//     1: 'row: 1, col: 2',
//     2: 'row: 1, col: 3',
//     3: 'row: 2, col: 1',
//     4: 'row: 2, col: 2',
//     5: 'row: 2, col: 3',
//     6: 'row: 3, col: 1',
//     7: 'row: 3, col: 2',
//     8: 'row: 3, col: 3',
//   };

//   return locationMap[move];
// };
