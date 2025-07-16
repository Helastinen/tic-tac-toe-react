import { PlayerMark } from "./types";

const togglePlayer = (current: PlayerMark) => 
  current === PlayerMark.X ? PlayerMark.O : PlayerMark.X;

export default togglePlayer;