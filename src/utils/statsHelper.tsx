import { GameHistoryStats, GameStats, GameStatus, PlayerMark } from "../types/types";

export const defaultGameStats: GameStats = {
  gameHistory: [],
  totalStats: {
    playerOneWins: 0,
    playerTwoWins: 0,
    ties: 0,
    aborted: 0,
  }
};

export const getSafeStats = (gameStats: GameStats | null): GameStats => {
  return {
    gameHistory: gameStats?.gameHistory ?? defaultGameStats.gameHistory,
    totalStats: gameStats?.totalStats ?? defaultGameStats.totalStats
  }
};

export const calculateAverageRoundWin = (gameHistory: GameHistoryStats[]) => {
  const completedGamesWithWinningMove = gameHistory.filter(
    game => game.status === GameStatus.completed && game.winningMove
  );
  const averageRoundWin = completedGamesWithWinningMove.reduce((sum, game) => 
    sum + (game.winningMove ?? 0), 0) /
    completedGamesWithWinningMove.length;
  console.log("AverageRoundWin: ", averageRoundWin);

  // round up to nearest two decimals
  return Math.round(averageRoundWin * 100) / 100;
};

export const getPlayerMarkWins = (
  gameHistory: GameHistoryStats[],
  playerMark: PlayerMark
) => gameHistory.filter(game => game.winningMark === playerMark).length;