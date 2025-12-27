import { Typography } from "@mui/material";
import { UI_TEXT } from "../constants/uiText";

const GameTitle = () => {
  return (
    <Typography
      variant="h1"
      color="primary"
      className="game-title"
    >
      {UI_TEXT.GAME.TITLE}
    </Typography>
  );
};

export default GameTitle;