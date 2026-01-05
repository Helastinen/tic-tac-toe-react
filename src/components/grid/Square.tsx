import React from "react";
import { Nullable, PlayerMark, SquareProps, WinningLine } from "../../types/types";

const Square = ({
  onSquareClick, index, value, winningLine, disabled, invalidMove, latestMove
}: SquareProps) => {
  const getSquareBehavior = () => {
    const classes = ["square"];

    if (winningLine) {
      if (winningLine.includes(index)) {
        classes.push("square-winning");
      } else {
        classes.push("square-nonwinning");
      };
    }

    // used for squares in MoveHistory
    if (disabled) {
      classes.push("square-disabled");
    }

    if (value === PlayerMark.X) {
      classes.push("x-square");
    }

    if (value === PlayerMark.O) {
      classes.push("o-square");
    }

    if (invalidMove) { classes.push("square-invalid"); }

    if (latestMove) { classes.push("square-latest-move"); }

    return classes.join(" ");
  };

  const getAriaLabel = (index: number, value: Nullable<PlayerMark>, winningLine: WinningLine | undefined) => {
    const row = Math.floor(index / 3) + 1;
    const col = (index % 3) + 1;
    const content = value ? `contains ${value}` : "empty";
    const inWinningline = winningLine?.includes(index) ? "part of winning line": "";

    return `Square at row ${row}, column ${col}, ${content}, ${inWinningline}`;
  };

  return (
    <button
      aria-label={getAriaLabel(index, value, winningLine)}
      tabIndex={disabled ? -1 : 0}
      className={getSquareBehavior()}
      onClick={onSquareClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {value && <span className="square-pop">{value}</span>}
    </button>
  );
};

export default Square;