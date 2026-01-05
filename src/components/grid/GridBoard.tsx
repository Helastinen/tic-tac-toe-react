import Grid from "@mui/material/Grid";

import Square from "./Square";
import { GridBoardProps, isInteractiveGridBoardProps } from "../../types/types";

const GridBoard = (props: GridBoardProps) => {
  // console.log("<GridBoard> gridBoard: ", props.grid);
  const { grid, disabled, invalidMove, latestMove } = props;

  const { OnPlayerMove, winningLine } = isInteractiveGridBoardProps(props)
    ? props
    : {
      OnPlayerMove: undefined,
      winningLine: undefined,
    };

  const className = !isInteractiveGridBoardProps(props)
    ? "move-history-gridboard"
    : "";

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
          index={i}
          invalidMove={invalidMove}
          latestMove={latestMove === i}
          onSquareClick={() => OnPlayerMove?.(i)}
          value={value}
          winningLine={winningLine}
        />
      ))}
    </Grid>
  );
};

export default GridBoard;