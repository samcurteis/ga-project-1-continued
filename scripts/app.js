function init() {
  const grid = document.querySelector('.grid');
  const startGameDiv = document.querySelector('.start-game');
  const endGameDiv = document.querySelector('.game-over');
  const gameWonDiv = document.querySelector('.game-won');
  const gameBeatDiv = document.querySelector('.game-beat');
  const playAgainButton = document.querySelectorAll('.play-again');
  const restartButton = document.querySelectorAll('.restart');
  const startGameButton = document.querySelector('.play');
  const levelDisplay = document.querySelector('.level');

  let isGameBeat = false;
  let level = 0;
  const width = 11;
  const gridCellCount = width * width;
  const cells = [];
  let laneOneRow;
  let laneTwoRow;
  let laneThreeRow;
  let laneFourRow = width * 4;
  let frisbeeRowOne = width * 5;
  let frisbeeRowTwo = width * 6;
  let frisbeeRowThree = width * 7;
  let bogRowOne = width * 7;
  let bogRowTwo = width * 8;
  // const bogRowThree = width * 9;
  const obstacles = {
    laneOne: [0, 1, 2, 6, 7, 8],
    laneTwo: [0, 5, 10],
    laneThree: [1, 2, 6, 7, 9],
    frisbeesOne: [0, 3, 6, 9],
    frisbeesTwo: [1, 3, 7, 10],
    frisbeesThree: [2, 4, 6, 8, 10],
    greenOne: [1, 2, 3, 8, 9, 10],
    greenTwo: [1, 2, 3, 8, 9, 10],
    greenThree: [2, 5, 7, 10]
  };
  let bootPosition = Math.floor(width * width - width / 2);

  let laneOneInterval;
  let laneTwoInterval;
  let laneThreeInterval;
  let frisbeesOneInterval;
  let frisbeesTwoInterval;
  let frisbeesThreeInterval;
  let patchesOneInterval;
  let patchesTwoInterval;
  let patchesThreeInterval;

  function createGrid(startingPosition) {
    for (let i = 0; i < gridCellCount; i++) {
      const cell = document.createElement('div');
      cell.setAttribute('data-index', i);
      cell.innerHTML = i;
      cells.push(cell);
      grid.appendChild(cell);
    }
    checkGameWon();
    cells[startingPosition].classList.add('boot');
  }

  function addObject(obstacle, className) {
    obstacle.forEach((index) => {
      cells[index].classList.add(className);
    });
  }

  function removeObject(obstacle, className) {
    obstacle.forEach((index) => {
      cells[index].classList.remove(className);
    });
  }

  function moveBootWithPatch(newObstacleArray, direction, row) {
    if (newObstacleArray.includes(bootPosition)) {
      if (
        (bootPosition === row + width - 1 && direction === +1) ||
        (bootPosition === row && direction === -1)
      ) {
        endGame();
      } else {
        cells[bootPosition].classList.remove('boot');
        bootPosition = bootPosition + direction;
        cells[bootPosition].classList.add('boot');
      }
    }
  }

  // ***** LANES ******

  function moveLaneOne(direction, row, obstacle, className, speed) {
    let newObstacleArray = obstacle.map((index) => (index += row));

    laneOneInterval = setInterval(() => {
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

  function moveLaneTwo(direction, row, obstacle, className, speed) {
    let newObstacleArray = obstacle.map((index) => (index += row));

    laneTwoInterval = setInterval(() => {
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

  function moveLaneThree(direction, row, obstacle, className, speed) {
    let newObstacleArray = obstacle.map((index) => (index += row));

    laneThreeInterval = setInterval(() => {
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

  // ***** FRISBEES ******

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

  function moveFrisbeesTwo(direction, row, obstacle, className, speed) {
    let newObstacleArray = obstacle.map((index) => (index += row));

    frisbeesTwoInterval = setInterval(() => {
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

  function moveFrisbeesThree(direction, row, obstacle, className, speed) {
    let newObstacleArray = obstacle.map((index) => (index += row));

    frisbeesThreeInterval = setInterval(() => {
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

  // ***** PATCHES ******

  function movePatchesOne(direction, row, obstacle, className, speed) {
    let newObstacleArray = obstacle.map((index) => (index += row));
    console.log(row);
    patchesOneInterval = setInterval(() => {
      removeObject(newObstacleArray, className, row);

      moveBootWithPatch(newObstacleArray, direction, row);

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
    }, speed);
  }

  function movePatchesTwo(direction, row, obstacle, className, speed) {
    let newObstacleArray = obstacle.map((index) => (index += row));

    patchesTwoInterval = setInterval(() => {
      removeObject(newObstacleArray, className, row);
      moveBootWithPatch(newObstacleArray, direction, row);
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
    }, speed);
  }

  function movePatchesThree(direction, row, obstacle, className, speed) {
    let newObstacleArray = obstacle.map((index) => (index += row));
    console.log(row);
    patchesThreeInterval = setInterval(() => {
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

  function startGame() {
    startGameDiv.style.display = 'none';
    grid.style.display = 'flex';
    levelDisplay.style.display = 'flex';
    createGrid(bootPosition);
    levelZero();
  }

  startGameButton.addEventListener('click', startGame);

  //  ***** LEVELS ******

  function levelZero() {
    laneOneRow = width;
    laneTwoRow = 'string';
    laneThreeRow = width * 4;
    frisbeeRowOne = width * 7;
    bogRowOne = width * 7;
    bogRowTwo = width * 8;
    // moveFrisbeesOne(+1, frisbeeRowOne, obstacles.frisbeesOne, 'frisbee', 800);
    moveLaneOne(-1, laneOneRow, obstacles.laneOne, 'lane-one', 1000);
    moveLaneThree(+1, laneThreeRow, obstacles.laneThree, 'lane-two', 1000);
    movePatchesOne(-1, bogRowOne, obstacles.greenOne, 'green-patch', 1000);
    movePatchesTwo(+1, bogRowTwo, obstacles.greenTwo, 'green-patch', 1000);
    // movePatchesThree(+1, bogRowThree, obstacles.greenThree, 'green-patch', 800);
  }

  function levelOne() {
    laneOneRow = width;
    laneTwoRow = width * 2;
    laneThreeRow = 'string';
    frisbeeRowOne = width * 5;
    bogRowOne = 1000;
    bogRowTwo = 1000;
    moveFrisbeesOne(+1, frisbeeRowOne, obstacles.frisbeesOne, 'frisbee', 900);
    moveFrisbeesTwo(-1, frisbeeRowTwo, obstacles.frisbeesTwo, 'frisbee', 1000);
    moveLaneOne(-1, laneOneRow, obstacles.laneOne, 'lane-one', 1000);
    moveLaneTwo(+1, laneTwoRow, obstacles.laneTwo, 'lane-two', 800);
  }

  function levelTwo() {
    laneOneRow = width;
    laneTwoRow = width * 2;
    laneThreeRow = width * 3;
    obstacles.frisbeesTwo = [2, 6, 9];
    moveFrisbeesOne(+1, frisbeeRowOne, obstacles.frisbeesOne, 'frisbee', 900);
    moveFrisbeesTwo(-1, frisbeeRowTwo, obstacles.frisbeesTwo, 'frisbee', 400);
    moveFrisbeesThree(
      +1,
      frisbeeRowThree,
      obstacles.frisbeesThree,
      'frisbee',
      700
    );
    moveLaneOne(-1, laneOneRow, obstacles.laneOne, 'lane-one', 1000);
    moveLaneTwo(+1, laneTwoRow, obstacles.laneTwo, 'lane-two', 200);
    moveLaneThree(-1, laneThreeRow, obstacles.laneThree, 'lane-one', 800);
  }

  function replay() {
    gameWonDiv.style.display = 'none';
    endGameDiv.style.display = 'none';
    gameBeatDiv.style.display = 'none';
    grid.style.display = 'flex';
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

  function restart() {
    levelDisplay.innerHTML = `<h2>Level: ${level}</h2>`;
    replay();
  }

  restartButton.forEach((button) => button.addEventListener('click', restart));

  function moveBoot(event) {
    cells[bootPosition].classList.remove('road-boot');
    cells[bootPosition].classList.remove('boot');
    const x = bootPosition % width;
    const y = Math.floor(bootPosition / width);

    switch (event.keyCode) {
      case 39:
        if (x < width - 1) bootPosition++;
        break;
      case 37:
        if (x > 0) bootPosition--;
        break;
      case 38:
        if (y > 0) bootPosition -= width;
        if (bootPosition < width - 1) console.log('invalid key');
        break;
      case 40:
        if (y < width - 1) bootPosition += width;
        break;
      default:
        console.log('invalid key');
    }
    checkCollision();
    checkPatchCollision();
    bootRoadDesign();
    cells[bootPosition].classList.add('boot');
  }
  document.addEventListener('keyup', moveBoot);

  function checkCollision() {
    const obstacleClassNames = ['frisbee', 'lane-one', 'lane-two'];
    obstacleClassNames.forEach((obstacle) => {
      if (cells[bootPosition].classList.contains(obstacle)) {
        endGame();
        clearIntervals();
        clearDesigns;
      }
    });
  }

  function checkPatchCollision() {
    if (
      (bootPosition > bogRowOne &&
        bootPosition < bogRowOne + width &&
        !cells[bootPosition].classList.contains('green-patch')) ||
      (bootPosition > bogRowTwo &&
        bootPosition < bogRowTwo + width &&
        !cells[bootPosition].classList.contains('green-patch'))
    ) {
      endGame();
    }
  }

  function endGame() {
    console.log('end game activated');
    grid.style.display = 'none';
    endGameDiv.style.display = 'flex';
    clearIntervals();
    clearDesigns();
    removeBoot();
    level = 0;
  }

  function gameBeat() {
    grid.style.display = 'none';
    gameWonDiv.style.display = 'none';
    gameBeatDiv.style.display = 'flex';
    clearDesigns();
    removeBoot();
    isGameBeat = true;
    level = 0;
  }

  function checkGameWon() {
    setInterval(() => {
      if (bootPosition < width - 1 && level === 2) {
        gameBeat();
      } else if (bootPosition < width - 1 && isGameBeat === false) {
        removeBoot();
        grid.style.display = 'none';
        gameWonDiv.style.display = 'flex';
        level += 1;
        levelDisplay.innerHTML = `<h2>Level: ${level}</h2>`;
        clearIntervals();
        clearDesigns();
      }
    }, 400);
  }

  function removeBoot() {
    cells[bootPosition].classList.remove('boot');
    cells[bootPosition].classList.remove('road-boot');
    bootPosition = 'string';
  }

  function resetBoot() {
    bootPosition = Math.floor(width * width - width / 2);
    cells[bootPosition].classList.add('boot');
  }

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
    const obstacleClassNames = [
      'frisbee',
      'lane-one',
      'lane-two',
      'road',
      'green-patch'
    ];
    obstacleClassNames.forEach((obstacle) => {
      for (let index = 0; index < gridCellCount; index++) {
        const element = cells[index];
        element.classList.remove(obstacle);
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
      frisbeesThreeInterval,
      patchesOneInterval,
      patchesTwoInterval,
      patchesThreeInterval
    ].forEach((i) => clearInterval(i));
  }
}

window.addEventListener('DOMContentLoaded', init);
