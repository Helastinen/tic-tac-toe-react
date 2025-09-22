import Dialog from '@mui/material/Dialog';

import { GameStatsDialogProps } from './types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ListItemIcon from '@mui/material/ListItemIcon';
import GamesIcon from '@mui/icons-material/Games';

const GameStatsDialog = ({open, onClose, gameStats }: GameStatsDialogProps) => {
  const stats = [
    { name: "Games Played", value: gameStats.gamesPlayed },
    { name: "Player One wins", value: gameStats.playerOneWins },
    { name: "Player Two wins", value: gameStats.playerTwoWins },
    { name: "Ties", value: gameStats.ties },
    { name: "Aborted", value: gameStats.aborted },
  ];

  return (
    <Dialog open={open} onClose={onClose} aria-modal="true">
      <DialogTitle variant="h5" color="primary">
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
      <List sx={{ margin: "0rem 0.5rem", paddingTop: "0" }}>
        {stats.map(stat => {
          return (
            <ListItem key={stat.name}>
              <ListItemIcon sx={{ minWidth: "2rem" }}>
                <GamesIcon color="primary" fontSize="small"/>
              </ListItemIcon>
              {stat.name}:&nbsp;<strong>{stat.value}</strong>.
            </ListItem>
          )
        })}
      </List>
    </Dialog>
  )
}

export default GameStatsDialog;