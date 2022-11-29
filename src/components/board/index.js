import React from "react";
import queen_png from "../../assets/b_queen_png_512px.png";

const initialState = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
export default function Board({ state = initialState, n = 8 }) {
  return state.map((row, row_idx) => (
    <div className="row" key={row_idx}>
      {row.map((cell, col_idx) => (
        <div
          key={col_idx}
          className={`cell ${
            row_idx % 2 === 0
              ? col_idx % 2 === 0
                ? "cell_dark"
                : ""
              : col_idx % 2 === 0
              ? ""
              : "cell_dark"
          }`}
        >
          {cell === 1 ? <img src={queen_png} alt="Queen" /> : ""}
        </div>
      ))}
    </div>
  ));
}
