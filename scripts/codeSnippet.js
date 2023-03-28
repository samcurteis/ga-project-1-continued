// **** code snippet 2 ****

const obstacles = {
  laneOne: [0, 1, 2, 6, 7, 8],
  laneTwo: [0, 5, 10],
  laneThree: [1, 2, 6, 7, 9],
  frisbeesOne: [0, 3, 6, 9],
  frisbeesTwo: [1, 3, 7, 10],
  frisbeesThree: [2, 4, 6, 8, 10]
};

function levelZero() {
  frisbeeRowOne = width * 7;
  laneOneRow = width;
  laneTwoRow = 'string';
  laneThreeRow = width * 4;

  moveFrisbeesOne(+1, frisbeeRowOne, obstacles.frisbeesOne, 'frisbee', 800);
  moveLaneOne(-1, laneOneRow, obstacles.laneOne, 'lane-one', 1000);
  moveLaneThree(+1, laneThreeRow, obstacles.laneThree, 'lane-two', 1000);
}

function moveFrisbeesOne(direction, row, obstacle, className, speed) {
  let newObstacleArray = obstacle.map((index) => (index += row));

  frisbeesOneInterval = setInterval(() => {
    removeObject(newObstacleArray, className, row);
    newObstacleArray = newObstacleArray.map((index) => {
      if (index > row + width - 2 && direction === +1) {
        return (index -= width - 1);
      } else if (index < row + 1 && direction === -1) {
        return (index += width - 1);
      } else {
        return (index += direction);
      }
    });
    addObject(newObstacleArray, className, row);
    checkCollision();
  }, speed);
  roadDesign();
}

function checkCollision() {
  const obstacleClassNames = ['frisbee', 'lane-one', 'lane-two'];
  obstacleClassNames.forEach((obstacle) => {
    if (cells[bootPosition].classList.contains(obstacle)) {
      endGame();
      clearIntervals();
      clearDesigns();
    }
  });
}

function clearIntervals() {
  [
    laneOneInterval,
    laneTwoInterval,
    laneThreeInterval,
    frisbeesOneInterval,
    frisbeesTwoInterval,
    frisbeesThreeInterval
  ].forEach((i) => clearInterval(i));
}

// **** code snippet 3 ****

function roadDesign() {
  for (let i = 0; i < gridCellCount; i++) {
    if (
      (i >= laneOneRow && i <= laneOneRow + width - 1) ||
      (i >= laneTwoRow && i <= laneTwoRow + width - 1) ||
      (i >= laneThreeRow && i <= laneThreeRow + width - 1)
    ) {
      cells[i].classList.add('road');
    } else {
      cells[i].classList.remove('road');
    }
  }
}

function bootRoadDesign() {
  if (cells[bootPosition].classList.contains('road')) {
    cells[bootPosition].classList.add('road-boot');
  }
}
function clearDesigns() {
  const obstacleClassNames = ['frisbee', 'lane-one', 'lane-two', 'road'];
  obstacleClassNames.forEach((obstacle) => {
    for (let index = 0; index < gridCellCount; index++) {
      const element = cells[index];
      element.classList.remove(obstacle);
    }
  });
}

function replay() {
  gameWonDiv.style.display = 'none';
  endGameDiv.style.display = 'none';
  gameBeatDiv.style.display = 'none';
  grid.style.display = 'flex';
  // levelDisplay.style.display = "flex";
  clearDesigns();
  clearIntervals();
  resetBoot();
  levelDisplay.innerHTML = `<h2>Level: ${level}</h2>`;
  isGameBeat = false;

  if (level === 0) {
    levelZero();
  } else if (level === 1) {
    levelOne();
  } else if (level === 2) {
    levelTwo();
  }
}

playAgainButton.forEach((button) => button.addEventListener('click', replay));

const bogRowOne = width * 7;

newObstacleArray.forEach((obstacle) =>
  obstacle === bootPosition
    ? cells[bootPosition].classList.remove('boot')
    : null
);

function movePatchesOne(direction, row, obstacle, className, speed) {
  let newObstacleArray = obstacle.map((index) => (index += row));
  console.log(row);
  patchesOneInterval = setInterval(() => {
    removeObject(newObstacleArray, className, row);
    newObstacleArray = newObstacleArray.map((index) => {
      if (index > row + width - 2 && direction === +1) {
        return (index -= width - 1);
      } else if (index < row + 1 && direction === -1) {
        return (index += width - 1);
      } else {
        return (index += direction);
      }
    });
    removeBoot();
    addBoot(direction, row);
    addObject(newObstacleArray, className, row);
  }, speed);
}
// levelDisplay.style.display = "none";

function addBoot(direction, row) {
  if (cells[bootPosition].classList.contains('green-patch')) {
    bootPosition = bootPosition + direction;
    console.log(bootPosition);
    cells[bootPosition].classList.add('boot');
    // if (bootPosition > row + width && direction === +1) {
    //   endGame();
    // } else if (bootPosition < row + 1 && direction === -1) {
    //   endGame();
    // }
  }
}

function removeBoot() {
  if (cells[bootPosition].classList.contains('green-patch'))
    cells[bootPosition].classList.remove('boot');
}

movePatchesOne(+1, bogRowOne, obstacles.greenOne, 'green-patch', 1500);
