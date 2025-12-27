import Grid from "@mui/material/Grid";

import Square from "./Square";
import { GridBoardProps, isInteractiveGridBoardProps } from "../types/types";

const GridBoard = (props: GridBoardProps) => {
  // console.log("<GridBoard> gridBoard: ", props.grid);
  const { grid, disabled } = props;

  const { currentPlayer, OnPlayerMove, winningLine } = isInteractiveGridBoardProps(props)
    ? props
    : {
      currentPlayer: undefined,
      OnPlayerMove: undefined,
      winningLine: undefined
    };

  const className = !isInteractiveGridBoardProps(props)
    ? "move-history-gridboard"
    : "";

  const handleClick = (i: number) => {
    // do nothing if square has already value or game has ended
    if (disabled || grid[i] || winningLine || !currentPlayer) return;

    const updatedGrid = [...grid];
    updatedGrid[i] = currentPlayer;
    OnPlayerMove?.(updatedGrid, currentPlayer);
  };

  return (
    <Grid
      container
      data-testid="game-grid"
      className={className}
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 2,
        minWidth: "var(--board-width)",
        maxWidth: 300,
        margin: "0 auto"
      }}
    >
      {grid.map((value, i) => (
        <Square
          key={i}
          disabled={disabled}
          onSquareClick={() => handleClick(i)}
          index={i}
          value={value}
          winningLine={winningLine}
        />
      ))}
    </Grid>
  );
};

export default GridBoard;