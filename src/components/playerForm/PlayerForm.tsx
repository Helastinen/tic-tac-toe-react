import type React from "react";

import Grid from "@mui/material/Grid";
import { PlayerFormProps, Players } from "../../types/types";

import { useState } from "react";

import PlayerSetup from "./PlayerSetup";
import PlayerNames from "./PlayerNames";
import PlayerControls from "./PlayerControls";
import { UI_TEXT } from "../../constants/uiText";
import { Typography } from "@mui/material";

const PlayerForm = ({ players: _players, setPlayers, onStartGame, gameStats, currentPlayer, fetchStats }: PlayerFormProps) => {
  const [isEditingPlayers, setIsEditingPlayers] = useState(true);
  const [errors, setErrors] = useState<Record<string, boolean>>({
    playerOne: false,
    playerTwo: false,
  });
  const [helperTexts, setHelperTexts] = useState<Record<string, string>>({
    playerOne: "",
    playerTwo: "",
  });

  const handleChangeNames = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    // console.log("<PlayerForm> e: ", e);
    const { name, value } = e.target;
    validate(name, value);
    setPlayers(prev => ({ ...prev, [name]: value }) as Players);
  };

  const handleEditPlayers = () => {
    setIsEditingPlayers(!isEditingPlayers);
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

    setErrors({ ...errors, [name]: error });
    setHelperTexts({ ...helperTexts, [name]: text });
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        sx={{ justifyContent: "space-evenly", alignItems: "center" }}
      >
        <Grid size={12}>
          <Typography
            color="primary"
            variant="h6"
            className="player-setup-title"
          >
            {isEditingPlayers ? UI_TEXT.PLAYER_FORM.ENTER_PLAYERS : UI_TEXT.PLAYER_FORM.PLAYERS}
          </Typography>
        </Grid>
        {isEditingPlayers && (
          <Grid size={12}>
            <PlayerSetup
              errors={errors}
              helperTexts={helperTexts}
              players={_players}
              handleChange={handleChangeNames}
            />
          </Grid>
        )}
        {!isEditingPlayers && (
          <Grid size={12}>
            <PlayerNames currentPlayer= {currentPlayer} players={_players} />
          </Grid>
        )}
        <Grid size={12}>
          <PlayerControls
            errors={errors}
            players={_players}
            gameStats={gameStats}
            onStartGame={(players) => {
              onStartGame(players);
              setIsEditingPlayers(false);
            }}
            onEditPlayers={handleEditPlayers}
            fetchStats={fetchStats}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PlayerForm;