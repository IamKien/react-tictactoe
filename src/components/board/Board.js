import React from 'react';
import Square from '../square/Square';
import './Board.css';

class Board extends React.Component {
  createBoard(row, col){
    const board = [];
    let cellCounter = 0;

    for (let i = 0; i < row; i += 1) {
      const columns = [];
      for (let j = 0; j < col; j += 1) {
        columns.push(this.renderSquare(cellCounter++));
      }
      board.push(
        <div key={i} className="container" >
          {columns}
        </div> );
    }
    return board;
  }

  renderSquare(i){

    return(
      
        <Square 
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
     
    )
  }

  
  render() {
    return (
    
        <div>
          {this.createBoard(3, 3)}
        </div>
    )
  }
}


export default Board;
