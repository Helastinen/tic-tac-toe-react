export enum PlayerMark {
  X = "X",
  O = "O"
};

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

export type Cell = Nullable<PlayerMark>;
export type Grid = Cell[];
export type History = Cell[][];

export type WinningLine = number[];
export type WinningLines = number[][];
export type WinningResult = null | {
  Cell: Cell;
  winningLine: WinningLine;
} 

export interface StatusProps {
  winningValue: Cell | undefined;
  nextPlayer: PlayerMark;
  grid: Grid;
  onReset: () => void;
}

export interface SquareProps {
  winningLine: WinningLine | undefined;
  index: number;
  value: Nullable<PlayerMark>
  onSquareClick: () => void;
}

export interface InteractiveGridBoardProps {
  mode: "interactive";
  grid: Grid;
  nextPlayer: PlayerMark;
  onPlay: (nextGrid: Grid, nextPlayer: PlayerMark) => void;
  winningLine?: WinningLine | undefined;
}

export interface HistoryGridBoardProps {
  mode: "history";
  grid: Grid;
  disabled: true;
}

export type GridBoardProps = InteractiveGridBoardProps | HistoryGridBoardProps;