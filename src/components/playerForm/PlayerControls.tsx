import { useState } from "react";

import { Button, Grid } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonIcon from "@mui/icons-material/Person";

import GameStatsDialog from "../GameStatsDialog";
import { UI_TEXT } from "../../constants/uiText";
import { PlayerControlsProps } from "../../types/types";

const PlayerControls = ({
  errors,
  players,
  gameStats,
  onStartGame,
  onEditPlayers,
  fetchStats
}: PlayerControlsProps) => {
  const [openStatsDialog, setOpenStatsDialog] = useState(false);

  const handleStatsDialogOpen = () => {
    setOpenStatsDialog(true);
    // open dialog even if fetchStats hasn't returned
    void fetchStats();
  };
  const handleStatsDialogClose = () => setOpenStatsDialog(false);

  return (
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
        sx={{ margin: "1rem 0.5rem 0.5rem" }}
      >
        {UI_TEXT.GAME.NEW}
      </Button>
      <Button
        variant="outlined"
        startIcon={<PersonIcon />}
        onClick={() => onEditPlayers()}
        sx={{
          margin: "1rem 0.5rem 0.5rem",
          backgroundColor: "white"
        }}
      >
        {UI_TEXT.GAME.EDIT_PLAYERS}
      </Button>
      <Button
        variant="outlined"
        startIcon={<BarChartIcon />}
        onClick={handleStatsDialogOpen}
        sx={{
          margin: "1rem 0.5rem 0.5rem",
          backgroundColor: "white"
        }}
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
  );
};

export default PlayerControls;