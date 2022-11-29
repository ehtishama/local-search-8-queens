import "./App.css";
import Board from "./components/board";

import { useEffect, useState } from "react";
import * as _8queenUtil from "./util/8queen";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [searching, setSearching] = useState(true);
  const [currState, setCurrState] = useState(_8queenUtil.generateRandomState());
  const [minFound, setMinFound] = useState(false);
  const [randomRestart, setRandomRestart] = useState(false);
  const currCost = _8queenUtil.calcCost(currState);

  const restart = () => {
    setMinFound(false);
    setCurrState(_8queenUtil.generateRandomState());
  };

  const randomRestartSearch = () => {
    setRandomRestart(true);
    restart();
  };

  useEffect(() => {
    if (!searching) return;

    // wait 5 seconds
    // play next move
    // repeat
    let n = 8;
    const intervalId = setInterval(() => {
      let costs = {};
      let currCost = _8queenUtil.calcCost(currState);
      console.log(currCost);
      for (let col = 0; col < n; col++) {
        for (let row = 0; row < n; row++) {
          if (currState[row][col] === 1) continue;

          let neighbor = _8queenUtil.generateNeighbor(currState, row, col);

          let cost = _8queenUtil.calcCost(neighbor);

          costs[cost] = neighbor;
        }
      }

      const leastCost = Object.keys(costs)[0];
      const leastCostState = costs[leastCost];

      // reached a minima
      if (currCost <= leastCost) {
        // local minima with random restart
        if (randomRestart && currCost !== 0) {
          // restart the search with random initial position
          restart();
        } else {
          // stop at this minima (whether global or minima)
          clearInterval(intervalId);
          setMinFound(true);
        }
      } else {
        // found a better state
        setCurrState(leastCostState);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currState, randomRestart, searching]);

  return (
    <section className="container mx-auto">
      <h2 className="score">Current Cost: {currCost}</h2>
      {minFound && currCost > 0 && (
        <>
          <p className="alert alert-danger">
            Stuck at local minima. <button onClick={restart}>Restart</button>
            <button onClick={randomRestartSearch}>
              Search with Random Restart
            </button>
          </p>
        </>
      )}
      {minFound && currCost === 0 && (
        <p className="alert alert-success">Global minmum has reached. </p>
      )}
      <Board state={currState} />
    </section>
  );
}

export default App;
