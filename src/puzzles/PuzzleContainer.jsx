import React from 'react';
import Day1Puzzle1 from './Day1Puzzle1';
import Day1Puzzle2 from './Day1Puzzle2';
import Day2Puzzle1 from './Day2Puzzle1';
import Day2Puzzle2 from './Day2Puzzle2';
// import Day2Puzzle2 from './Day2Puzzle2';

function PuzzleContainer() {
  return (
    <div className="puzzleContainer">
      <div>PuzzleContainer</div>
      <Day1Puzzle1 />
      <Day1Puzzle2 />
      <Day2Puzzle1 />
      <Day2Puzzle2 />
    </div>
  );
}

export default PuzzleContainer;
