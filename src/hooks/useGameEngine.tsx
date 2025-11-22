import { useEffect, useState } from "react";
import axios from "axios";

import { calculateTotalStats, calculateWinningResult } from "../logic/GameLogic";
import { isTieGame, togglePlayer } from "../utils/utils";
import { CONFIG } from "../constants/config";
import { getSafeStats } from "../utils/statsHelper";

import { 
  Cell,
  GameBoard,
  TotalStats,
  MoveHistoryType,
  PlayerMark,
  Players,
  WinningResult,
  GameStatus
} from "../types/types";
import { UI_TEXT } from "../constants/uiText";

export const useGameEngine = () => {
  const [moveHistory, setMoveHistory] = useState<MoveHistoryType>([Array(9).fill(null)]);
  const [currentPlayer, setCurrentPlayer] = useState<PlayerMark>(PlayerMark.O);
  const [players, setPlayers] = useState<Players>({
    playerOne: UI_TEXT.PLAYER_FORM.PLAYER_ONE_LABEL,
    playerTwo: UI_TEXT.PLAYER_FORM.PLAYER_TWO_LABEL,
  });

  const [winningResult, setWinningResult] = useState<WinningResult>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameAborted, setGameAborted] = useState(false);
  const [gameStats, setGameStats] = useState<TotalStats | null>(null);

  const safeStats = getSafeStats(gameStats);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get(`${CONFIG.API_BASE_URL}/totalStats`);
        setGameStats(res?.data ?? []);
      }
      catch (error) {
        console.error("Failed to fetch total stats: ", error);
      };
    } 
    getStats();
  }, []);

  const currentMove: GameBoard = moveHistory[moveHistory.length - 1];
  const winningValue: Cell | undefined = winningResult?.cell;
  const winningLine = winningResult?.winningLine;

  const handleStartGame = (players: Players) => {
    setWinningResult(null);
    setCurrentPlayer(PlayerMark.O);
    setMoveHistory([Array(9).fill(null)]);
    setPlayers(players);
    setGameStarted(true);

    // game has been aborted, if user starts new game during existing game
    if (gameStarted) {
      setGameAborted(true);
      handleEndGame(undefined, [], true);
    } 
  };

  const handlePlayerMove = (currentMove: GameBoard, currentPlayer: PlayerMark) => {
    const result = calculateWinningResult(currentMove);
    const winValue: Cell | undefined = result?.cell;
    const tieGame = isTieGame(winValue, currentMove);

    setCurrentPlayer(togglePlayer(currentPlayer));
    setMoveHistory([...moveHistory, currentMove]);
    setWinningResult(result);
    console.log("<Game> -> handlePlayerMove(): result", result);
    console.log("<Game> -> handlePlayerMove(): winValue", winValue);

    if (result || tieGame) {
      handleEndGame(winValue, currentMove);
    }
  };

  const handleEndGame = async (
    winValue: Cell | undefined = undefined,
    currentMove: GameBoard = [],
    aborted: boolean = false,
  ) => {
    console.log("<Game> -> handleEndGame() triggered!");
    const updatedTotalStats = (calculateTotalStats(safeStats, winValue, currentMove, aborted));

    const winningMove = currentMove?.filter(square => square != null).length;
    const status = aborted ? GameStatus.aborted : winValue ? GameStatus.completed : GameStatus.pending;
    const winnerName = 
      winValue === PlayerMark.X
        ? players?.playerOne
        : winValue === PlayerMark.O
        ? players?.playerTwo
        : undefined;

    const gameResult = {
      "playerOne": players?.playerOne,
      "playerTwo": players?.playerTwo,
      winnerName,
      "winningMark": winValue,
      "winningMove": winningMove,
      "status": status,
    }

    setGameStats(updatedTotalStats);
    setGameStarted(false);

    try {
      await axios.put(`${CONFIG.API_BASE_URL}/totalStats`, updatedTotalStats);
      console.log("totalStats updated to server: ", updatedTotalStats);
    } catch (error) {
      console.error("Failed to persist totalStats: ", error);
    }

    try {
      await axios.post(`${CONFIG.API_BASE_URL}/gameHistory`, gameResult);
      console.log("gameHistory updated to server: ", gameResult);
    } catch (error) {
      console.error("Failed to persist gameHistory: ", error);
    }
  };

  return {
    moveHistory,
    currentPlayer,
    players,
    winningResult,
    gameStarted,
    gameStats,
    currentMove,
    winningValue,
    winningLine,
    handlePlayerMove,
    handleStartGame,
    handleEndGame,
    setPlayers,
  }
};