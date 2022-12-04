import { useState, useEffect } from 'react';
import PuzzleRow from './PuzzleRow';
// eslint-disable-next-line
import data from './data/d3p1.txt';
// eslint-disable-next-line
import dataexample from './data/d3p1-example.txt';
// eslint-disable-next-line
import priorityData from './data/d3p1-priorities.txt';

function Day3Puzzle2() {
  let url = data;
  // let url = dataexample;
  let urlPriority = priorityData;

  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState(null);
  const [finalAnswer, setFinalAnswer] = useState('blah is my TBD answer');
  // let finalAnswer = 'blah is my TBD answer';

  const [rawText, setRawText] = useState(null);
  let formattedData = 'willbereplaced';
  const [rawPriorityText, setRawPriorityText] = useState(null);
  // let formattedPriorityData = 'willbereplaced'; //using letterPriority Map instead

  // ************************
  // HELPERS
  // ************************

  let letterPriority = new Map();
  // letterPriority.set('a', 1);
  // console.log('letterPriority.get("a")', letterPriority.get('a'));
  // console.log('rawPriorityText', rawPriorityText);

  // ************************
  // ANSWER LOGIC
  // ************************

  function getAnswer() {
    // console.log('formattedData', formattedData);
    let prioritySumOfMatchingLetters = 0;

    let formattedDataInThrees = [];
    for (let i = 0; i < formattedData.length; i = i + 3) {
      let tempGroup = [];
      // console.log('i ', i, 'formattedData[i]', formattedData[i]);
      // console.log(formattedData[i])
      tempGroup.push(formattedData[i]);
      tempGroup.push(formattedData[i + 1]);
      tempGroup.push(formattedData[i + 2]);
      formattedDataInThrees.push(tempGroup);
    }
    // console.log('formattedDataInThrees', formattedDataInThrees);

    let sumOfLetterPriorities = 0;

    //for each group
    for (
      let groupIndex = 0;
      groupIndex < formattedDataInThrees.length;
      groupIndex++
    ) {
      //
      // console.log(
      //   'formattedDataInThrees[groupIndex]',
      //   formattedDataInThrees[groupIndex]
      // );
      let thisGroup = formattedDataInThrees[groupIndex];
      const commonLetterInGroup = getCommonLetterInGroup(thisGroup);
      sumOfLetterPriorities += letterPriority.get(commonLetterInGroup);

      // console.log('common letter in group is', commonLetterInGroup);
      // console.log(
      //   'letterPriority.get(commonLetterInGroup)',
      //   letterPriority.get(commonLetterInGroup)
      // );
    }

    function getCommonLetterInGroup(group) {
      let continueSearchingForMatch = true;
      const bag1 = group[0][0];
      const bag2 = group[1][0];
      const bag3 = group[2][0];

      //for all letters in the bag:
      for (
        let letterIndexBag1 = 0;
        letterIndexBag1 < bag1.length;
        letterIndexBag1++
      ) {
        for (
          let letterIndexBag2 = 0;
          letterIndexBag2 < bag2.length;
          letterIndexBag2++
        ) {
          for (
            let letterIndexBag3 = 0;
            letterIndexBag3 < bag3.length;
            letterIndexBag3++
          ) {
            // console.log('bag1[letterIndexBag1]', bag1[letterIndexBag1]);
            // console.log('bag2[letterIndexBag2]', bag2[letterIndexBag2]);
            // console.log('bag3[letterIndexBag3]', bag3[letterIndexBag3]);

            // console.log('bag1[letterIndexBag1]', bag1[letterIndexBag1]);

            if (
              bag1[letterIndexBag1] === bag2[letterIndexBag2] &&
              bag1[letterIndexBag1] === bag3[letterIndexBag3]
            ) {
              // it's a match
              // console.log(
              //   'common letter across this group is',
              //   bag1[letterIndexBag1]
              // );
              return bag1[letterIndexBag1];
            }
          }
        }
      }

      return 'no common letter in group';
    }

    // console.log('formattedData from getAnser = ', formattedData);
    let answer = 3;

    answer = sumOfLetterPriorities;
    answer +=
      ' = sum of the matching letters of each rucksack. Who packed these anyway? - hey I made a Map() from a .txt file for the letterPriority!';
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

    // console.log('aaa arrayOfLines.length', arrayOfLines.length);
    // for each line in the text file:
    let tempData = [];

    for (let i = 0; i < arrayOfLines.length; i++) {
      //take the long string, chop it in half
      const thisRow = arrayOfLines[i];
      // console.log('thisRow', thisRow);
      //assuming thisRow is always even:
      const halfRowLength = thisRow.length / 2;

      let newArrayForRow = [];
      newArrayForRow.push(thisRow);
      // newArrayForRow.push(thisRow.slice(0, halfRowLength));
      // newArrayForRow.push(thisRow.slice(halfRowLength, thisRow.length));
      // // console.log('newArrayForRow', newArrayForRow);
      tempData.push(newArrayForRow);
    }

    // console.log('tempData', tempData);

    //formattedData should look like
    // [['asdf','aghj'],['qwer','qtyu'],['zxcv','zbnm']]
    formattedData = tempData;
    // console.log('formattedData', formattedData);
    // console.log('splitting up data end');

    //
    //
    //
    // split up other data file for priority numbers
    // let tempPriorityData = [];
    // let tempPriorityDataArray = [];
    // console.log('rawPriorityText==', rawPriorityText);

    let arrayOfPriorityLines = rawPriorityText.split('\r\n');
    // console.log('arrayOfPriorityLines==', arrayOfPriorityLines);
    for (let i = 0; i < arrayOfPriorityLines.length; i++) {
      //
      let tempThing = [];
      let row = arrayOfPriorityLines[i];
      tempThing.push(row[0]);
      tempThing.push(row.slice(1));
      letterPriority.set(row[0], Number(row.slice(1)));
      // console.log('tempThing', tempThing);
      // tempPriorityDataArray.push(tempThing);
    }

    // console.log('tempPriorityDataArray', tempPriorityDataArray);
    // console.log('letterPriority', letterPriority);

    // formattedPriorityData = tempPriorityDataArray;
    //tempPriorityData = priorityData;
    // console.log('arrayOfPriorityLines', arrayOfPriorityLines);
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

  // for priority data
  useEffect(() => {
    if (rawPriorityText) {
      splitUpData();
      gameLogic();
    }
    //// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawPriorityText]);

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

  useEffect(() => {
    fetch(urlPriority)
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        throw response;
      })
      .then((rawPriorityText) => {
        setRawPriorityText(rawPriorityText);
        // console.log('settingRawPriorityText');
      })
      .catch((error) => {
        console.error('Error fetching rawText: ', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
        // console.log('loading complete!');
      });
  }, [urlPriority]);

  // ************************
  // REACT STUFF
  // ************************

  return (
    <div className="day3Puzzle2">
      <PuzzleRow title="Day 3 Puzzle 2" finalAnswer={finalAnswer} />
    </div>
  );
}

export default Day3Puzzle2;

// One Elf has the important job of loading all of the rucksacks with supplies for the jungle journey. Unfortunately, that Elf didn't quite follow the packing instructions, and so a few items now need to be rearranged.

// Each rucksack has two large compartments. All items of a given type are meant to go into exactly one of the two compartments. The Elf that did the packing failed to follow this rule for exactly one item type per rucksack.

// The Elves have made a list of all of the items currently in each rucksack (your puzzle input), but they need your help finding the errors. Every item type is identified by a single lowercase or uppercase letter (that is, a and A refer to different types of items).

// The list of items for each rucksack is given as characters all on a single line. A given rucksack always has the same number of items in each of its two compartments, so the first half of the characters represent items in the first compartment, while the second half of the characters represent items in the second compartment.

// For example, suppose you have the following list of contents from six rucksacks:

// vJrwpWtwJgWrhcsFMMfFFhFp
// jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
// PmmdzqPrVvPwwTWBwg
// wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
// ttgJtRGJQctTZtZT
// CrZsJsPPZsGzwwsLwLmpwMDw
// The first rucksack contains the items vJrwpWtwJgWrhcsFMMfFFhFp, which means its first compartment contains the items vJrwpWtwJgWr, while the second compartment contains the items hcsFMMfFFhFp. The only item type that appears in both compartments is lowercase p.
// The second rucksack's compartments contain jqHRNqRjqzjGDLGL and rsFMfFZSrLrFZsSL. The only item type that appears in both compartments is uppercase L.
// The third rucksack's compartments contain PmmdzqPrV and vPwwTWBwg; the only common item type is uppercase P.
// The fourth rucksack's compartments only share item type v.
// The fifth rucksack's compartments only share item type t.
// The sixth rucksack's compartments only share item type s.
// To help prioritize item rearrangement, every item type can be converted to a priority:

// Lowercase item types a through z have priorities 1 through 26.
// Uppercase item types A through Z have priorities 27 through 52.
// In the above example, the priority of the item type that appears in both compartments of each rucksack is 16 (p), 38 (L), 42 (P), 22 (v), 20 (t), and 19 (s); the sum of these is 157.

// Find the item type that appears in both compartments of each rucksack. What is the sum of the priorities of those item types?
