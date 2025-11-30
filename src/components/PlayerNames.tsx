import { PlayerMark, PlayerNamesProps } from "../types/types";

import StarIcon from '@mui/icons-material/Star';

const PlayerNames = ({ currentPlayer, players }: PlayerNamesProps) => (
  <div className="player-form-player-name">
    {currentPlayer === PlayerMark.X ? (
      <>
        <span className="player-form-player-one">
          <StarIcon
            color="primary"
            fontSize="small"
            aria-label="current player indicator"
            sx={{ verticalAlign: "text-bottom" }}
          />&nbsp;<strong>{players?.playerOne}</strong></span>
        <span>{players?.playerTwo}</span>
      </>
    ) : (
      <>
        <span className="player-form-player-one">{players?.playerOne}</span>
        <span>
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