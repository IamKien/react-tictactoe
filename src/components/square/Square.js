import React from 'react';
import './Square.css';
import Board from '../board/Board';


function Square(props) {
  return (
    <button className="box" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;