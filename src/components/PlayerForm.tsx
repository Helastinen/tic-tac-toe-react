import Grid from "@mui/material/Grid";
import { PlayerFormProps, PlayerMark, Players } from "../types/types";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import BarChartIcon from '@mui/icons-material/BarChart';
import StarIcon from '@mui/icons-material/Star';

import { useState } from "react";

import GameStatsDialog from "./GameStatsDialog";
import { UI_TEXT } from "../constants/uiText";

const PlayerForm = ({ players, setPlayers, onStartGame, gameStarted, gameStats, currentPlayer }: PlayerFormProps) => {
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
        {!gameStarted && (
          <>
            <Grid size={{ xs: 12 }}>
              <Typography 
                color="primary"
                variant="h6"
                sx={{ textAlign:"center" }}
              >
                {UI_TEXT.PLAYER_FORM.ENTER_PLAYERS}
              </Typography>
              <Grid 
                container
                spacing={0}   
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <TextField
                  error={errors.playerOne}
                  helperText={helperTexts.playerOne}
                  id="playerOne"
                  name="playerOne"
                  label={players?.playerOne ?? UI_TEXT.PLAYER_FORM.PLAYER_ONE_LABEL}
                  variant="outlined"
                  sx={{ 
                    margin: "1rem",
                    backgroundColor: "white"
                  }}
                  onChange={handleChange}
                />
                <TextField
                  error={errors.playerTwo}
                  helperText={helperTexts.playerTwo}
                  id="playerTwo"
                  name="playerTwo"
                  label={players?.playerTwo ?? UI_TEXT.PLAYER_FORM.PLAYER_TWO_LABEL}
                  variant="outlined"
                  sx={{ 
                    margin: "1rem",
                    backgroundColor: "white"
                  }}  
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </>
        )}
        {gameStarted && (
        <div className="player-form-player-name">
          {currentPlayer === PlayerMark.X ? (
            <>
              <span className="player-form-player-one"><StarIcon color="primary" fontSize="small" />&nbsp;<strong>{players?.playerOne}</strong></span>
              <span>{players?.playerTwo}</span>
            </>
          ) : (
            <>
              <span className="player-form-player-one">{players?.playerOne}</span>
              <span>
                <StarIcon
                  color="primary"
                  fontSize="small"
                  sx={{ verticalAlign: "text-bottom" }}
                />&nbsp;<strong>{players?.playerTwo}</strong></span>
            </>
          )}
        </div>
        )}
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
            {gameStarted ? UI_TEXT.GAME.NEW : UI_TEXT.GAME.START}
          </Button>
          <Button 
            variant="outlined"
            startIcon={<BarChartIcon />}
            onClick={handleStatsDialogOpen}
            sx={{ backgroundColor: "white" }}
          >
            {UI_TEXT.GAME.STATS}
          </Button>
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