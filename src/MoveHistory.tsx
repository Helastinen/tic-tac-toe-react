import Grid from "@mui/material/Grid";

import GridBoard from "./GridBoard";
import { MoveHistoryProps, PlayerMark } from "./types";
import Typography from "@mui/material/Typography";
import togglePlayer from "./utils";

const MoveHistory = ({ history, players } : MoveHistoryProps) => {
  // show turns only if there have been at least two moves
  const hasHistory = history.length > 2;

  if(!hasHistory) return null;

  return (
    <> 
      <Typography 
        variant="h5"
        color="info"
        sx={{ 
          textAlign:"left",
          margin:"1rem"
        }}
      >
        Move history
      </Typography>
      <Grid 
        container
        spacing={2} 
        sx={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        {history.map((_, i) => { 
          if (i > 0 && i < history.length - 1) {
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
                  Turn <strong>{i}</strong> ({i % 2 === 1 ? players?.player1 : players?.player2})
                </div>
                <div key={i} className="small-grid">
                  <GridBoard mode="history" grid={history[i]} disabled />
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