// Enums
export enum PlayerMark {
  X = "X",
  O = "O"
};
export enum GameStatus {
  Aborted = "aborted",
  CompletedWinner = "completed_with_winner",
  CompletedTie = "completed_with_tie"
};


export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

// Grid
export type Cell = Nullable<PlayerMark>;
export type GameBoard = Cell[];
export type MoveHistoryType = Cell[][];

export type WinningLine = number[];
export type WinningLines = number[][];
export type WinningResult = null | {
  cell: Cell;
  winningLine: WinningLine;
};
export type Players = null | {
  playerOne: string;
  playerTwo: string;
};

// Stats
export type TotalStats = {
  playerOneWins: number;
  playerTwoWins: number;
  ties: number;
  aborted: number;
};

export type GameHistoryStats = {
  playerOne: string | undefined;
  playerTwo: string | undefined;
  status: GameStatus;
  winnerName?: string;
  winningMark?: Cell
  winningMove?: number;
};

export type GameStats = {
  gameHistory: GameHistoryStats[];
  totalStats: TotalStats;
}

export type StatsListItem = {
  name: string;
  value: number | string;
  percentage?: number;
}

// Components
export interface StatusProps {
  winningValue: Cell | undefined;
  currentPlayer: PlayerMark;
  players: Players;
  grid: GameBoard;
  gameStarted: boolean;
  moveHistory: MoveHistoryType;
};

export interface SquareProps {
  winningLine: WinningLine | undefined;
  index: number;
  value: Nullable<PlayerMark>;
  onSquareClick: () => void;
  disabled?: boolean;
};

export interface InteractiveGridBoardProps {
  mode: "interactive";
  grid: GameBoard;
  currentPlayer: PlayerMark;
  OnPlayerMove: (currentMove: GameBoard, currentPlayer: PlayerMark) => void;
  winningLine?: WinningLine | undefined;
  disabled?: boolean;
};

export interface MoveHistoryGridBoardProps {
  mode: "moveHistory";
  grid: GameBoard;
  disabled?: true;
};

export type GridBoardProps = InteractiveGridBoardProps | MoveHistoryGridBoardProps;

export function isInteractiveGridBoardProps(
  props: GridBoardProps): props is InteractiveGridBoardProps {
    return props.mode === "interactive";
};

export interface MoveHistoryProps {
  moveHistory: MoveHistoryType;
  players: Players;
};

export interface PlayerFormProps {
  players: Players;
  setPlayers: React.Dispatch<React.SetStateAction<Players>>;
  onStartGame: (players: Players) => void;
  gameStarted: boolean;
  gameStats: GameStats | null;
  currentPlayer: PlayerMark;
  fetchStats: () => void;
};

export interface PlayerSetupProps {
  players: Players;
  errors: { [key: string]: boolean };
  helperTexts: { [key: string]: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export interface PlayerNamesProps {
  currentPlayer: PlayerMark;
  players: Players;
};

export interface PlayerControlsProps {
  errors: { [key: string]: boolean };
  players: Players;
  gameStarted: boolean;
  gameStats: GameStats | null;
  onStartGame: (players: Players) => void;
  fetchStats: () => void;
};

export interface GameStatsDialogProps {
  open: boolean;
  onClose: () => void;
  gameStats: GameStats | null;
};

export interface ErrorBannerProps {
  error: string | null;
  clearError: () => void;
}