import React from 'react';
import './Square.css';
import '../game/Game';



function Square(props){

  if(props.winner){
    return (
      <div 
      className="square " 
      onClick={() => props.onClick()}
      >
          {props.value}
      </div>
    )
  } else{

   return (
      <div 
      className="square" 
      onClick={() => props.onClick()}
      >
          {props.value}
      </div>
    );  
   }  
 }


export default Square;


