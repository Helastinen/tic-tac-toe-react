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
  cell: Cell;
  winningLine: WinningLine;
} 
export type PlayerNames = null | {
  player1: string;
  player2: string;
}

export interface StatusProps {
  winningValue: Cell | undefined;
  nextPlayer: PlayerMark;
  players: PlayerNames;
  grid: GameBoard;
  gameStarted: boolean;
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
  disabled?: boolean;
}

export interface HistoryGridBoardProps {
  mode: "history";
  grid: GameBoard;
  disabled?: true;
}

export type GridBoardProps = InteractiveGridBoardProps | HistoryGridBoardProps;

export function isInteractiveGridBoardProps(
  props: GridBoardProps): props is InteractiveGridBoardProps {
    return props.mode === "interactive";
  }

export interface MoveHistoryProps {
  history: History;
  players: PlayerNames;
};

export interface PlayerFormProps {
  onStartGame: (playerNames: PlayerNames) => void;
  gameStarted: boolean;
};