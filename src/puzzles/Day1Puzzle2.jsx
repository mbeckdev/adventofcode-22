import { useState, useEffect } from 'react';
import PuzzleRow from './PuzzleRow';
// eslint-disable-next-line
import data from './data/d1p1.txt';
// eslint-disable-next-line
import dataexample from './data/d1p1-example.txt';

function Day1Puzzle2() {
  let url = data;
  // let url = dataexample;

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
    // console.log('elfTotalsArray', elfTotalsArray);
    elfTotalsArray.sort((a, b) => {
      if (a < b) return 1;
      if (a > b) return -1;
      return 0;
    });
    // console.log('elfTotalsArray', elfTotalsArray);
    let sumOfTopThreeElfCalories =
      elfTotalsArray[0] + elfTotalsArray[1] + elfTotalsArray[2];

    // // By the time you calculate the answer to the Elves' question, they've already realized that the
    // Elf carrying the most Calories of food might eventually run out of snacks.

    // // To avoid this unacceptable situation, the Elves would instead like to know the total Calories
    // carried by the top three Elves carrying the most Calories. That way, even if one of those Elves
    // runs out of snacks, they still have two backups.

    // // In the example above, the top three Elves are the fourth Elf (with 24000 Calories), then the
    // third Elf (with 11000 Calories), then the fifth Elf (with 10000 Calories). The sum of the Calories
    // carried by these three elves is 45000.

    // // Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?
    // answer = largestNumber;
    answer = sumOfTopThreeElfCalories;
    answer +=
      ' = The number of Calories of the top three elves carrying the most calories. Is this going to turn into Hunger Games?';
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
    <div className="day1Puzzle2">
      <PuzzleRow title="Day 1 Puzzle 2" finalAnswer={finalAnswer} />
    </div>
  );
}

export default Day1Puzzle2;
