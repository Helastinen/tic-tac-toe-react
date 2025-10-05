import { Cell, StatusProps, PlayerMark } from './types';
import { isTieGame, togglePlayer } from './utils';

const Status = ({ winningValue, nextPlayer, players, grid, gameStarted, moveHistory }: StatusProps) => {
  const getNextPlayerName = (): string | undefined => {
    return togglePlayer(nextPlayer) === PlayerMark.X ? players?.playerOne : players?.playerTwo;
  };

  const getWinningPlayerName = (winner: Cell): string | undefined => {
    return winner === PlayerMark.X
      ? players?.playerOne
      : players?.playerTwo
  }

  const generateStatusMessage = () => {
    const isGameActiveOrEnded = gameStarted || moveHistory.length > 1;
  
    if (!isGameActiveOrEnded) return null;
    
    if (isTieGame (winningValue, grid)) {
      return <span>Tie game.</span>
    }
    
    if (winningValue) {
      return (
        <span>
          Winner is <strong>{getWinningPlayerName(winningValue)}</strong> on turn {moveHistory.length - 1}.
        </span>
      )
    }

    return (
      <span>
        Turn <strong>{moveHistory.length}</strong>: You're up <strong>{getNextPlayerName()}</strong>.
      </span>
    )
  };

  const message = generateStatusMessage();

  return message ? <p className="status">{message}</p> : null;
};

export default Status;