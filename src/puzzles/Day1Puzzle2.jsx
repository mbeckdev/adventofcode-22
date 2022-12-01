import React from 'react';
import PuzzleRow from './PuzzleRow';

// const [finalAnswer,setFinalAnswer] = useState('');
const finalAnswer = 'blah is my TBD answer';

function Day1Puzzle2() {
  return (
    <div className="day1Puzzle1">
      <PuzzleRow title="Day 1 Puzzle 2" finalAnswer={finalAnswer} />
    </div>
  );
}

export default Day1Puzzle1;
