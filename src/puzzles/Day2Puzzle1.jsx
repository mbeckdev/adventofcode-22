import { useState, useEffect } from 'react';
import PuzzleRow from './PuzzleRow';
// eslint-disable-next-line
import data from './data/d2p1.txt';
// eslint-disable-next-line
import dataexample from './data/d2p1-example.txt';
import { renderIntoDocument } from 'react-dom/test-utils';

function Day2Puzzle1() {
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

    let shapePoints = new Map();
    shapePoints.set('A', 1); //rock them
    shapePoints.set('B', 2); //paper them
    shapePoints.set('C', 3); //scissors them
    shapePoints.set('X', 1); //rock me
    shapePoints.set('Y', 2); //paper me
    shapePoints.set('Z', 3); //scissors me
    // console.log('shapePoints.get("A")', shapePoints.get('A'));

    let myTotalScore = 0;
    for (let i = 0; i < formattedData.length; i++) {
      let scoreForRound = getScoreForRound(formattedData[i]);
      myTotalScore += scoreForRound;
    }
    //A=Rock 1pt, B=Paper 2pt, C=Scissors 3pt    them
    //lose=0, draw=3, won=6
    //X=Rock 1pt, Y=Paper 2pt, Z=Scissors 3pt    you/me

    function getScoreForRound(round: Array) {
      let totalPointsForRound = 0;
      let theirLetter = round[0];
      let myLetter = round[1];
      // console.log('theirletter', theirLetter, 'myletter', myLetter);
      let theirShapePoints = shapePoints.get(theirLetter);
      let myShapePoints = shapePoints.get(myLetter);

      let myResultsPoints = 0;

      let myDiff = myShapePoints - theirShapePoints;
      //they 1a, me 1x   0 rock rock tie
      //they 1a, me 2y   1 rock paper   i win
      //they 1a, me 3z   2 rock scissors  i loose

      //they 2b, me 1x   -1 paper rock   i lose
      //they 2b, me 2y   0 paper paper   tie
      //they 2b, me 3z   1 paper scissors  i win

      //they 3c, me 1x   -2 scissors rock   i win
      //they 3c, me 2y   -1 scissors paper   i lose
      //they 3c, me 3z   0 scissors scissors  tie

      if (myDiff === 0) myResultsPoints = 3; //draw
      if (myDiff === 1 || myDiff === -2) myResultsPoints = 6; //win
      if (myDiff === 2 || myDiff === -1) myResultsPoints = 0; //i lose

      totalPointsForRound = myShapePoints + myResultsPoints;
      // console.log('myShapePoints', myShapePoints);
      // console.log('myResultsPoints', myResultsPoints);
      // console.log('totalPointsForRound', totalPointsForRound);
      // console.log(`asdfa ${somevariable} asdfasd`);
      return totalPointsForRound;
    }

    let answer = myTotalScore;
    answer +=
      ' = my total score using a strategy guide given to me by a quesionable elf for rock paper scissors';
    return answer;
  }

  // ************************
  // SPLIT UP DATA
  // ************************

  const splitUpData = () => {
    // console.log('splitting up data');
    // , rawText =', rawText);

    let arrayOfLines = rawText.split('\r\n');
    // console.log('arrayOfLines', arrayOfLines);
    let allRounds = [];
    for (let i = 0; i < arrayOfLines.length; i++) {
      // console.log('asdfasdf');
      let round = [];
      round.push(arrayOfLines[i][0]);
      round.push(arrayOfLines[i][2]); //['a','x']
      allRounds.push(round);
    }
    // console.log('allRounds', allRounds);
    formattedData = allRounds;
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
    <div className="day2Puzzle1">
      <PuzzleRow title="Day 2 Puzzle 1" finalAnswer={finalAnswer} />
    </div>
  );
}

export default Day2Puzzle1;
