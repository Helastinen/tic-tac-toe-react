import Grid from "@mui/material/Grid";
import { PlayerFormProps, Players } from "./types";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import { useState } from "react";

import GameStatsDialog from "./GameStatsDialog";

const PlayerForm = ({ players, setPlayers, onStartGame, gameStarted, gameStats }: PlayerFormProps) => {
  const [errors, setErrors] = useState<({ [key: string]: boolean})>({
    playerOne: false,
    playerTwo: false,
  });
  const [helperTexts, setHelperTexts] = useState<({ [key: string]: string })>({
    playerOne: "",
    playerTwo: "",
  });
  const [openStatsDialog, setOpenStatsDialog] = useState(false);

  // console.log("<PlayerForm> players: ", players);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    // console.log("<PlayerForm> e: ", e);
    const {name, value} = e.target;
    validate(name, value);
    setPlayers(prev => ({ ...prev, [name]: value }) as Players)
  };

  const handleStatsDialogOpen = () => {
    setOpenStatsDialog(true);
  }

  const handleStatsDialogClose = () => {
    setOpenStatsDialog(false);
  }

  const validate = (name: string, input: string) => {
    const trimmedInput = input.trim();

    let error = false;
    let text = "";

    if (trimmedInput === "") {
      error = true;
      text = "This field is required";
    }
    else if (trimmedInput.length > 20) {
      error = true;
      text = "Maximum 20 characters";
    }
    else if (trimmedInput.length < 3) {
      error = true;
      text = "Minimum 3 characters";
    }

    setErrors({...errors, [name]: error});
    setHelperTexts({...helperTexts, [name]: text});
  };

  return (
    <>
      <Grid 
        container
        spacing={1}   
        sx={{ justifyContent: "space-evenly", alignItems: "center" }}
      >
        <Grid size={{ xs: 12 }}>
          {!gameStarted && <Typography color="primary" >Enter players:</Typography>}
          <Grid 
            container
            spacing={0}   
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <TextField
              disabled={gameStarted}
              error={errors.playerOne}
              helperText={helperTexts.playerOne}
              id="One"
              name="playerOne"
              label="Player One (X)"
              variant="outlined"
              sx={{ margin: "1rem" }}
              onChange={handleChange}
            ></TextField>
            <TextField
              disabled={gameStarted}
              error={errors.playerTwo}
              helperText={helperTexts.playerTwo}
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
          size={{ xs: 12 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            disabled={errors.playerOne || errors.playerTwo}
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