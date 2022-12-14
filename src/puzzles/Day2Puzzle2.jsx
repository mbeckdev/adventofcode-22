import { useState, useEffect } from 'react';
import PuzzleRow from './PuzzleRow';
// eslint-disable-next-line
import data from './data/d2p1.txt';
// eslint-disable-next-line
import dataexample from './data/d2p1-example.txt';
import { renderIntoDocument } from 'react-dom/test-utils';

function Day2Puzzle2() {
  const url = data;
  // const url = dataexample;

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

    const shapePoints = new Map();
    shapePoints.set('A', 1); //rock them
    shapePoints.set('B', 2); //paper them
    shapePoints.set('C', 3); //scissors them

    const strategyOutcome = new Map();
    strategyOutcome.set('X', 1); // I need to lose (NOT rock me) 0
    strategyOutcome.set('Y', 2); // I need to draw (NOT paper me) 3
    strategyOutcome.set('Z', 3); // I need to win (NOT scissors me) 6
    // console.log('shapePoints.get("A")', shapePoints.get('A'));

    let myTotalScore = 0;
    for (let i = 0; i < formattedData.length; i++) {
      const scoreForRound = getScoreForRound(formattedData[i]);
      myTotalScore += scoreForRound;
    }
    //A=Rock 1pt, B=Paper 2pt, C=Scissors 3pt    them
    //lose=0, draw=3, won=6
    //X=Rock 1pt, Y=Paper 2pt, Z=Scissors 3pt    you/me

    function getScoreForRound(round: Array) {
      let totalPointsForRound = 0;
      const theirLetter = round[0];
      const myStrategyOutcomeLetter = round[1];
      const myStrategyOutcome = strategyOutcome.get(myStrategyOutcomeLetter);
      // console.log(
      //   'theirletter',
      //   theirLetter,
      //   'myStrategyOutcomeLetter',
      //   myStrategyOutcomeLetter,
      //   'myStrategyOutcome',
      //   myStrategyOutcome
      // );

      const theirShapePoints = shapePoints.get(theirLetter);
      // console.log('theirShapePoints', theirShapePoints);

      let myMove = 0;
      if (myStrategyOutcome === 2) {
        // console.log('i need to draw');
        //draw needed
        // they have 1a rock, y draw,  i need rock

        myMove = theirShapePoints;
      }
      if (myStrategyOutcome === 1) {
        // console.log('i need to lose');
        // lose needed
        // if they have 2b paper,   and i need to lose,  I need rock
        myMove = theirShapePoints - 1;
        if (myMove === 0) myMove = 3;
        // 2-1=1
        // 3-1=2
        // 1-1=0  so this needs to be 3
      }
      if (myStrategyOutcome === 3) {
        // console.log('i need to win');
        // win needed
        // if they have 3c scissors,  and i need a win, i need rock
        myMove = theirShapePoints + 1;
        // 1+1=2, 2+1=3, 3+1=4
        if (myMove === 4) myMove = 1;
      }
      const myResultsPoints = (myStrategyOutcome - 1) * 3;
      // console.log('myResultsPoints', myResultsPoints);
      const myShapePoints = myMove;

      // let myLetter = 3;
      // let myShapePoints = shapePoints.get(myLetter);

      // let myResultsPoints = 0;

      // let myDiff = myShapePoints - theirShapePoints;

      //they 1a, me 1x   0 rock rock tie
      //they 1a, me 2y   1 rock paper   i win
      //they 1a, me 3z   2 rock scissors  i loose

      //they 2b, me 1x   -1 paper rock   i lose
      //they 2b, me 2y   0 paper paper   tie
      //they 2b, me 3z   1 paper scissors  i win

      //they 3c, me 1x   -2 scissors rock   i win
      //they 3c, me 2y   -1 scissors paper   i lose
      //they 3c, me 3z   0 scissors scissors  tie

      // if (myDiff === 0) myResultsPoints = 3; //draw
      // if (myDiff === 1 || myDiff === -2) myResultsPoints = 6; //win
      // if (myDiff === 2 || myDiff === -1) myResultsPoints = 0; //i lose

      totalPointsForRound = myShapePoints + myResultsPoints;
      totalPointsForRound = myShapePoints + myResultsPoints;
      // console.log('myShapePoints', myShapePoints);
      // console.log('myResultsPoints', myResultsPoints);
      // console.log('totalPointsForRound', totalPointsForRound);
      return totalPointsForRound;
    }

    const answer = myTotalScore;
    const returnAnswer =
      Number(answer) +
      ' = my total score for rock paper scissors using a strategy guide where second number is desired outcome for rock paper scissors. In order to decide whose tent gets closest to the snack storage.';
    return returnAnswer;
  }

  // ************************
  // SPLIT UP DATA
  // ************************

  const splitUpData = () => {
    // console.log('splitting up data');
    // , rawText =', rawText);

    const arrayOfLines = rawText.split('\r\n');
    // console.log('arrayOfLines', arrayOfLines);
    const allRounds = [];
    for (let i = 0; i < arrayOfLines.length; i++) {
      const round = [];
      round.push(arrayOfLines[i][0]);
      round.push(arrayOfLines[i][2]);
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
    const answer = getAnswer();
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
    <div className="day2Puzzle2">
      <PuzzleRow title="Day 2 Puzzle 2" finalAnswer={finalAnswer} />
    </div>
  );
}

export default Day2Puzzle2;
