import React from "react";
import { Nullable, PlayerMark, SquareProps, WinningLine } from "./types";

const Square = ({ onSquareClick, index, value, winningLine, disabled }: SquareProps) => {
  const getSquareColor = () => {
    if (winningLine) {
      return winningLine.includes(index)
        ? "square square-winning" 
        : "square square-nonwinning";
    }

    // used for squares in MoveHistory
    if (disabled) return "square square-disabled";

    switch (value) {
      case PlayerMark.X:
        return "square x-square";
      case PlayerMark.O:
        return "square o-square";
      default:
        return "square";
    }

  }

  const getAriaLabel = (index: number, value: Nullable<PlayerMark>, winningLine: WinningLine | undefined) => {
    const row = Math.floor(index / 3) + 1;
    const col = (index % 3) + 1;
    const content = value ? `contains ${value}` : "empty";
    const inWinningline = winningLine?.includes(index) ? 'part of winning line': "";

    return `Square at row ${row}, column ${col}, ${content}, ${inWinningline}`;
  };

  return (
    <button 
      aria-label={getAriaLabel(index, value, winningLine)}
      tabIndex={disabled ? -1 : 0}
      className={getSquareColor()} onClick={onSquareClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {value}
    </button>
  )
}

export default Square;