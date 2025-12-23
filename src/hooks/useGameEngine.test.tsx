import { describe, expect, Mocked, test } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";

import axios from "axios";

import { useGameEngine } from "./useGameEngine";
import { GameBoard, PlayerMark, Players } from "../types/types";
import { mockEmptyGrid, mockEmptyMoveHistory, mockTotalStats, mockPlayers, mockGameHistoryStats } from "../constants/testingMocks";
import { CONFIG } from "../constants/config";

vi.mock("axios");
//const mockedPostAxios = axios as unknown as { post: ReturnType<typeof vi.fn>};
const mockedAxios = axios as Mocked<typeof axios>;

describe("useGameEngine", () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: mockTotalStats });
  });

  test("initial state is correct", async () => {    
    const { result } = renderHook(() => useGameEngine());

    await waitFor(() => {
      expect(result.current).toMatchObject({
        moveHistory: mockEmptyMoveHistory,
        currentPlayer: PlayerMark.X,
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
        currentPlayer: PlayerMark.X,
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

    mockedAxios.post.mockResolvedValue({});

    await act(() => result.current.handleEndGame(PlayerMark.X, currentMove));

    expect(result.current.gameStarted).toBe(false);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining(`${CONFIG.API_BASE_URL}/${CONFIG.API_GAMEHISTORY}`),
      expect.objectContaining(mockGameHistoryStats[0])
    );
  });
});