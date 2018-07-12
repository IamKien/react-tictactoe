import React from 'react';
import Board from '../board/Board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  
  render() {
    return(
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    )
  }
}

export default Game;


/*
1) Display Board
2) X is first then O
3) Determine Winner

4) Display each players move
5) Add History



*/