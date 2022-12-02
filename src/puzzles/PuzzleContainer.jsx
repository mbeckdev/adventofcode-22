import React from 'react';
import Day1Puzzle1 from './Day1Puzzle1';
import Day1Puzzle2 from './Day1Puzzle2';

function PuzzleContainer() {
  return (
    <div className="puzzleContainer">
      <div>PuzzleContainer</div>
      <Day1Puzzle1 />
      <Day1Puzzle2 />
    </div>
  );
}

export default PuzzleContainer;
