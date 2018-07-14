import React from 'react';
import './Square.css';
import '../game/Game';



function Square(props){

  if(props.highlight){
    return (
      <div 
      className="square " 
      style={{color: "red"}}
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


