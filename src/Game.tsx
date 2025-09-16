import Typography from "@mui/material/Typography";
import { useState } from "react";

import GridBoard from "./GridBoard";
import MoveHistory from "./MoveHistory";
import PlayerForm from "./PlayerForm";
import Status from "./Status";

import { GameBoard, History, PlayerMark, Players, WinningLines, WinningResult } from "./types";
import togglePlayer from "./utils";


const Game = () => {
  const [history, setHistory] = useState<History>([Array(9).fill(null)]);
  const [nextPlayer, setNextPlayer] = useState<PlayerMark>(PlayerMark.O);
  const [players, setPlayers] = useState<Players>({
    player1: "Player 1 (X)",
    player2: "Player 2 (O)",
  });
  const [winningResult, setWinningResult] = useState<WinningResult>(null);
  const [gameStarted, setGameStarted] = useState(false);

  const currentGrid: GameBoard = history[history.length - 1];
  const winningValue = winningResult?.cell;
  const winningLine = winningResult?.winningLine;

  console.log("----------");;
  console.log("<Game> players: ", players);

  const handlePlayerMove = (nextGrid: GameBoard, nextPlayer: PlayerMark) => {
    setNextPlayer(togglePlayer(nextPlayer));
    setWinningResult(calculateWinningResult(nextGrid));
    setHistory([...history, nextGrid]);
  };

  const handleStartGame = (players: Players) => {
    setWinningResult(null);
    setNextPlayer(PlayerMark.O);
    setHistory([Array(9).fill(null)]);
    setPlayers(players);

    if (gameStarted) {
      // allow user to change player names
      setGameStarted(false);
    } else {
      setGameStarted(true);
    }
  };

  if (!currentGrid) return <div>Loading board...</div>;

  return (
    <>
      <Typography 
        variant="h4"
        color="primary"
        sx={{ textAlign:"center", margin:"1rem" }}
      >
        Tic-Tac-Toe
      </Typography>
      <PlayerForm 
        players={players}
        setPlayers={setPlayers}
        onStartGame={(players) => handleStartGame(players)}
        gameStarted={gameStarted}
      ></PlayerForm>
      <Status 
        winningValue={winningValue}
        nextPlayer={nextPlayer}
        players={players}
        grid={currentGrid}
        gameStarted={gameStarted}
        history={history}
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
        <MoveHistory history={history} players={players}/>
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

export default Game;