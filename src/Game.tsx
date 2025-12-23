import CircularProgress from "@mui/material/CircularProgress";

import GridBoard from "./components/GridBoard";
import PlayerForm from "./components/PlayerForm";
import MoveHistory from "./components/MoveHistory";
import Status from "./components/Status";

import { useGameEngine } from "./hooks/useGameEngine";
import GameTitle from "./components/GameTitle";
import ErrorBanner from "./components/ErrorBanner";

const Game = () => {
  const {
    moveHistory,
    currentPlayer,
    players,
    winningValue,
    winningLine,
    gameStarted,
    gameStats,
    currentMove,
    error,
    clearError,
    handlePlayerMove,
    handleStartGame,
    setPlayers,
    fetchStats,
  } = useGameEngine();

  //console.log("----------NEW RENDER--------");;
  // console.log("<Game> players: ", players);
  // console.log("<Game> moveHistory: ", moveHistory);
  // console.log("<Game> gameStats: ", gameStats);

  if (!currentMove) return <CircularProgress />;

  return (
    <div className="game-background">
      <GameTitle />
      {error && <ErrorBanner error={error} clearError={clearError} />}
      <PlayerForm 
        players={players}
        setPlayers={setPlayers}
        onStartGame={(players) => handleStartGame(players)}
        gameStarted={gameStarted}
        gameStats={gameStats}
        currentPlayer={currentPlayer}
        fetchStats={fetchStats}
      />
      <Status
        winningValue={winningValue}
        currentPlayer={currentPlayer}
        players={players}
        grid={currentMove}
        gameStarted={gameStarted}
        moveHistory={moveHistory}
      />
      <div className="board">
       <GridBoard
          disabled={!gameStarted}
          mode="interactive"
          winningLine={winningLine}
          currentPlayer={currentPlayer}
          grid={currentMove}
          OnPlayerMove={handlePlayerMove}
        />
      </div>
      <div className="move-history">
        <MoveHistory moveHistory={moveHistory} players={players} />
      </div>
    </div>
  );
};

export default Game;