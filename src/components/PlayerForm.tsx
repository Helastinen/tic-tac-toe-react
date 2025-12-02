import Grid from "@mui/material/Grid";
import { PlayerFormProps, Players } from "../types/types";

import { useState } from "react";

import PlayerSetup from "./PlayerSetup";
import PlayerNames from "./PlayerNames";
import PlayerControls from "./PlayerControls";

const PlayerForm = ({ players, setPlayers, onStartGame, gameStarted, gameStats, currentPlayer, fetchStats }: PlayerFormProps) => {
  const [errors, setErrors] = useState<({ [key: string]: boolean})>({
    playerOne: false,
    playerTwo: false,
  });
  const [helperTexts, setHelperTexts] = useState<({ [key: string]: string })>({
    playerOne: "",
    playerTwo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    // console.log("<PlayerForm> e: ", e);
    const {name, value} = e.target;
    validate(name, value);
    setPlayers(prev => ({ ...prev, [name]: value }) as Players)
  };

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
        {!gameStarted && 
          <PlayerSetup
            errors={errors}
            helperTexts={helperTexts}
            players={players}
            handleChange={handleChange}
          />
        }
        {gameStarted && <PlayerNames currentPlayer= {currentPlayer} players={players} />}
        <PlayerControls 
          errors={errors}
          players={players}
          gameStarted={gameStarted}
          gameStats={gameStats}
          onStartGame={onStartGame}
          fetchStats={fetchStats}
        />
      </Grid>
    </>
  )
}

export default PlayerForm;