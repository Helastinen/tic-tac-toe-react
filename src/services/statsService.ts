import axios from "axios";
import { CONFIG } from "../constants/config";
import { GameHistoryStats, GameStats, TotalStats } from "../types/types";

export const getGameStats = async (): Promise<GameStats> => {
  const [gameHistoryRes, totalStatsRes] = await Promise.all([
    axios.get<GameHistoryStats[]>(`${CONFIG.API_BASE_URL}/gameHistory`),
    axios.get<TotalStats>(`${CONFIG.API_BASE_URL}/totalStats`),
  ]);
  
  return {
    gameHistory: gameHistoryRes.data,
    totalStats: totalStatsRes.data
  };
};

export const updateTotalStats = 
  async (updatedTotalStats: TotalStats): Promise<TotalStats> => {
    return axios.put(`${CONFIG.API_BASE_URL}/totalStats`, updatedTotalStats);
};

export const updateGameHistoryStats = 
  async (gameResult: GameHistoryStats): Promise<GameHistoryStats> => {
    return axios.post(`${CONFIG.API_BASE_URL}/gameHistory`, gameResult);
};