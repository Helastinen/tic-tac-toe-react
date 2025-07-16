import React from "react";
import GridBoard from "./GridBoard";
import { History } from "./types";

const MoveHistory = ({ history }: {history: History}) => {
  return (
    <ul>
      {history.map((_, i) => { 
        if (i > 0 && i < history.length - 1) {
          return (
            <li key={i} className="small-grid">
              <div>Turn #{i}</div>
              <GridBoard mode="history" grid={history[i]} disabled />
            </li>
          )
        }
      })}
    </ul>
  )
}

export default MoveHistory;