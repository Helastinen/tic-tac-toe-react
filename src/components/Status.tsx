import { UI_TEXT } from '../constants/uiText';
import { Cell, StatusProps, PlayerMark } from '../types/types';
import { isTieGame } from '../utils/utils';

const Status = ({ winningValue, currentPlayer, players, grid, gameStarted, moveHistory }: StatusProps) => {
  const getCurrentPlayerName = (): string | undefined => {
    return currentPlayer === PlayerMark.X ? players?.playerOne : players?.playerTwo;
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
      return <span data-testid="tie-status"><strong>{UI_TEXT.STATUS.TIE}!</strong></span>
    }
    
    if (winningValue) {
      return (
        <span data-testid="winner-status">
          Winner is <strong>{getWinningPlayerName(winningValue)}</strong> on turn {moveHistory.length - 1}.
        </span>
      )
    }

    return (
      <span data-testid="turn-status">
        <strong>Turn {moveHistory.length}:</strong> You&apos;re up <strong>{getCurrentPlayerName()}</strong> ({currentPlayer}).
      </span>
    )
  };

  const message = generateStatusMessage();

  return message ? <p className="status">{message}</p> : null;
};

export default Status;