export enum PlayerMark {
  X = "X",
  O = "O"
};

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

export type Cell = Nullable<PlayerMark>;
export type GameBoard = Cell[];
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
  grid: GameBoard;
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
  grid: GameBoard;
  nextPlayer: PlayerMark;
  onPlay: (nextGrid: GameBoard, nextPlayer: PlayerMark) => void;
  winningLine?: WinningLine | undefined;
}

export interface HistoryGridBoardProps {
  mode: "history";
  grid: GameBoard;
  disabled: true;
}

export type GridBoardProps = InteractiveGridBoardProps | HistoryGridBoardProps;

export function isInteractiveGridBoardProps(
  props: GridBoardProps): props is InteractiveGridBoardProps {
    return props.mode === "interactive";
  }