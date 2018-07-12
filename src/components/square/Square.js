import React from 'react';
import './Square.css';
import '../game/Game';



class Square extends React.Component {

  render(){
    const newHistory = this.props.history;
    const newstepNumber = this.props.stepNumber;

    let squareBold;

    const newMoves = newHistory.map((step, move) => {
      const squareBold = move === this.props.newstepNumber? "box bold" : "box";

    

    })

   return (
      <button className={`${squareBold} button`} 
      onClick={this.props.onClick}
      >
        {this.props.value}
      </button>
    );


    
 }
}

export default Square;


