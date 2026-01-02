import CircularProgress from "@mui/material/CircularProgress";

import GridBoard from "./components/grid/GridBoard";
import PlayerForm from "./components/playerForm/PlayerForm";
import MoveHistory from "./components/grid/MoveHistory";
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
    currentBoard,
    error,
    invalidMove,
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

  if (!currentBoard) return <CircularProgress />;

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
        grid={currentBoard}
        gameStarted={gameStarted}
        moveHistory={moveHistory}
      />
      <div className="board">
        <GridBoard
          disabled={!gameStarted}
          mode="interactive"
          winningLine={winningLine}
          currentPlayer={currentPlayer}
          grid={currentBoard}
          OnPlayerMove={handlePlayerMove}
          invalidMove={invalidMove}
        />
      </div>
      <div className="move-history">
        <MoveHistory moveHistory={moveHistory} players={players} />
      </div>
    </div>
  );
};

export default Game;