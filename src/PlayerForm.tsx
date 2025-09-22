import Grid from "@mui/material/Grid";
import { PlayerFormProps, Players } from "./types";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import { useState } from "react";

import GameStatsDialog from "./GameStatsDialog";

const PlayerForm = ({ players, setPlayers, onStartGame, gameStarted, gameStats }: PlayerFormProps) => {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [openStatsDialog, setOpenStatsDialog] = useState(false);

  // console.log("<PlayerForm> players: ", players);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    // console.log("<PlayerForm> e: ", e);
    const {name, value} = e.target;
    validate(value);
    setPlayers(prev => ({ ...prev, [name]: value }) as Players)
  };

  const handleStatsDialogOpen = () => {
    setOpenStatsDialog(true);
  }

  const handleStatsDialogClose = () => {
    setOpenStatsDialog(false);
  }

  const validate = (input: string) => {
    const trimmedInput = input.trim();

    if (trimmedInput === "") {
      setError(true);
      setHelperText("This field is required");
    }
    else if (trimmedInput.length > 20) {
      setError(true);
      setHelperText("Maximum 20 characters");
    }
    else if (trimmedInput.length < 3) {
      setError(true);
      setHelperText("Minimum 3 characters");
    }
    else {
      setError(false);
      setHelperText("");
    }
  };

  return (
    <>
      <Grid 
        container
        spacing={1}   
        sx={{ justifyContent: "center",alignItems: "center" }}
      >
        <Grid size={{xs: 12, md: 3}}>
          {!gameStarted && <Typography color="primary" >Enter players:</Typography>}
          <Grid 
            container
            spacing={0}   
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <TextField
              disabled={gameStarted}
              error={error}
              helperText={helperText}
              id="One"
              name="playerOne"
              label="Player One (X)"
              variant="outlined"
              sx={{ margin: "1rem" }}
              onChange={handleChange}
            ></TextField>
            <TextField
              disabled={gameStarted}
              error={error}
              helperText={helperText}
              id="playerTwo"
              name="playerTwo"
              label="Player Two (O)"
              variant="outlined"
              sx={{ margin: "1rem" }}
              onChange={handleChange}
            ></TextField>
          </Grid>
        </Grid>
        <Grid
          size={{xs: 12, md: 3}}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            disabled={error}
            variant="contained"
            onClick={() => onStartGame(players)}
            sx={{ margin: "1rem" }}
          >
            {gameStarted ? "New Game" : "Start game"}
          </Button>
          <Button variant="outlined" onClick={handleStatsDialogOpen}>Stats</Button>
          <GameStatsDialog 
            open={openStatsDialog}  
            onClose={handleStatsDialogClose}
            gameStats={gameStats}
          >
          </GameStatsDialog>
        </Grid>
      </Grid>
    </>
  )
}

export default PlayerForm;