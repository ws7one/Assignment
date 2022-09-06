import React from 'react';
import './task_1.css';

function Task_1({ row = 4, col = 4, NO_OF_RED_BOX = 2 }) {
  const generateGrid = () => {
    return new Array(row * col).fill(0).map(
      (k, i) =>
        <div
          className='game-cell'
          id={i}
        >
        </div>);
  }

  return (
    <div>
      <h1>Simple 4 x 4 Grid Game</h1>
      <div className='container'>
        <div className="game-container">
          <div className="game">
            {generateGrid()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task_1;
