import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import GridBoard from "./GridBoard";
import { GameBoard, PlayerMark, WinningLine } from "../types/types";
import MoveHistory from "./MoveHistory";
import { UI_TEXT } from "../constants/uiText";

describe("MoveHistory", () => {
  test("renders component", () => {
    const { container } = render(<MoveHistory moveHistory={[Array(9).fill(null)]} players={null}/>);

    expect(container).toBeTruthy();
  });

  test("does not render if fewer then 3 entries", () => {
    const historyArray = [[], [],];
    render(<MoveHistory moveHistory={historyArray} players={null}/>);

    expect(screen.queryByText(UI_TEXT.HISTORY.TITLE)).not.toBeInTheDocument();
    expect(screen.queryByTestId("game-grid")).not.toBeInTheDocument();
  });

  test("renders grid if more then 2 entries", () => {
    const historyArray= [[], [], [], [], []];
    render(<MoveHistory moveHistory={historyArray} players={null}/>);

    expect(screen.queryByText(UI_TEXT.HISTORY.TITLE)).toBeInTheDocument();
    expect(screen.getAllByTestId("game-grid")).toHaveLength(3);
  });
});