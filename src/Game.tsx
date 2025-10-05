import Typography from "@mui/material/Typography";
import { useState } from "react";

import GridBoard from "./GridBoard";
import PlayerForm from "./PlayerForm";
import MoveHistory from "./MoveHistory";
import Status from "./Status";

import { 
  Cell,
  GameBoard,
  GameStats,
  MoveHistoryType,
  PlayerMark,
  Players,
  WinningLine,
  WinningLines,
  WinningResult
} from "./types";
import { isTieGame, togglePlayer } from "./utils";

const Game = () => {
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
    gamesPlayed: 0,
    playerOneWins: 0,
    playerTwoWins: 0,
    ties: 0,
    aborted: 0,
  });

  const currentGrid: GameBoard = moveHistory[moveHistory.length - 1];
  const winningValue: Cell | undefined = winningResult?.cell;
  const winningLine: WinningLine | undefined = winningResult?.winningLine;

  console.log("----------NEW RENDER--------");;
  // console.log("<Game> players: ", players);
  // console.log("<Game> moveHistory: ", moveHistory);
  console.log("<Game> gameStats: ", gameStats);

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
  }

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

  if (!currentGrid) return <div>Loading board...</div>;

  return (
    <>
      <Typography 
        variant="h1"
        color="primary"
        sx={{ textAlign:"center", margin:"1rem", fontSize: "4rem" }}
      >
        Tic-Tac-Toe
      </Typography>
      <PlayerForm 
        players={players}
        setPlayers={setPlayers}
        onStartGame={(players) => handleStartGame(players)}
        gameStarted={gameStarted}
        gameStats={gameStats}
      ></PlayerForm>
      <Status 
        winningValue={winningValue}
        nextPlayer={nextPlayer}
        players={players}
        grid={currentGrid}
        gameStarted={gameStarted}
        moveHistory={moveHistory}
      />
      <div className="board">
        <GridBoard
          disabled={!gameStarted}
          mode="interactive"
          winningLine={winningLine}
          nextPlayer={nextPlayer}
          grid={currentGrid}
          OnPlayerMove={handlePlayerMove}
        />
      </div>
      <div className="game-info">
        <MoveHistory moveHistory={moveHistory} players={players} />
      </div>

    </>
  )
};

const calculateWinningResult = (grid: GameBoard) => {
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
}

const calculateStats = (gameStats: GameStats, winningValue: Cell | undefined = undefined, grid: GameBoard = [], gameAborted: boolean): GameStats => {
  const updatedStats = { ...gameStats, gamesPlayed: gameStats.gamesPlayed + 1 };

  if (gameAborted) {
    console.log("aborted updated");
    return { ...updatedStats, aborted: gameStats.aborted + 1 };
  }

  if (isTieGame(winningValue, grid)) {
    console.log("ties updated");
    return { ...updatedStats, ties: gameStats.ties + 1 };
  }

  if (winningValue === PlayerMark.X) {
    console.log("winningValue X updated");
    return { ...updatedStats, playerOneWins: gameStats.playerOneWins + 1 };
  }

  if (winningValue === PlayerMark.O) {
    console.log("winningValue O updated");
    return { ...updatedStats, playerTwoWins: gameStats.playerTwoWins + 1 };
  }

  return updatedStats;
}

export default Game;