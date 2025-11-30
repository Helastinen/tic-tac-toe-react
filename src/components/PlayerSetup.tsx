import { Grid, TextField, Typography } from "@mui/material";
import { UI_TEXT } from "../constants/uiText";
import { Players, PlayerSetupProps } from "../types/types";

const PlayerSetup = ({ errors, helperTexts, players, handleChange }: PlayerSetupProps) => (
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
);

export default PlayerSetup;