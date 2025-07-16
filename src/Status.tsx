import React from 'react';
import { Grid, Cell, StatusProps, PlayerMark } from './types';
import togglePlayer from './utils';

const Status = ({ winningValue, nextPlayer, grid, onReset }: StatusProps) => {
  if (isTieGame(winningValue, grid)) {
    return <p>Tie game. <button onClick={onReset}>Play again</button></p>
  }
  
  if (winningValue) {
      return <p>Winner is {winningValue}. <button onClick={onReset}>Play again</button></p>
  }

  return <p>Next turn is {togglePlayer(nextPlayer)}.</p>
}

const isTieGame = (winningValue: Cell | undefined, grid: Grid) => !winningValue && grid.every(item => item !== null);

export default Status;