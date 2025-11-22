import { describe, expect, test } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";

import axios from "axios";

import { useGameEngine } from "./useGameEngine";
import { GameBoard, TotalStats, PlayerMark, Players, GameHistory } from "../types/types";
import { defaultStats } from "../utils/statsHelper";
import { mockEmptyGrid, mockEmptyMoveHistory, mockTotalStats, mockPlayers, mockGameHistoryStats } from "../constants/testing_mocks";

vi.mock("axios");
const mockedPutAxios = axios as unknown as { put: ReturnType<typeof vi.fn>};
const mockedPostAxios = axios as unknown as { post: ReturnType<typeof vi.fn>};

describe("useGameEngine", () => {
  beforeEach(() => {
    (axios.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockTotalStats });
  });

  test("initial state is correct", async () => {    
    const { result } = renderHook(() => useGameEngine());

    await waitFor(() => {
      expect(result.current).toMatchObject({
        moveHistory: mockEmptyMoveHistory,
        currentPlayer: PlayerMark.O,
        players: mockPlayers,
        gameStarted: false,
        winningResult: null,
      });
    });
  });

  test("handleStartGame resets state and sets players", async () => {    
    const { result } = renderHook(() => useGameEngine());
    const newMockPlayers: Players = { playerOne: "new Player1", playerTwo: "new PlayerTwo" };

    act(() => result.current.handleStartGame(newMockPlayers));
    
    await waitFor(() => {
      expect(result.current).toMatchObject({
        moveHistory: mockEmptyMoveHistory,
        currentPlayer: PlayerMark.O,
        players: newMockPlayers,
        gameStarted: true,
        winningResult: null,
      });
    });
  });

  test("handlePlayerMove updates grid and toggles player", async () => {    
    const { result } = renderHook(() => useGameEngine());
    const currentMove: GameBoard = [
      PlayerMark.X, null, null,
      null, null, null,
      null, null, null
    ];
    
    act(() => result.current.handlePlayerMove(currentMove, PlayerMark.X));

    await waitFor(() => {
      expect(result.current).toMatchObject({
        moveHistory: [mockEmptyGrid, currentMove],
        currentPlayer: PlayerMark.O,
        players: mockPlayers,
        gameStarted: false,
        winningResult: null,
      });
    });
  });

  test("handleEndGame updates stats and ends game", async () => {    
    const { result } = renderHook(() => useGameEngine());
    const currentMove: GameBoard = [
      PlayerMark.X, PlayerMark.X, PlayerMark.X,
      PlayerMark.O, PlayerMark.O, null,
      null, null, null
    ];
    const updatedMockTotalStats: TotalStats = {...defaultStats, playerOneWins: 1};

    mockedPutAxios.put.mockResolvedValue({});
    mockedPostAxios.post.mockResolvedValue({});

    await act(() => result.current.handleEndGame(PlayerMark.X, currentMove));

    expect(result.current.gameStarted).toBe(false);
    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenCalledWith(
      expect.stringContaining("/totalStats"),
      expect.objectContaining(updatedMockTotalStats)
    );
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("/gameHistory"),
      expect.objectContaining(mockGameHistoryStats)
    );
  });
});