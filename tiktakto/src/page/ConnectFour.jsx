import React, { useState } from "react";
import "./ConnectFour.css";
import { Button } from "@mui/material";

const ConnectFour = () => {
  const [board, setBoard] = useState(Array(6).fill(Array(7).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState("Red");
  const [winner, setWinner] = useState(null);
  const [fallingPiece, setFallingPiece] = useState(null);

  const resetGame = () => {
    setBoard(Array(6).fill(Array(7).fill(null)));
    setCurrentPlayer("Red");
    setWinner(null);
  };

  const handleMove = (colIndex) => {
    if (winner) return;
    const rowIndex = getAvailableRow(colIndex);
    if (rowIndex === -1) return;

    const newBoard = [...board];
    newBoard[rowIndex] = [...newBoard[rowIndex]];
    newBoard[rowIndex][colIndex] = currentPlayer;

    setBoard(newBoard);
    setFallingPiece({ rowIndex, colIndex });

    setTimeout(() => {
      checkWinner(newBoard, rowIndex, colIndex);
      setCurrentPlayer(currentPlayer === "Red" ? "Yellow" : "Red");
      setFallingPiece(null);
    }, 1000);
  };

  const getAvailableRow = (colIndex) => {
    for (let rowIndex = 5; rowIndex >= 0; rowIndex--) {
      if (board[rowIndex][colIndex] === null) {
        return rowIndex;
      }
    }
    return -1;
  };

  const checkWinner = (board, row, col) => {
    const directions = [
      [
        [0, 1],
        [0, -1],
      ],
      [
        [1, 0],
        [-1, 0],
      ],
      [
        [1, 1],
        [-1, -1],
      ],
      [
        [1, -1],
        [-1, 1],
      ],
    ];

    for (let direction of directions) {
      let count = 1;
      for (let [dx, dy] of direction) {
        let x = row;
        let y = col;
        while (
          x + dx >= 0 &&
          x + dx < 6 &&
          y + dy >= 0 &&
          y + dy < 7 &&
          board[x + dx][y + dy] === currentPlayer
        ) {
          count++;
          x += dx;
          y += dy;
        }
      }
      if (count >= 4) {
        setWinner(currentPlayer);
        return;
      }
    }
    if (board.every((row) => row.every((cell) => cell !== null))) {
      setWinner("Tie");
    }
  };

  return (
    <div className="connect-four-game">
      <h1>Puissance 4</h1>
      <Button variant="contained" onClick={resetGame}>
        Rejouer
      </Button>
      {winner && (
        <div className={`status ${winner === "Tie" ? "tie" : ""}`}>
          {winner === "Tie" ? "Match nul!" : `Le joueur ${winner} gagne!`}
        </div>
      )}
      <div className="board">
        {board
          .slice()
          .reverse()
          .map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  className={`cell ${cell} ${
                    fallingPiece &&
                    fallingPiece.colIndex === colIndex &&
                    fallingPiece.rowIndex === rowIndex
                      ? "falling"
                      : ""
                  }`}
                  onClick={() => handleMove(colIndex)}
                />
              ))}
            </div>
          ))}
      </div>
      <div className="turn">
        <p>
          Tour du joueur :{" "}
          <span className={currentPlayer}>{currentPlayer}</span>
        </p>
      </div>
    </div>
  );
};

export default ConnectFour;
