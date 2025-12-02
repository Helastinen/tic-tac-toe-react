import { useEffect, useState } from "react";

import { calculateTotalStats, calculateWinningResult } from "../logic/GameLogic";
import { isTieGame, togglePlayer } from "../utils/utils";
import { getSafeStats } from "../utils/statsHelper";

import { 
  Cell,
  GameBoard,
  MoveHistoryType,
  PlayerMark,
  Players,
  WinningResult,
  GameStatus,
  GameStats,
} from "../types/types";
import { UI_TEXT } from "../constants/uiText";
import { getGameStats, updateGameHistoryStats, updateTotalStats } from "../services/statsService";

export const useGameEngine = () => {
  const [moveHistory, setMoveHistory] = useState<MoveHistoryType>([Array(9).fill(null)]);
  const [currentPlayer, setCurrentPlayer] = useState<PlayerMark>(PlayerMark.X);
  const [players, setPlayers] = useState<Players>({
    playerOne: UI_TEXT.PLAYER_FORM.PLAYER_ONE_LABEL,
    playerTwo: UI_TEXT.PLAYER_FORM.PLAYER_TWO_LABEL,
  });

  const [winningResult, setWinningResult] = useState<WinningResult>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameAborted, setGameAborted] = useState(false);
  const [gameStats, setGameStats] = useState<GameStats | null>(null);

  const safeStats = getSafeStats(gameStats);

  const currentMove: GameBoard = moveHistory[moveHistory.length - 1];
  const winningValue: Cell | undefined = winningResult?.cell;
  const winningLine = winningResult?.winningLine;

  const fetchStats = async () => {
    try {
      const gameStats = await getGameStats();
      setGameStats(gameStats);
    } catch (error) {
      console.error("Failed to fetch total stats: ", error);
      alert(`Failed to fetch total stats: ${error}`);
    }
  };

  const handleStartGame = (players: Players) => {
    setWinningResult(null);
    setCurrentPlayer(PlayerMark.X);
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
    // console.log("<Game> -> handleEndGame() triggered!");
    const updatedTotalStats = (calculateTotalStats(safeStats.totalStats, winValue, currentMove, aborted));

    const winningMove = currentMove?.filter(square => square != null).length;
    const status = aborted ? GameStatus.aborted : winValue ? GameStatus.completed : GameStatus.pending;
    const winnerName = 
      winValue === PlayerMark.X
        ? players?.playerOne
        : winValue === PlayerMark.O
        ? players?.playerTwo
        : undefined;

    const gameResult = {
      playerOne: players?.playerOne,
      playerTwo: players?.playerTwo,
      winnerName,
      winningMark: winValue,
      winningMove,
      status,
    }

    setGameStats(prev => ({
      gameHistory: [...(prev?.gameHistory ?? []), gameResult],
      totalStats: updatedTotalStats,
    }));
    setGameStarted(false);

    try {
      const updatedStats = await updateTotalStats(updatedTotalStats);
      console.log("totalStats updated to server: ", updatedStats);
    } catch (error) {
      console.error("Failed to persist totalStats: ", error);
      alert(`Failed to persist totalStats: ${error}`);
    }

    try {
      const updatedStats = await updateGameHistoryStats(gameResult);
      console.log("gameHistory updated to server: ", updatedStats);
    } catch (error) {
      console.error("Failed to persist gameHistory: ", error);
      alert(`Failed to persist gameHistory: ${error}`);
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
    fetchStats,
  }
};