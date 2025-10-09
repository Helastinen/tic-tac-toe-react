import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import Game from "./Game";
import { UI_TEXT } from "./constants/uiText";

describe("Game component", () => {
  test("renders component", () => {
    const { container } = render(<Game />);
    expect(container).toBeTruthy();
    // screen.debug();
  });
  
  test("renders game elements", () => {
    render(<Game />);
    const gameTitle = screen.getByText(UI_TEXT.GAME.TITLE);
    const playerOne = screen.getByLabelText(UI_TEXT.PLAYER_FORM.PLAYER_ONE_LABEL);
    const playerTwo = screen.getByLabelText(UI_TEXT.PLAYER_FORM.PLAYER_TWO_LABEL);

    const startGameButton = screen.getByText(UI_TEXT.GAME.START);
    const statsButton = screen.getByText(UI_TEXT.GAME.STATS);
    const grid = screen.getByTestId("game-grid");

    expect(gameTitle).toBeDefined();
    expect(playerOne).toBeDefined();
    expect(playerTwo).toBeDefined();

    expect(startGameButton).toBeDefined();
    expect(statsButton).toBeDefined();
    expect(grid).toBeDefined();
  });
})