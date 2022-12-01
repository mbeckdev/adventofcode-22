import React from 'react';
import PuzzleRow from './PuzzleRow';

// const [finalAnswer,setFinalAnswer] = useState('');
const finalAnswer = 'blah is my TBD answer';

function Day1Puzzle1() {
  return (
    <div className="day1Puzzle1">
      <PuzzleRow title="Day 1 Puzzle 1" finalAnswer={finalAnswer} />
    </div>
  );
}

export default Day1Puzzle1;
