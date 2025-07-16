import React from "react";
import { PlayerMark, SquareProps } from "./types";

const Square = ({ onSquareClick, index, value, winningLine}: SquareProps) => {
  const getSquareColor = () => {
    if (winningLine?.includes(index)) return `square winning-square`;

    switch (value) {
      case PlayerMark.X:
        return "square x-square";
      case PlayerMark.O:
        return "square o-square";
      default:
        return "square";
    }
  }

  return (
    <button className={getSquareColor()} onClick={onSquareClick}>
      {value}
    </button>
  )
}

export default Square;