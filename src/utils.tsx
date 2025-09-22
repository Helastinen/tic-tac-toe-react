import { Cell, GameBoard, PlayerMark } from "./types";

export const isTieGame = (winningValue: Cell | undefined, grid: GameBoard) => !winningValue && grid.every(item => item !== null);

export const togglePlayer = (current: PlayerMark) => 
  current === PlayerMark.X ? PlayerMark.O : PlayerMark.X;