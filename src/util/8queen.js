function inRange(x, y, n = 8) {
  if (x < n && y < n && x >= 0 && y >= 0) return true;
  return false;
}

function calcCost(state, n = 8) {
  let count = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (state[i][j] !== 1) continue;

      // count  queens in the same row
      for (let k = 0; k < n; k++)
        if (k === j) continue;
        else if (state[i][k] === 1) count++;

      // count queens in the same col
      for (let k = 0; k < n; k++)
        if (k === i) continue;
        else if (state[k][j] === 1) count++;

      // count queens in the same diag
      let x = i - 1,
        y = j + 1;

      while (inRange(x, y)) {
        if (state[x][y] === 1) count++;
        x--;
        y++;
      }

      x = i + 1;
      y = j - 1;
      while (inRange(x, y)) {
        if (state[x][y] === 1) count++;
        x++;
        y--;
      }

      x = i - 1;
      y = j - 1;

      while (inRange(x, y)) {
        if (state[x][y] === 1) count++;
        x--;
        y--;
      }

      x = i + 1;
      y = j + 1;

      while (inRange(x, y)) {
        if (state[x][y] === 1) count++;
        x++;
        y++;
      }
    }
  }

  return count / 2;
}

function generateNeighbor(currState, row, col, n = 8) {
  let neighbor = JSON.parse(JSON.stringify(currState));

  for (let i = 0; i < n; i++) {
    neighbor[i][col] = 0;
  }
  neighbor[row][col] = 1;

  return neighbor;
}

function generateRandomState(n = 8) {
  let state = [...new Array(8)].map((_) => new Array(8).fill(0));
  for (let col = 0; col < 8; col++) {
    let row = Math.floor(Math.random() * 8);

    // console.log(row, col);
    state[row][col] = 1;
  }
  //   console.log(state);

  return state;
}

function printState(state, n = 8) {
  for (let i = 0; i < n; i++) {
    let row = "";
    for (let j = 0; j < n; j++) {
      row += state[i][j] + " ";
    }
    console.log(row);
  }
}

function localSearch(currState, n = 8) {
  while (true) {
    let currCost = calcCost(currState);
    printState(currState);
    console.log("Cost: ", currCost, "\n");
    let costs = {};

    for (let col = 0; col < n; col++) {
      for (let row = 0; row < n; row++) {
        if (currState[row][col] === 1) continue;

        let neighbor = generateNeighbor(currState, row, col);

        let cost = calcCost(neighbor);

        costs[cost] = neighbor;
      }
    }

    const leastCost = Object.keys(costs)[0];
    const leastCostState = costs[leastCost];

    if (Number(leastCost) < currCost) currState = leastCostState;
    else break;
  }
}

export {
  inRange,
  calcCost,
  generateNeighbor,
  generateRandomState,
  printState,
  localSearch,
};
