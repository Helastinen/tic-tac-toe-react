import Grid from "@mui/material/Grid";

import GridBoard from "./GridBoard";
import { MoveHistoryProps } from "../types/types";
import Typography from "@mui/material/Typography";
import { UI_TEXT } from "../constants/uiText";

const MoveHistory = ({ moveHistory, players } : MoveHistoryProps) => {
  // show turns only if there have been at least two moves
  const hasHistory = moveHistory.length > 2;

  if(!hasHistory) return null;

  return (
    <> 
      <Typography 
        variant="h2"
        color="info"
        sx={{ 
          textAlign:"center",
          margin:"2rem 0 1rem 0",
          fontSize: "2rem",
        }}
      >
        {UI_TEXT.HISTORY.TITLE}
      </Typography>
      <Grid 
        container
        spacing={2} 
        sx={{
          justifyContent: "center",
          alignItems: "flex-start",
          wrap: "wrap"
        }}
      >
        {moveHistory.map((_, i) => { 
          if (i > 0 && i < moveHistory.length - 1) {
            return (
              <Grid
                key={i}
                size={{ xs:12, sm:4 }}
                sx={{
                  maxWidth: 200,
                  maxHeight: 200,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  }}
              >
                <div className="move-history-title">
                  Turn <strong>{i}</strong>:<br /> {i % 2 === 1 ? players?.playerOne : players?.playerTwo}
                </div>
                <div key={i} className="small-grid">
                  <GridBoard mode="moveHistory" grid={moveHistory[i]} disabled />
                </div>
              </Grid>
            )
          }
        })}
      </Grid>
    </>
  )
}

export default MoveHistory;