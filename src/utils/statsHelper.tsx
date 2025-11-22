import { TotalStats } from "../types/types";

export const defaultStats: TotalStats = {
  playerOneWins: 0,
  playerTwoWins: 0,
  ties: 0,
  aborted: 0,
};

export const getSafeStats = (stats: TotalStats | null): TotalStats => {
  return stats ?? defaultStats
};