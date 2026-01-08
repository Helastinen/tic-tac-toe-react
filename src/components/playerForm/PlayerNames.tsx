import { PlayerMark, PlayerNamesProps } from "../../types/types";

import StarIcon from "@mui/icons-material/Star";

const PlayerNames = ({ currentPlayer, players }: PlayerNamesProps) => (
  <div className="player-form-player-names">
    {currentPlayer === PlayerMark.X ? (
      <>
        <span className="player-name">
          <StarIcon
            color="primary"
            fontSize="small"
            aria-label="current player indicator"
            sx={{ verticalAlign: "text-bottom" }}
          />&nbsp;<strong>{players?.playerOne}</strong></span>
        <span className="player-name">{players?.playerTwo}</span>
      </>
    ) : (
      <>
        <span className="player-name">{players?.playerOne}</span>
        <span className="player-name">
          <StarIcon
            color="primary"
            fontSize="small"
            aria-label="current player indicator"
            sx={{ verticalAlign: "text-bottom" }}
          />&nbsp;<strong>{players?.playerTwo}</strong></span>
      </>
    )}
  </div>
);

export default PlayerNames;