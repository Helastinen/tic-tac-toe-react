import { useState } from "react";

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
import { getGameStats, updateGameHistoryStats } from "../services/statsService";

export const useGameEngine = () => {
  const [moveHistory, setMoveHistory] = useState<MoveHistoryType>([Array(9).fill(null)]);
  const [currentPlayer, setCurrentPlayer] = useState<PlayerMark>(PlayerMark.X);
  const [players, setPlayers] = useState<Players>({
    playerOne: UI_TEXT.PLAYER_FORM.PLAYER_ONE_LABEL,
    playerTwo: UI_TEXT.PLAYER_FORM.PLAYER_TWO_LABEL,
  });

  const [winningResult, setWinningResult] = useState<WinningResult>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [, setGameAborted] = useState(false);
  const [gameStats, setGameStats] = useState<GameStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [invalidMove, setInvalidMove] = useState<boolean>(false);

  const clearError = () => setError(null);
  const safeStats = getSafeStats(gameStats);

  const currentBoard: GameBoard = moveHistory[moveHistory.length - 1];
  const winningValue: Cell | undefined = winningResult?.cell;
  const winningLine = winningResult?.winningLine;

  const fetchStats = async (): Promise<void> => {
    try {
      const gameStats = await getGameStats();
      setGameStats(gameStats);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch stats: ", error);
      setError(`Failed to fetch stats: ${String(error)}`);
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
      void handleEndGame(undefined, [], true);
    }
  };

  const handlePlayerMove = (index: number) => {
    const updatedBoard = [...currentBoard];
    // console.log("[useGameLogic] -> handlePlayerMove() -> updatedBoard: ", updatedBoard);

    // check if illegal move (meaning square already has value, game has ended)
    if ( updatedBoard[index] !== null || winningLine || !gameStarted ) {
      setInvalidMove(true);
      setTimeout(() => setInvalidMove(false), 500);
      return;
    }

    updatedBoard[index] = currentPlayer;

    const result = calculateWinningResult(updatedBoard);
    const winValue: Cell | undefined = result?.cell;
    const tieGame = isTieGame(winValue, updatedBoard);

    setCurrentPlayer(togglePlayer(currentPlayer));
    setMoveHistory([...moveHistory, updatedBoard]);
    setWinningResult(result);
    console.log("<Game> -> handlePlayerMove(): result", result);
    console.log("<Game> -> handlePlayerMove(): winValue", winValue);

    if (result || tieGame) {
      void handleEndGame(winValue, updatedBoard);
    }
  };

  const handleEndGame = async (
    winValue: Cell | undefined = undefined,
    board: GameBoard = [],
    aborted = false,
  ) => {
    const updatedTotalStats = (calculateTotalStats(safeStats.totalStats, winValue, board, aborted));

    // calculate gameResult
    const playedMoves = board?.filter(square => square !== null).length ?? 0;
    const status = getGameStatus(aborted, winValue);
    const winningMove = getWinningMove(aborted, status, playedMoves);
    const winnerName = getWinnerName(players, winValue);

    const gameResult = {
      playerOne: players?.playerOne,
      playerTwo: players?.playerTwo,
      winnerName,
      winningMark: winValue,
      winningMove,
      status,
    };

    setGameStarted(false);

    try {
      await updateGameHistoryStats(gameResult);

      setGameStats(prev => ({
        gameHistory: [...(prev?.gameHistory ?? []), gameResult],
        // Todo should totalstats be requested from BE and then added to state?
        totalStats: updatedTotalStats,
      }));
      setError(null);
    } catch (error) {
      console.error("Failed to persist stats: ", error);
      setError(`Failed to persist stats: ${String(error)}`);
    }
  };

  const getGameStatus = (aborted: boolean, winValue?: Cell): GameStatus => {
    if (aborted) return GameStatus.Aborted;
    if (winValue) return GameStatus.CompletedWinner;
    return GameStatus.CompletedTie;
  };

  const getWinningMove = (aborted: boolean, status: GameStatus, playedMoves: number): number | undefined => {
    if (aborted || status === GameStatus.CompletedTie) return undefined;
    return playedMoves;
  };

  const getWinnerName = (players: Players, winValue?: Cell): string | undefined => {
    if (winValue === PlayerMark.X) return players?.playerOne;
    if (winValue === PlayerMark.O) return players?.playerTwo;
    return undefined;
  };

  return {
    moveHistory,
    currentPlayer,
    players,
    winningResult,
    gameStarted,
    gameStats,
    currentBoard,
    winningValue,
    winningLine,
    error,
    invalidMove,
    clearError,
    handlePlayerMove,
    handleStartGame,
    handleEndGame,
    setPlayers,
    fetchStats,
  };
};