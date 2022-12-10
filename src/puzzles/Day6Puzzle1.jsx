import { useState, useEffect } from 'react';
import PuzzleRow from './PuzzleRow';
// eslint-disable-next-line
import data from './data/d6p1.txt';
// eslint-disable-next-line
import dataexample from './data/d6p1-example.txt';

function Day6Puzzle1() {
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
    // console.log(formattedData[0]);
    // console.log(formattedData[1]);
    // console.log(formattedData[2]);
    // console.log(formattedData[3]);
    let answer = 3;

    //for every character in long string
    // for (let i = 3; i < formattedData[i].length; i++) {
    //   console.log('asdfasdf');
    //   let last4 = formattedData.slice(i - 4, i);
    //   console.log('last4', last4);
    // }
    // console.log('asdfasdfasdf');
    // console.log('asdf.lengh', formattedData.length);
    let firstMarkerIndex = returnFirstMarkerIndex(formattedData);
    let indexInEnglish = firstMarkerIndex + 1;

    function is4AllDifferent(fourString) {
      // const is4AllDifferent => (fourString) => {
      let values = new Map();

      for (let i = 0; i < fourString.length; i++) {
        // console.log('values map = ', values);
        if (values.has(fourString[i])) {
          return false;
        }
        values.set(fourString[i]);
      }
      return true;
    }

    function returnFirstMarkerIndex(formattedData) {
      for (let i = 4 - 1; i < formattedData.length; i++) {
        let last4 = formattedData.slice(i - 4 + 1, i + 1);
        // console.log('last4', last4);
        let last4AreDifferent = is4AllDifferent(last4);
        if (last4AreDifferent) {
          // console.log(
          //   'last 4 were different, first marker index is ',
          //   i,
          //   ' and is ',
          //   formattedData[i]
          // );
          return i;
        }
        // console.log('last4arediff', last4AreDifferent);
      }
      return -1;
    }

    answer = indexInEnglish;
    answer +=
      ' = The place wher the first start-of-packet marker is complete after this many characters have been processed checking for 4 chars that are different. - Using some broken device to communicate with weird signals. The elves are on the move now!';
    return answer;
  }

  // ************************
  // SPLIT UP DATA
  // ************************

  const splitUpData = () => {
    // console.log('splitting up data');
    // , rawText =', rawText);

    // let arrayOfLines = rawText.split('\r\n');
    let arrayOfLines = rawText;
    // console.log(arrayOfLines);

    formattedData = arrayOfLines;
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
      <PuzzleRow title="Day 6 Puzzle 1" finalAnswer={finalAnswer} />
    </div>
  );
}

export default Day6Puzzle1;
