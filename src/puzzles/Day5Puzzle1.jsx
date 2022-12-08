import { useState, useEffect } from 'react';
import PuzzleRow from './PuzzleRow';
// eslint-disable-next-line
import data from './data/d5p1.txt';
// eslint-disable-next-line
import dataexample from './data/d5p1-example.txt';

function Day5Puzzle1() {
  let url = data;
  // let url = dataexample;

  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState(null);
  const [finalAnswer, setFinalAnswer] = useState('blah is my TBD answer');
  // let finalAnswer = 'blah is my TBD answer';

  const [rawText, setRawText] = useState(null);
  // let formattedData = 'willbereplaced';
  let formattedData = {};

  // ************************
  // ANSWER LOGIC
  // ************************

  function getAnswer() {
    // console.log('formattedData', formattedData);
    let directions = formattedData.directions;
    let stacks = formattedData.stacks;

    // console.log('stacks', stacks);
    // console.log('directions', directions);
    function doDirections(howMany, fromStack, toStack) {
      // console.log('asdf');

      for (let j = 0; j < howMany; j++) {
        let poppedLetter = stacks[fromStack].pop();
        stacks[toStack].push(poppedLetter);
      }
    }

    //for each directions
    for (let i = 0; i < directions.length; i++) {
      // let i = 0;
      let newArr = directions[i].split(' ');
      // console.log('newArr', newArr);
      let howMany = Number(newArr[1]);
      // let howMany = directions[i].slice(5, 6);
      let fromStack = Number(newArr[3]) - 1;
      // let fromStack = directions[i].slice(12, 13) - 1;
      let toStack = Number(newArr[5]) - 1;
      // let toStack = directions[i].slice(17, 18) - 1;

      // console.log(
      //   'howMany',
      //   howMany,
      //   'fromStack',
      //   fromStack,
      //   'toStack',
      //   toStack
      // );
      doDirections(howMany, fromStack, toStack);
    }

    // console.log('stacks', stacks);
    let answer = 3;
    // answer is top of each stack at end.
    // for each stack
    answer = '';
    for (let i = 0; i < stacks.length; i++) {
      if (stacks[i] != '') {
        answer += stacks[i][stacks[i].length - 1];
      }
    }

    // console.log('asnwer', answer);

    answer +=
      ' = List of the top crate in all the stacks after doing all the directions to offload elf crates from the ship without just asking.';
    return answer;
  }

  // ************************
  // SPLIT UP DATA
  // ************************

  const splitUpData = () => {
    // console.log('splitting up data');
    // , rawText =', rawText);

    let arrayOfLines = rawText.split('\r\n');
    // let dur = arrayOfLines.find((line) => line == '');
    // let ha = arrayOfLines.findIndex((line) => line == '');
    let emptyIndex = arrayOfLines.indexOf('');

    // console.log('arrayofLines', arrayOfLines);

    let indexNumStacks = emptyIndex - 1;
    let trimmedStacksLine = arrayOfLines[indexNumStacks].trim();
    // console.log('trimStacksLine -' + trimmedStacksLine + '-');
    let numStacks = trimmedStacksLine[trimmedStacksLine.length - 1];
    // console.log('numStacks', numStacks);

    // find stacks like
    // finished should look like:
    // let stacks = [['Z','N'],['M','C','D'],['P']]
    // let stacks = new Array(3);
    let stacks = [];
    for (let p = 0; p < numStacks; p++) {
      stacks.push([]);
    }

    // console.log('stacks', stacks);
    // console.log(stacks[0]);
    // stacks[0].push(['a', 'e']);
    let stacksLetters = arrayOfLines.slice(0, indexNumStacks);
    // console.log('stacksletters', stacksLetters);

    // for every text line that has the [N] letters in it. (starting from bottom and working up)
    for (let lineIndex = numStacks - 1; lineIndex >= 0; lineIndex--) {
      // arrayOfLines[]
      // console.log(arrayOfLines[lineIndex]);

      let firstLetter = arrayOfLines[lineIndex][1 + 4 * 0];
      let secondLetter = arrayOfLines[lineIndex][1 + 4 * 1];
      let thirdLetter = arrayOfLines[lineIndex][1 + 4 * 2];
      // console.log(firstLetter, ',', secondLetter, ',', thirdLetter);

      //for every stack
      for (let i = 0; i < numStacks; i++) {
        if (arrayOfLines[lineIndex][1 + 4 * i] != ' ') {
          // console.log('aaaaaaaa', arrayOfLines[lineIndex][1 + 4 * i]);

          stacks[i].push(arrayOfLines[lineIndex][1 + 4 * i]); //put a letter on a stack
        }
      }
    }

    // * * * * * * * * * * * * * **
    //do second part of text
    // let stacks = [['Z','N'],['M','C','D'],['P']]
    // function doDirections(howMany, fromStack, toStack) {
    //   //
    // }
    let directionsArray = arrayOfLines.slice(indexNumStacks + 2);
    // console.log('directionsArray', directionsArray);

    formattedData.stacks = stacks;
    formattedData.directions = directionsArray;

    // console.log('end stacks', stacks);

    // formattedData = 'something';
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
      <PuzzleRow title="Day 5 Puzzle 1" finalAnswer={finalAnswer} />
    </div>
  );
}

export default Day5Puzzle1;
