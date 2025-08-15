import Button from '@mui/material/Button';

import { GameBoard, Cell, StatusProps, PlayerMark } from './types';
import togglePlayer from './utils';

const Status = ({ winningValue, nextPlayer, grid, onReset }: StatusProps) => {
  let message = "";

  const getMessage = (winningValue: Cell | undefined, grid: GameBoard) => {
    if (isTieGame(winningValue, grid)) {
      return <span>Tie game.</span>
    }
    
    if (winningValue) {
      return <span>Winner is <strong>{winningValue}</strong>.</span>
    }

    return <span>Next turn is <strong>{togglePlayer(nextPlayer)}</strong>.</span>
  }
  return (
    <p>
      {getMessage(winningValue, grid)}
      <Button
        variant="outlined"
        onClick={onReset}
        sx={{margin: "1rem"}}
      >
        New Game
      </Button>
    </p>
  )
}

const isTieGame = (winningValue: Cell | undefined, grid: GameBoard) => !winningValue && grid.every(item => item !== null);

export default Status;