import { Cell, GameBoard, TotalStats, PlayerMark, WinningLines, WinningResult } from "../types/types";
import { isTieGame } from "../utils/utils";

/**
 * Determines if the current grid contains a winning line.
 * @param grid - The current game board as an array of 9 cells.
 * @returns The winning result if found, otherwise null.
 */
export const calculateWinningResult = (grid: GameBoard) => {
  console.log(`calculateWinningResult () -> param grid: ${grid}`);
  const winningLines: WinningLines = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
  ];

 for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    
    if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
      const winningResult: WinningResult = {
        cell: grid[a], 
        winningLine: winningLines[i]
      }
      console.log("calculateWinningResult() -> winningResult: ", winningResult)
      return winningResult;
    }
  }
  console.log("No WinningResult yet");
  return null;
};

/**
 * Calculates updated game statistics based on the outcome of a game round.
 *
 * @param gameStats - The current cumulative game statistics.
 * @param winningValue - The player mark that won the game ('X' or 'O'), or undefined if no winner.
 * @param grid - The final state of the game board.
 * @param gameAborted - Whether the game was aborted before completion.
 * @returns A new TotalStats object with updated values for wins, ties, aborted games, and total games played.
 */
export const calculateTotalStats = (gameStats: TotalStats, winningValue: Cell | undefined = undefined, grid: GameBoard = [], gameAborted: boolean): TotalStats => {
  if (gameAborted) {
    console.log("aborted updated");
    return { ...gameStats, aborted: gameStats.aborted + 1 };
  }

  if (isTieGame(winningValue, grid)) {
    console.log("ties updated");
    return { ...gameStats, ties: gameStats.ties + 1 };
  }

  if (winningValue === PlayerMark.X) {
    console.log("winningValue X updated");
    return { ...gameStats, playerOneWins: gameStats.playerOneWins + 1 };
  }

  if (winningValue === PlayerMark.O) {
    console.log("winningValue O updated");
    return { ...gameStats, playerTwoWins: gameStats.playerTwoWins + 1 };
  }

  return {...gameStats};
};