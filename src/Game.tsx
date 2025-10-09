import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import GridBoard from "./components/GridBoard";
import PlayerForm from "./components/PlayerForm";
import MoveHistory from "./components/MoveHistory";
import Status from "./components/Status";

import { useGameEngine } from "./hooks/useGameEngine";
import { UI_TEXT } from "./constants/uiText";

const Game = () => {
  const {
    moveHistory,
    nextPlayer,
    players,
    winningValue,
    winningLine,
    gameStarted,
    gameStats,
    currentGrid,
    handlePlayerMove,
    handleStartGame,
    setPlayers,
  } = useGameEngine();

  console.log("----------NEW RENDER--------");;
  // console.log("<Game> players: ", players);
  // console.log("<Game> moveHistory: ", moveHistory);
  console.log("<Game> gameStats: ", gameStats);

  if (!currentGrid) return <CircularProgress />;

  return (
    <>
      <Typography 
        variant="h1"
        color="primary"
        sx={{ 
          textAlign:"center",
          margin:"1rem",
          fontSize: "4rem"
        }}
      >
        {UI_TEXT.GAME.TITLE}
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
  );
};

export default Game;