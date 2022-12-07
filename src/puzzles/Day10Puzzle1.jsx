import { useState, useEffect } from 'react';
import PuzzleRow from './PuzzleRow';
// eslint-disable-next-line
import data from './data/d10p1.txt';
// eslint-disable-next-line
import dataexample from './data/d10p1-example.txt';

function Day10Puzzle1() {
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

    let answer = 3;

    answer = 42;
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
      <PuzzleRow title="Day 10 Puzzle 1" finalAnswer={finalAnswer} />
    </div>
  );
}

export default Day10Puzzle1;
