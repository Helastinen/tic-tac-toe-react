import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import MoveHistory from "./MoveHistory";
import { UI_TEXT } from "../constants/uiText";
import { mockEmptyMoveHistory, mockMoveHistoryAfterFirstTurn, mockMoveHistoryAfterFourTurns } from "../constants/testing_mocks";

describe("MoveHistory", () => {
  test("renders component", () => {
    const { container } = render(<MoveHistory moveHistory={mockEmptyMoveHistory} players={null}/>);

    expect(container).toBeTruthy();
  });

  test("does not render if fewer then 3 entries", () => {
    render(<MoveHistory moveHistory={mockMoveHistoryAfterFirstTurn} players={null}/>);

    expect(screen.queryByText(UI_TEXT.HISTORY.TITLE)).not.toBeInTheDocument();
    expect(screen.queryByTestId("game-grid")).not.toBeInTheDocument();
  });

  test("renders grid if more then 2 entries", () => {
    render(<MoveHistory moveHistory={mockMoveHistoryAfterFourTurns} players={null}/>);

    expect(screen.queryByText(UI_TEXT.HISTORY.TITLE)).toBeInTheDocument();
    expect(screen.getAllByTestId("game-grid")).toHaveLength(3);
  });
});