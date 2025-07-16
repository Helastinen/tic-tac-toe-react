import React from "react";

import Square from "./Square";
import { GridBoardProps, InteractiveGridBoardProps, PlayerMark } from "./types";
import togglePlayer from "./utils";

const GridBoard = (props: GridBoardProps) => {
  console.log("<GridBoard> gridBoard: ", props.grid);

  const handleClick = (i: number) => {
    if (props.mode === "interactive") {
      const { grid, nextPlayer, winningLine, onPlay } = props as InteractiveGridBoardProps;

      // do nothing if square has already value or game has ended
      if (grid[i] || winningLine) return;
      const nextGrid = [...grid];
      nextGrid[i] = togglePlayer(nextPlayer);
      onPlay?.(nextGrid, nextPlayer);
    } 
  }

  const winningLine = props.mode === "interactive"
    ? (props as InteractiveGridBoardProps).winningLine
    : undefined;

  return (
    <div className="board">
      <div className="board-row">
        {[0,1,2,3,4,5,6,7,8].map(i => (
          <Square 
            onSquareClick={() => handleClick(i)}
            index={i}
            value={props.grid[i]}
            winningLine={winningLine}
          />
        ))}
        </div>
    </div>
  )
}

export default GridBoard;