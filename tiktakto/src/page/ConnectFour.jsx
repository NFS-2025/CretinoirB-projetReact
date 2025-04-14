import React, { useState } from "react";
import "./ConnectFour.css";

const ConnectFour = () => {
  // Tableau pour la grille de jeu 6x7, initialement rempli de `null`
  const [board, setBoard] = useState(Array(6).fill(Array(7).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState("Red");
  const [winner, setWinner] = useState(null);
  const [fallingPiece, setFallingPiece] = useState(null);

  const handleMove = (colIndex) => {
    if (winner) return; // Si quelqu'un a gagné, ne pas permettre de jouer

    // Trouver la première ligne vide (du bas vers le haut)
    const rowIndex = getAvailableRow(colIndex);
    if (rowIndex === -1) return; // Si la colonne est pleine, ne rien faire

    // Mettre à jour l'état de la grille avec la nouvelle pièce
    const newBoard = [...board];
    newBoard[rowIndex] = [...newBoard[rowIndex]];
    newBoard[rowIndex][colIndex] = currentPlayer;

    setBoard(newBoard);
    setFallingPiece({ rowIndex, colIndex }); // Définir la pièce qui tombe

    // Vérifier si quelqu'un a gagné après un délai de 1 seconde (pour l'animation)
    setTimeout(() => {
      checkWinner(newBoard, rowIndex, colIndex);
      setCurrentPlayer(currentPlayer === "Red" ? "Yellow" : "Red");
      setFallingPiece(null);
    }, 1000); // Attendre l'animation de la pièce
  };

  // Fonction pour obtenir la première ligne vide d'une colonne donnée
  const getAvailableRow = (colIndex) => {
    for (let rowIndex = 5; rowIndex >= 0; rowIndex--) {
      if (board[rowIndex][colIndex] === null) {
        return rowIndex; // Retourner la ligne où la pièce peut être placée
      }
    }
    return -1; // Si la colonne est pleine, retourner -1
  };

  // Fonction pour vérifier si un joueur a gagné après chaque coup
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
      {winner && (
        <div className={`status ${winner === "Tie" ? "tie" : ""}`}>
          {winner === "Tie" ? "Match nul!" : `Le joueur ${winner} gagne!`}
        </div>
      )}
      <div className="board">
        {/* Affichage de la grille avec l'inversion des lignes */}
        {board
          .slice()
          .reverse() // Inverse l'affichage des lignes
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
