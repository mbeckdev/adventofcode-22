import { useState, useEffect } from 'react';
import PuzzleRow from './PuzzleRow';
// eslint-disable-next-line
import data from './data/d1p1.txt';
// eslint-disable-next-line
import dataexample from './data/d1p1-example.txt';

function Day1Puzzle1() {
  let url = data;
  // let url = dataexample;
  // yay puzzles

  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState(null);
  const [finalAnswer, setFinalAnswer] = useState('blah is my TBD answer');
  // let finalAnswer = 'blah is my TBD answer';

  const [rawText, setRawText] = useState(null);
  let formattedData = 'willbereplaced';

  // ************************
  // ANSWER LOGIC
  // ************************

  function getAnswer() {
    // console.log('formattedData', formattedData);

    // console.log('formattedData from getAnser = ', formattedData);
    let answer = 42;
    let elfTotalsArray = [];

    //for each Elf
    for (let i = 0; i < formattedData.length; i++) {
      let thisElf = formattedData[i];
      // console.log('thisElf', thisElf);
      // console.log('formattedData', formattedData);
      // console.log('i= ', i, ' formattedData[i] = ', thisElf);
      //add up all of elf's calories, add it to a new array elfTotalsArray
      let thisElfTotal = 0;

      //for each food of an elf
      for (let j = 0; j < thisElf.length; j++) {
        // console.log('thisElf[j],', thisElf[j]);
        // console.log('thisElfTotal', thisElfTotal);
        thisElfTotal += thisElf[j];
      }
      elfTotalsArray.push(thisElfTotal);
    }
    // console.log('elfTotalsArray', elfTotalsArray);
    //Who is the largest?
    //Assume 1 is the largest, no ties
    let largestNumber = Math.max(...elfTotalsArray);
    // console.log('LargestNumber', largestNumber);
    // eslint-disable-next-line
    let largestNumberElfIndex = elfTotalsArray.indexOf(largestNumber);
    // console.log('largestNumberElfIndex', largestNumberElfIndex);

    // In case the Elves get hungry and need extra snacks, they need to know which Elf to ask:
    //they'd like to know how many Calories are being carried by the Elf carrying the most Calories.
    //In the example above, this is 24000 (carried by the fourth Elf).

    // Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?
    answer = largestNumber;
    answer +=
      ' = The number of Calories that the Elf carrying the most Calories has. Gotta know where the food is if things go south.';
    return answer;
  }

  // ************************
  // SPLIT UP DATA
  // ************************

  const splitUpData = () => {
    // console.log('splitting up data');
    // , rawText =', rawText);

    let arrayOfLines = rawText.split('\r\n');
    // console.log(arrayOfLines);
    let tempElfArray: string = [];
    let finalCalorieArray: Array = [];

    // console.log('aaa arrayOfLines.length', arrayOfLines.length);
    for (let i = 0; i < arrayOfLines.length; i++) {
      if (arrayOfLines[i]) {
        tempElfArray.push(Number(arrayOfLines[i]));
      } else {
        finalCalorieArray.push(tempElfArray);
        tempElfArray = [];
      }
    }
    finalCalorieArray.push(tempElfArray);
    tempElfArray = [];
    // console.log('finalCalorieArray', finalCalorieArray);

    formattedData = finalCalorieArray;
    // console.log('splitting up data end');
  };

  // ************************
  // GAME LOGIC
  // ************************

  const gameLogic = () => {
    let answer = getAnswer();
    setFinalAnswer(answer);
  };

  // ************************
  // Use Effects
  // ************************

  useEffect(() => {
    if (rawText) {
      splitUpData();
      gameLogic();
    }
    //// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawText]);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        throw response;
      })
      .then((rawText) => {
        setRawText(rawText);
        // console.log('settingRawText');
      })
      .catch((error) => {
        console.error('Error fetching rawText: ', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
        // console.log('loading complete!');
      });
  }, [url]);

  // ************************
  // REACT STUFF
  // ************************

  return (
    <div className="day1Puzzle1">
      <PuzzleRow title="Day 1 Puzzle 1" finalAnswer={finalAnswer} />
    </div>
  );
}

export default Day1Puzzle1;
