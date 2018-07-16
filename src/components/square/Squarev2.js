import React from 'react';
import './Square.css'

function Square(props) {
    let style = {
      backgroundColor: '#00bcd4'
    };
    if (props.winner) {
      return (
        <button className="square" style={style} onClick={() => props.onClick()}>
          {props.value}
        </button>
      );        
    } else {
      return (
        <button className="square" onClick={() => props.onClick()}>
          {props.value}
        </button>
      );        
    }
  }

export default Square;