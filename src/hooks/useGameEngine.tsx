import { useEffect, useState } from "react";
import axios from "axios";

import { calculateStats, calculateWinningResult } from "../logic/GameLogic";
import { isTieGame, togglePlayer } from "../utils/utils";
import { CONFIG } from "../constants/config";
import { getSafeStats } from "../utils/statsHelper";

import { 
  Cell,
  GameBoard,
  GameStats,
  MoveHistoryType,
  PlayerMark,
  Players,
  WinningResult
} from "../types/types";

export const useGameEngine = () => {
  const [moveHistory, setMoveHistory] = useState<MoveHistoryType>([Array(9).fill(null)]);
  const [nextPlayer, setNextPlayer] = useState<PlayerMark>(PlayerMark.O);
  const [players, setPlayers] = useState<Players>({
    playerOne: "Player One (X)",
    playerTwo: "Player Two (O)",
  });

  const [winningResult, setWinningResult] = useState<WinningResult>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameAborted, setGameAborted] = useState(false);
  const [gameStats, setGameStats] = useState<GameStats | null>(null);

  const safeStats = getSafeStats(gameStats);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get(`${CONFIG.API_BASE_URL}/stats`);
        setGameStats(res.data);
      }
      catch (error) {
        console.error("Failed to fetch stats: ", error);
      };
    } 
    getStats();
  }, []);

  const currentGrid: GameBoard = moveHistory[moveHistory.length - 1];
  const winningValue: Cell | undefined = winningResult?.cell;
  const winningLine = winningResult?.winningLine;

  const handleStartGame = (players: Players) => {
    setWinningResult(null);
    setNextPlayer(PlayerMark.O);
    setMoveHistory([Array(9).fill(null)]);
    setPlayers(players);
    setGameStarted(true);

    // game has been aborted, if user starts new game during existing game
    if (gameStarted) {
      setGameAborted(true);
      handleEndGame(undefined, [], true);
    } 
  };

  const handlePlayerMove = (nextGrid: GameBoard, nextPlayer: PlayerMark) => {
    const result = calculateWinningResult(nextGrid);
    const winValue: Cell | undefined = result?.cell;
    const tieGame = isTieGame(winValue, nextGrid);

    setNextPlayer(togglePlayer(nextPlayer));
    setMoveHistory([...moveHistory, nextGrid]);
    setWinningResult(result);
    console.log("<Game> -> handlePlayerMove(): result", result);
    console.log("<Game> -> handlePlayerMove(): winValue", winValue);

    if (result || tieGame) {
      handleEndGame(winValue, nextGrid);
    }
  };

  const handleEndGame = async (
    winValue: Cell | undefined = undefined,
    nextGrid: GameBoard = [],
    aborted: boolean = false,
  ) => {
    console.log("<Game> -> handleEndGame() triggered!");
    const updatedStats = (calculateStats(safeStats, winValue, nextGrid, aborted));
    setGameStats(updatedStats);
    setGameStarted(false);

    try {
      await axios.put(`${CONFIG.API_BASE_URL}/stats`, updatedStats);
      console.log("Stats updated to server: ", updatedStats);
    } catch (error) {
      console.error("Failed to persist stats: ", error);
    }
  };

  return {
    moveHistory,
    nextPlayer,
    players,
    winningResult,
    gameStarted,
    gameStats,
    currentGrid,
    winningValue,
    winningLine,
    handlePlayerMove,
    handleStartGame,
    setPlayers,
  }
};