import Button from '@mui/material/Button';

import { GameBoard, Cell, StatusProps, PlayerMark } from './types';
import { isTieGame, togglePlayer } from './utils';

const Status = ({ winningValue, nextPlayer, players, grid, gameStarted, moveHistory }: StatusProps) => {
  const getNextPlayerName = (): string | undefined => {
    return togglePlayer(nextPlayer) === PlayerMark.X ? players?.playerOne : players?.playerTwo;
  };

  const getWinningPlayerName = (winningValue: Cell | undefined): string | undefined => {
    return winningValue === PlayerMark.X
      ? players?.playerOne
      : players?.playerTwo
  }

  const getMessage = (winningValue: Cell | undefined, grid: GameBoard) => {
    if (isTieGame (winningValue, grid)) {
      return <span>Tie game.</span>
    }
    
    if (winningValue) {
      return <span>Winner is <strong>{getWinningPlayerName(winningValue)}</strong> on turn {moveHistory.length - 1}.</span>
    }

    return <span>Turn <strong>{moveHistory.length}</strong>: You're up <strong>{getNextPlayerName()}</strong>.</span>
  };

  return (
    <p className="status">
      {gameStarted && getMessage(winningValue, grid)}
    </p>
  )
}

export default Status;