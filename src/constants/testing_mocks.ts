import { GameBoard, MoveHistoryType, PlayerMark } from "../types/types";
import { UI_TEXT } from "./uiText";

export const mockEmptyGrid: GameBoard = Array(9).fill(null);

export const mockWinningGrid: GameBoard = [
  PlayerMark.X, PlayerMark.O, null,
  PlayerMark.X, PlayerMark.O, null,
  PlayerMark.X, null, null
];

export const mockNonWinningGrid: GameBoard = [
  PlayerMark.X, PlayerMark.O, PlayerMark.X,
  PlayerMark.O, null, null,
  null, null, null
];

export const mockEmptyMoveHistory: MoveHistoryType = [mockEmptyGrid];

export const mockMoveHistoryAfterFirstTurn: MoveHistoryType = [
  mockEmptyGrid,
  [PlayerMark.X, ...mockEmptyGrid.slice(1)]
];

export const mockMoveHistoryAfterFourTurns: MoveHistoryType = [
  mockEmptyGrid,
  [PlayerMark.X, ...mockEmptyGrid.slice(1)],
  [PlayerMark.X, PlayerMark.O, ...mockEmptyGrid.slice(2)],
  [PlayerMark.X, PlayerMark.O, PlayerMark.X, ...mockEmptyGrid.slice(3)],
  [PlayerMark.X, PlayerMark.O, PlayerMark.X, PlayerMark.O, ...mockEmptyGrid.slice(4)]
];

export const mockMoveHistoryAfterWin: MoveHistoryType = [
  mockEmptyGrid,
  [PlayerMark.X, ...mockEmptyGrid.slice(1)],
  [PlayerMark.X, PlayerMark.O, ...mockEmptyGrid.slice(2)],
  [PlayerMark.X, PlayerMark.O, null, PlayerMark.X, ...mockEmptyGrid.slice(4)],
  [
    PlayerMark.X, PlayerMark.O, null, 
    PlayerMark.X, PlayerMark.O, null,
    null, null, null
  ],
  [
    PlayerMark.X, PlayerMark.O, null, 
    PlayerMark.X, PlayerMark.O, null, 
    PlayerMark.X, null, null
  ],
];

export const mockPlayers = {
  playerOne: UI_TEXT.PLAYER_FORM.PLAYER_ONE_LABEL,
  playerTwo: UI_TEXT.PLAYER_FORM.PLAYER_TWO_LABEL
};