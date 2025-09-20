import Dialog from '@mui/material/Dialog';

import { GameStatsDialogProps } from './types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ListItemIcon from '@mui/material/ListItemIcon';
import GamesIcon from '@mui/icons-material/Games';

const GameStatsDialog = ({open, onClose}: GameStatsDialogProps) => {
  const gameStats = [
    { statistic: "Games Played", value: "X" },
    { statistic: "Player 1 wins", value: "X" },
    { statistic: "Player 2 wins", value: "X" },
    { statistic: "Ties", value: "X" },
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
      <List>
        {gameStats.map(stat => {
          return (
            <ListItem>
              <ListItemIcon sx={{ minWidth: "2.5rem" }}>
                <GamesIcon color="primary"/>
              </ListItemIcon>
              {stat.statistic}:&nbsp;<strong>{stat.value}</strong>.
            </ListItem>
          )
        })}
      </List>
    </Dialog>
  )
}

export default GameStatsDialog;