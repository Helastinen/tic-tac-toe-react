import Grid from "@mui/material/Grid";

import Square from "./Square";
import { GameBoard, GridBoardProps, isInteractiveGridBoardProps, PlayerMark } from "../types/types";
import { togglePlayer } from "../utils/utils";

const GridBoard = (props: GridBoardProps) => {
  // console.log("<GridBoard> gridBoard: ", props.grid);
  const { grid, disabled } = props;

  let nextPlayer: PlayerMark | undefined;
  let OnPlayerMove: ((nextGrid: GameBoard, nextPlayer: PlayerMark) => void) | undefined;
  let winningLine: number[] | undefined;

  if (isInteractiveGridBoardProps(props)) {
    nextPlayer = props.nextPlayer;
    OnPlayerMove = props.OnPlayerMove;
    winningLine = props.winningLine;
  }

  const handleClick = (i: number) => {
    // do nothing if square has already value or game has ended
    if (disabled || grid[i] || winningLine || !nextPlayer) return;

    const nextGrid = [...grid];
    nextGrid[i] = togglePlayer(nextPlayer);
    OnPlayerMove?.(nextGrid, nextPlayer);
  }

  const getClassName = (): string => {
    if (!isInteractiveGridBoardProps(props)) {
      return "gridboard-move-history"
    }
    return "";
  }

  return (
    <Grid 
      container
      data-testid="game-grid"
      spacing={2}
      className={getClassName()}
      sx={{ 
        minWidth: 250,
        maxWidth: 300,
        margin: "0 auto",
      }}
    >
      {[0, 1, 2].map((row) => (
        <Grid size={{xs: 12}} key={row}> 
          <Grid container spacing={2}>
            {[0, 1, 2].map((col) => {
              const i = row * 3 + col;
              return (
                <Grid size={{xs: 4}} key={i}>
                  <Square
                    disabled={disabled}
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