import { useState } from "react";

import { calculateStats, calculateWinningResult } from "../logic/GameLogic";
import { isTieGame, togglePlayer } from "../utils/utils";

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
  const [gameStats, setGameStats] = useState<GameStats>({ 
    playerOneWins: 0,
    playerTwoWins: 0,
    ties: 0,
    aborted: 0,
  });

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
      // setGameStats(calculateStats(gameStats, winValue, nextGrid));
      handleEndGame(winValue, nextGrid)
    }
  };

  const handleEndGame = (
    winValue: Cell | undefined = undefined,
    nextGrid: GameBoard = [],
    aborted: boolean = false,
  ) => {
    console.log("<Game> -> handleEndGame() triggered!");
    setGameStats(calculateStats(gameStats, winValue, nextGrid, aborted));
    setGameStarted(false);
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