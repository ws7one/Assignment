import React, { useState } from 'react';
import './task_1.css';

function Task_1({ row = 4, col = 4, NO_OF_RED_BOX = 2 }) {
    const [clickedIds, setClickedIds] = useState([]);

    const generateGrid = () => {
        return new Array(row * col).fill(0).map((k, i) => {
            if (clickedIds.includes(i)) {
                const clickedIndex = clickedIds.findIndex((id) => id === i);
                return (
                    <div
                        className={`game-cell clicked ${
                            clickedIds.length - 1 - clickedIndex <
                                NO_OF_RED_BOX && 'recently'
                        }`}
                        id={i}
                        key={i}
                    >
                        Box {clickedIndex + 1}
                    </div>
                );
            }

            return (
                <div
                    className="game-cell"
                    id={i}
                    key={i}
                    onClick={() => {
                        setClickedIds([...clickedIds, i]);
                    }}
                ></div>
            );
        });
    };

    return (
        <div>
            <h1>Simple 4 x 4 Grid Game</h1>
            <div className="container">
                <div className="game-container">
                    <div className="game">{generateGrid()}</div>
                </div>
            </div>
        </div>
    );
}

export default Task_1;
