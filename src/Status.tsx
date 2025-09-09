import Button from '@mui/material/Button';

import { GameBoard, Cell, StatusProps, PlayerMark } from './types';
import togglePlayer from './utils';

const Status = ({ winningValue, nextPlayer, players, grid, gameStarted, history }: StatusProps) => {
  const getNextPlayerName = (): string | undefined => {
    return togglePlayer(nextPlayer) === PlayerMark.X ? players?.player1 : players?.player2;
  };

  const getMessage = (winningValue: Cell | undefined, grid: GameBoard) => {
    if (isTieGame(winningValue, grid)) {
      return <span>Tie game.</span>
    }
    
    if (winningValue) {
      return <span>Winner is <strong>{winningValue}</strong>.</span>
    }

    return <span>Turn <strong>{history.length}</strong>: You're up <strong>{getNextPlayerName()}</strong>.</span>
  };

  return (
    <p>
      {gameStarted && getMessage(winningValue, grid)}
    </p>
  )
}

const isTieGame = (winningValue: Cell | undefined, grid: GameBoard) => !winningValue && grid.every(item => item !== null);

export default Status;