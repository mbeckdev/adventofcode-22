import { useState, useEffect } from 'react';
import PuzzleRow from './PuzzleRow';
// eslint-disable-next-line
import data from './data/d4p1.txt';
// eslint-disable-next-line
import dataexample from './data/d4p1-example.txt';
import { isNewExpression } from 'typescript';
// 2-4,6-8
// 2-3,4-5
// 5-7,7-9
// 2-8,3-7
// 6-6,4-6
// 2-6,4-8
// how many fully contain the other?

function Day4Puzzle1() {
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
  // looks like [[[2,4],[6,8]],...]

  // ************************
  // ANSWER LOGIC
  // ************************

  function getAnswer() {
    // In how many assignment pairs does one range fully contain the other?
    // console.log('formattedData', formattedData);

    // console.log('formattedData from getAnser = ', formattedData);
    let answer;
    let sumOfRowsThatHaveFullContainment = 0;

    //for each pair of elves -aka for each row:
    for (let i = 0; i < formattedData.length; i++) {
      let thisPair = formattedData[i];
      // console.log('thisPairOfElves', thisPair);

      let elfAFirst = thisPair[0][0];
      let elfALast = thisPair[0][1];
      let elfBFirst = thisPair[1][0];
      let elfBLast = thisPair[1][1];

      //check if B is inside A
      if (elfAFirst <= elfBFirst && elfALast >= elfBLast) {
        // then B is inside A
        sumOfRowsThatHaveFullContainment++;
      } else if (elfAFirst >= elfBFirst && elfALast <= elfBLast) {
        // then A is inside B
        sumOfRowsThatHaveFullContainment++;
      }
    }

    answer = sumOfRowsThatHaveFullContainment;
    answer +=
      " = The number of assignment pairs where elves fully contain the other's cleaning areas. Dude, how many elves are there?!";
    return answer;
  }

  // ************************
  // SPLIT UP DATA
  // ************************

  const splitUpData = () => {
    // 2-4,6-8
    // 2-3,4-5
    // 5-7,7-9
    // 2-8,3-7
    // 6-6,4-6
    // 2-6,4-8
    //should look like
    //[[2,3],[4,5]]
    //or [[2,3],[4,5]],[[5,7],[7,9]],

    // console.log('splitting up data');
    // , rawText =', rawText);

    let arrayOfLines = rawText.split('\r\n');
    // console.log(arrayOfLines);
    // let finalCalorieArray: Array = [];
    let finalArray = [];
    // let finalArray=[];

    // console.lo/g('aaa arrayOfLines.length', arrayOfLines.length);
    // console.log('arrayOfLines', arrayOfLines);
    //for each row
    for (let i = 0; i < arrayOfLines.length; i++) {
      let row = [];
      let newRow = arrayOfLines[i].split(',');
      // newRow is [["2-4"],["6-8"]]

      let elfANums = newRow[0].split('-');
      let elfAFirst = Number(elfANums[0]);
      let elfALast = Number(elfANums[1]);
      let elfBNums = newRow[1].split('-');
      let elfBFirst = Number(elfBNums[0]);
      let elfBLast = Number(elfBNums[1]);

      ///hhhhhhhhhhhhhhhhhhhhhhheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrreeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
      // console.log('newRow', newRow);
      // finalArray.push(arrayOfLines[i]);
      // console.log(
      //   'elfAfirst',
      //   elfAFirst,
      //   '=',
      //   elfALast,
      //   '=',
      //   elfBFirst,
      //   '=',
      //   elfBLast
      // );
      let thisRow = [];
      let elfA = [elfAFirst, elfALast];
      let elfB = [elfBFirst, elfBLast];
      thisRow.push(elfA, elfB);
      finalArray.push(thisRow);
    }

    // eachRow.push(elfANums,elfBNums)
    // finalArray.push(eachRow)
    // console.log('finalArray', finalArray);

    formattedData = finalArray;
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
    <div className="day4Puzzle1">
      <PuzzleRow title="Day 4 Puzzle 1" finalAnswer={finalAnswer} />
    </div>
  );
}

export default Day4Puzzle1;
