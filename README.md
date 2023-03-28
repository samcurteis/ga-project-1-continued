# General Assembly Project 1 Continued

This repository is where I have gone back to the first project I completed as part of the Software Engineering Immersive course at General Assembly and made changes. If you would like to view the project as it was when I completed it within the allotted 1-week timeframe, as well as a full readme on how the project went, you can view it here:  https://github.com/samcurteis/ga-project-1.

## What I changed

The changes I have made to this project are relatively minor and mostly pertain to creating objects that the player can hop onto, similar to logs on a river in a traditional frogger game. I was quite frustrated that I didn't manage to do this by the deadline of the project, so I was eager to go back and figure it out, without necessarily revamping the game significantly.

## The Problem

It would have been fairly straightforward to create an object that the player had to hop onto by creating the reverse of a normal object, where if the player was in the same lane as the object, but not in the same position, the game would end (with a normal object the game ends if the player is in the same position as an object). An important aspect of the logs (which I call patches in my code) that I wanted was that the player would move with the patches once they landed on them. This is where I struggled to find a solution. My original attempt was to check the classlist of the player or the object, like so:

```
if (cells[bootPosition].classList.contains("green-patch")) {
         bootPosition = bootPosition + direction;
}
```

This created inconsistent results, however, in which the player would move out of step with the patch (e.g. if the coordinates of the patch were `[2, 3, 4]`, the player would move within the coordinates `[1, 2, 3]`).

## The Solution

The solution I eventually found was to use the values that set where the obstacles are placed, rather than the class names assigned to their corresponding divs.

```
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
```

In this code block, `newObstacleArray` represents an array of values (e.g. `[31, 32, 33, 38, 39, 40]`), which determine where the patches will be on the grid. If the value of `bootPosition`, which determines where the player will be on the grid, is included in the `newObstacleArray`, then the player is on the patch and will move in the same direction with it. The if statement then checks if the player moves to the end of the row while moving on the patches. If they do this then the game will end. 
