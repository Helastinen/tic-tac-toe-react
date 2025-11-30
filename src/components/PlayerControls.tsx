import { useState } from "react";

import { Button, Grid } from "@mui/material";
import BarChartIcon from '@mui/icons-material/BarChart';

import GameStatsDialog from "./GameStatsDialog";
import { UI_TEXT } from "../constants/uiText";
import { PlayerControlsProps } from "../types/types";

const PlayerControls = ({ errors, players, gameStarted, gameStats, onStartGame }: PlayerControlsProps) => {
  const [openStatsDialog, setOpenStatsDialog] = useState(false);

  const handleStatsDialogOpen = () => setOpenStatsDialog(true);

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
  )
};

export default PlayerControls;