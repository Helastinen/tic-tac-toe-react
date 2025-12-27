import axios from "axios";
import { CONFIG } from "../constants/config";
import { GameHistoryStats, GameStats, TotalStats } from "../types/types";

export const getGameStats = async (): Promise<GameStats> => {
  const [gameHistoryRes, totalStatsRes] = await Promise.all([
    axios.get<GameHistoryStats[]>(`${CONFIG.API_BASE_URL}/${CONFIG.API_GAMEHISTORY}`),
    axios.get<TotalStats>(`${CONFIG.API_BASE_URL}/${CONFIG.API_TOTALSTATS}`),
  ]);

  /* console.log("FE -> getGameStats(): ", {
    gameHistory: gameHistoryRes.data,
    totalStats: totalStatsRes.data
  });*/

  return {
    gameHistory: gameHistoryRes.data,
    totalStats: totalStatsRes.data
  };
};

export const updateGameHistoryStats =
  async (gameResult: GameHistoryStats): Promise<GameHistoryStats> => {
    const res = await axios.post<GameHistoryStats>(
      `${CONFIG.API_BASE_URL}/${CONFIG.API_GAMEHISTORY}`,
      gameResult
    );
    return res.data;
  };