import Grid from "@mui/material/Grid";
import { PlayerFormProps, PlayerNames } from "./types";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import { useState } from "react";

const PlayerForm = ({onStartGame, gameStarted}: PlayerFormProps) => {
  const [playerNames, setPlayerNames] = useState<PlayerNames>({
    player1: "Player 1 (X)",
    player2: "Player 2 (O)",
  });
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  console.log("<PlayerForm> playerNames: ", playerNames);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    console.log("<PlayerForm> e: ", e);
    const {name, value} = e.target;
    validate(value);
    setPlayerNames(prev => ({ ...prev, [name]: value }) as PlayerNames)
  };

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
              id="player1"
              name="player1"
              label="Player 1 (X)"
              variant="outlined"
              sx={{ margin: "1rem" }}
              onChange={handleChange}
            ></TextField>
            <TextField
              disabled={gameStarted}
              error={error}
              helperText={helperText}
              id="player2"
              name="player2"
              label="Player 2 (O)"
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
            variant="outlined"
            onClick={() => onStartGame(playerNames)}
            sx={{ margin: "1rem" }}
          >
            {gameStarted ? "New Game" : "Start game"}
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default PlayerForm;