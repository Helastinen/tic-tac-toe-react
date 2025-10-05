import { GameStatsDialogProps } from '../types/types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import GamesIcon from '@mui/icons-material/Games';
import DialogContent from '@mui/material/DialogContent';

const GameStatsDialog = ({open, onClose, gameStats }: GameStatsDialogProps) => {
  const { playerOneWins, playerTwoWins, ties, aborted } = gameStats;
  const stats = [
    { name: "Games Played", value: playerOneWins + playerTwoWins + ties + aborted },
    { name: "Player One wins", value: playerOneWins },
    { name: "Player Two wins", value: playerTwoWins },
    { name: "Ties", value: ties },
    { name: "Aborted", value: aborted },
  ];

  return (
    <Dialog 
      open={open}
      onClose={onClose}
      aria-modal="true"
      aria-labelledby="game-stats-title"
    >
      <DialogTitle 
        id="game-stats-title"
        variant="h2"
        color="primary"
        sx={{ fontSize: "2.5rem" }}
      >
        Game Statistics
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{ 
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
        <DialogContent id="game-stats-description">
        <List sx={{ margin: "0rem 0.5rem", paddingTop: "0" }}>
          {stats.map(stat => {
            return (
              <ListItem key={stat.name}>
                <ListItemIcon sx={{ minWidth: "2rem" }}>
                  <GamesIcon color="primary" fontSize="small" aria-hidden="true" />
                </ListItemIcon>
                {stat.name}:&nbsp;<strong>{stat.value}</strong>.
              </ListItem>
            )
          })}
        </List>
      </DialogContent>
    </Dialog>
  )
}

export default GameStatsDialog;