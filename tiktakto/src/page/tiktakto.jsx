import React, { useState } from "react";

function TicTacToe() {
  const [board, setBoard] = useState([
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
  ]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const handleMove = (index) => {
    if (board[index] === " " && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      checkWinner(newBoard);
    }
  };

  const checkWinner = (board) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const condition of winConditions) {
      if (
        board[condition[0]] === board[condition[1]] &&
        board[condition[1]] === board[condition[2]] &&
        board[condition[0]] !== " "
      ) {
        setWinner(board[condition[0]]);
        return;
      }
    }
    if (!board.includes(" ")) {
      setWinner("Tie");
    }
  };

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          <div key={index} className="cell" onClick={() => handleMove(index)}>
            {cell}
          </div>
        ))}
      </div>
      {winner && (
        <div className={`status ${winner === "Tie" ? "tie" : ""}`}>
          {winner === "Tie" ? "It's a tie!" : `Player ${winner} wins!`}
        </div>
      )}
    </div>
  );
}

export default TicTacToe;
