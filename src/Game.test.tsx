import { describe, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import Game from "./Game";
import { UI_TEXT } from "./constants/uiText";
import axios from "axios";
import { mockGameHistoryStats, mockTotalStats } from "./constants/testing_mocks";

vi.mock("axios");

describe("Game", () => {
  beforeEach(() => {
    (axios.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: {
        mockGameHistoryStats,
        mockTotalStats,
    }});
  });

  test("renders component", async() => {
    const { container } = render(<Game />);

    await waitFor(() => {
      expect(container).toBeTruthy();
    })
  });
  
  test("renders game elements", async() => {
    render(<Game />);

    await waitFor(() => {
      const gameTitle = screen.getByText(UI_TEXT.GAME.TITLE);
      const playerOne = screen.getByLabelText(UI_TEXT.PLAYER_FORM.PLAYER_ONE_LABEL);
      const playerTwo = screen.getByLabelText(UI_TEXT.PLAYER_FORM.PLAYER_TWO_LABEL);
      const startGameButton = screen.getByText(UI_TEXT.GAME.START);
      const statsButton = screen.getByText(UI_TEXT.GAME.STATS);
      const grid = screen.getByTestId("game-grid");

      expect(gameTitle).toBeInTheDocument();
      expect(playerOne).toBeInTheDocument();
      expect(playerTwo).toBeInTheDocument();
      expect(startGameButton).toBeInTheDocument();
      expect(statsButton).toBeInTheDocument();
      expect(grid).toBeInTheDocument();
    });
  });
})