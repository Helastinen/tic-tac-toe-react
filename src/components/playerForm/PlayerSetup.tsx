import { Grid, TextField } from "@mui/material";
import { UI_TEXT } from "../../constants/uiText";
import { PlayerSetupProps } from "../../types/types";

const PlayerSetup = ({ errors, helperTexts, players, handleChange }: PlayerSetupProps) => (
  <Grid size={{ xs: 12 }}>
    <Grid
      container
      spacing={0}
      className="player-setup-grid"
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