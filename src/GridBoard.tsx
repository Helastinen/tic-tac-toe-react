import Grid from "@mui/material/Grid";

import Square from "./Square";
import { GameBoard, GridBoardProps, InteractiveGridBoardProps, isInteractiveGridBoardProps, PlayerMark } from "./types";
import togglePlayer from "./utils";

const GridBoard = (props: GridBoardProps) => {
  console.log("<GridBoard> gridBoard: ", props.grid);
  const { grid } = props;

  let nextPlayer: PlayerMark | undefined;
  let onPlay: ((nextGrid: GameBoard, nextPlayer: PlayerMark) => void) | undefined;
  let winningLine: number[] | undefined;

  if (isInteractiveGridBoardProps(props)) {
    nextPlayer = props.nextPlayer;
    onPlay = props.onPlay;
    winningLine = props.winningLine;
  }

  const handleClick = (i: number) => {
    // do nothing if square has already value or game has ended
    if (grid[i] || winningLine || !nextPlayer) return;

    const nextGrid = [...grid];
    nextGrid[i] = togglePlayer(nextPlayer);
    onPlay?.(nextGrid, nextPlayer);
  }

  return (
    <Grid container spacing={2} sx={{ minWidth: 250, maxWidth: 300, margin: "0 auto" }}>
      {[0,1,2].map(row => (
        <Grid item xs={12} key={row}>
          <Grid container spacing={2}>
            {[0,1,2].map(col => {
              const i = row * 3 + col;
              return (
                <Grid item key={i}>
                  <Square
                    onSquareClick={() => handleClick(i)}
                    index={i}
                    value={props.grid[i]}
                    winningLine={winningLine}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}

export default GridBoard;