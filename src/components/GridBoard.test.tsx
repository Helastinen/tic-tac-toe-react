import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import GridBoard from "./GridBoard";
import { GameBoard, PlayerMark, WinningLine } from "../types/types";
import { mockEmptyGrid, mockWinningGrid } from "../constants/testingMocks";

const mockMove = vi.fn();

const createGridBoard = ({
  disabled = false,
  mode = "interactive",
  winningLine = undefined,
  currentPlayer = PlayerMark.X,
  grid = mockEmptyGrid,
  OnPlayerMove = mockMove,
} : {
  grid?: GameBoard;
  disabled?: boolean;
  currentPlayer?: PlayerMark;
  OnPlayerMove?: (currentMove: GameBoard, currentPlayer: PlayerMark) => void;
  winningLine?: WinningLine | undefined;
  mode?: "interactive" | "moveHistory";
} = {} ) => {
  if (mode === "interactive") {
    return (
      <GridBoard
        disabled={disabled}
        mode="interactive"
        winningLine={winningLine}
        currentPlayer={currentPlayer}
        grid={grid}
        OnPlayerMove={OnPlayerMove}
      />
    );
  }

  return ( <GridBoard
    disabled={true}
    mode="moveHistory"
    grid={grid}
  />
  );
};

describe("GridBoard", () => {
  beforeEach(() => {
    mockMove.mockReset();
  });

  test("renders component", () => {
    const mockGridBoard = createGridBoard();
    const { container } = render(mockGridBoard);

    expect(container).toBeTruthy();
  });

  test("renders squares", () => {
    const mockGridBoard = createGridBoard();
    render(mockGridBoard);

    const grid = screen.getByTestId("game-grid");

    expect(grid).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(9);
  });

  describe("Interactive GridBoard", () => {
    test("clicking empty square triggers PlayerMove", () => {
      const mockGridBoard = createGridBoard();
      render(mockGridBoard);

      const squareButtons = screen.getAllByRole("button");
      squareButtons[0].click();

      expect(mockMove).toHaveBeenCalledTimes(1);
      expect(mockMove).toHaveBeenCalledWith(expect.any(Array), PlayerMark.X);
    });

    test("clicking a filled square does nothing", () => {
      const filledGrid = [...mockEmptyGrid];
      filledGrid[0] = PlayerMark.X;

      const mockGridBoard = createGridBoard({ grid: filledGrid });
      render(mockGridBoard);

      const squareButtons = screen.getAllByRole("button");
      squareButtons[0].click();

      expect(mockMove).not.toHaveBeenCalled();
    });

    test("clicking a square after game has ended does nothing", () => {
      const mockGridBoard = createGridBoard({ grid: mockWinningGrid, winningLine: [0,3,6] });
      render(mockGridBoard);

      const squareButtons = screen.getAllByRole("button");
      squareButtons[2].click();

      expect(mockMove).not.toHaveBeenCalled();
    });
  });

  describe("MoveHistory GridBoard", () => {
    test("has no interaction", () => {
      const mockGridBoard = createGridBoard({ mode: "moveHistory", disabled: true });
      render(mockGridBoard);

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(9);

      buttons.forEach(button => {
        expect(button).toBeDisabled();
      });

      expect(mockMove).not.toHaveBeenCalled();
    });
  });
});