import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import Status from "./Status";
import { PlayerMark } from "../types/types";
import {
  mockEmptyGrid,
  mockEmptyMoveHistory,
  mockMoveHistoryAfterFiveTurns,
  mockMoveHistoryAfterWin,
  mockNonWinningGrid,
  mockPlayers,
  mockWinningGrid
} from "../constants/testingMocks";
import { isTieGame } from "../utils/utils";

vi.mock("../utils/utils", () => ({
  isTieGame: vi.fn(),
  togglePlayer: vi.fn(),
}));


describe("Status", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders component", () => {
    const { container } = render(
      <Status
        winningValue={undefined}
        currentPlayer={PlayerMark.X}
        players={null}
        grid={mockEmptyGrid}
        gameStarted={true}
        moveHistory={mockEmptyMoveHistory}
      />
    );

    expect(container).toBeTruthy();
  });

  test("shows winning player and win status when winningValue set", () => {
    render(
      <Status
        winningValue={PlayerMark.X}
        currentPlayer={PlayerMark.O}
        players={mockPlayers}
        grid={mockWinningGrid}
        gameStarted={true}
        moveHistory={mockMoveHistoryAfterWin}
      />
    );

    expect(screen.getByTestId("winner-status")).toBeInTheDocument();
    expect(screen.queryByText(mockPlayers.playerOne)).toBeInTheDocument();
  });

  test("shows tie when tie Game", () => {
    vi.mocked(isTieGame).mockReturnValue(true);
    render(
      <Status
        winningValue={null}
        currentPlayer={PlayerMark.X}
        players={mockPlayers}
        grid={mockNonWinningGrid}
        gameStarted={true}
        moveHistory={mockMoveHistoryAfterFiveTurns}
      />
    );

    expect(screen.getByTestId("tie-status")).toBeInTheDocument();
  });

  test("shows turn status including turn number and current player when game is ongoing", () => {
    vi.mocked(isTieGame).mockReturnValue(false);
    render(
      <Status
        winningValue={null}
        currentPlayer={PlayerMark.O}
        players={mockPlayers}
        grid={mockNonWinningGrid}
        gameStarted={true}
        moveHistory={mockMoveHistoryAfterFiveTurns}
      />
    );

    expect(screen.getByTestId("turn-status")).toBeInTheDocument();
    expect(screen.getByTestId("turn-status")).toHaveTextContent(String(mockMoveHistoryAfterFiveTurns.length));
    expect(screen.queryByText(mockPlayers.playerTwo)).toBeInTheDocument();
  });
});