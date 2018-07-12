import React, { Component } from 'react';
import './App.css';
import Board from './components/board/Board';
import Game from './components/game/Game';

class App extends Component {
  render() {
    return (
      <div>
        <Game />
      </div>
    );
  }
}

export default App;
