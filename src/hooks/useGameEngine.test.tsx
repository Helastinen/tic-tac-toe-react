import { describe, expect, test } from "vitest";
import { act, renderHook } from "@testing-library/react";

import axios from "axios";

import { useGameEngine } from "./useGameEngine";
import { GameBoard, GameStats, PlayerMark, Players } from "../types/types";
import { UI_TEXT } from "../constants/uiText";
import { defaultStats } from "../utils/statsHelper";

const players = {
  playerOne: UI_TEXT.PLAYER_FORM.PLAYER_ONE_LABEL,
  playerTwo: UI_TEXT.PLAYER_FORM.PLAYER_TWO_LABEL
};
vi.mock("axios");

describe("useGameEngine", () => {
  test("initial state is correct", () => {    
    const { result } = renderHook(() => useGameEngine());

    expect(result.current.moveHistory).toEqual([Array(9).fill(null)]);
    expect(result.current.currentPlayer).toEqual(PlayerMark.O);
    expect(result.current.players).toEqual(players);
    expect(result.current.gameStarted).toBe(false);
    expect(result.current.winningResult).toBe(null);
  });

  test("handleStartGame resets state and sets players", () => {    
    const { result } = renderHook(() => useGameEngine());
    const newPlayers: Players = { playerOne: "new Player1", playerTwo: "new PlayerTwo" };

    act(() => result.current.handleStartGame(newPlayers));

    expect(result.current.moveHistory).toEqual([Array(9).fill(null)]);
    expect(result.current.currentPlayer).toEqual(PlayerMark.O);
    expect(result.current.players).toEqual(newPlayers);
    expect(result.current.gameStarted).toBe(true);
    expect(result.current.winningResult).toBe(null);
  });

  test("handlePlayerMove updates grid and toggles player", () => {    
    const { result } = renderHook(() => useGameEngine());
    const currentMove: GameBoard = [
      PlayerMark.X, null, null,
      null, null, null,
      null, null, null
    ];

    act(() => result.current.handlePlayerMove(currentMove, PlayerMark.X));

    expect(result.current.moveHistory).toEqual([Array(9).fill(null), currentMove]);
    expect(result.current.currentPlayer).toEqual(PlayerMark.O);
    expect(result.current.winningResult).toBe(null);
  });

    test("handleEndGame updates stats and ends game", async () => {    
    const { result } = renderHook(() => useGameEngine());
    const currentMove: GameBoard = [
      PlayerMark.X, PlayerMark.X, PlayerMark.X,
      PlayerMark.O, PlayerMark.O, null,
      null, null, null
    ];
    const updatedStats: GameStats = {...defaultStats, playerOneWins: 1};

    (axios.put as jest.Mock).mockResolvedValue({});

    await act(async () => 
      await result.current.handleEndGame(PlayerMark.X, currentMove)
    );

    expect(result.current.gameStarted).toBe(false);
    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenCalledWith(
      expect.stringContaining("/stats"),
      expect.objectContaining(updatedStats)
    );
  });
});