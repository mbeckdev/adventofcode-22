import { useState, useEffect } from 'react';
import PuzzleRow from './PuzzleRow';
// eslint-disable-next-line
import data from './data/d7p1.txt';
// eslint-disable-next-line
import dataexample from './data/d7p1-example.txt';

function Day7Puzzle1() {
  // let url = data;
  let url = dataexample;

  // eslint-disable-next-line
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [error, setError] = useState(null);
  const [finalAnswer, setFinalAnswer] = useState('blah is my TBD answer');
  // let finalAnswer = 'blah is my TBD answer';

  const [rawText, setRawText] = useState(null);
  let formattedData = [];

  // ************************
  // ANSWER LOGIC
  // ************************

  function getAnswer() {
    let files = {};
    files = formattedData;
    let bfile = { name: 'b.txt', type: 'file', size: 14848514 };
    let adir = { name: 'a', type: 'folder' };
    // files.push(afile);
    // console.log('bfile.name', bfile.name);
    files[bfile.name] = bfile; //files['b'] = bfile;
    // console.log('files', files);
    // console.log('bname', files.b.name);

    let answer = 3;

    answer = 42;
    answer += ' = wat.';
    return answer;
  }

  // ************************
  // SPLIT UP DATA
  // ************************

  const splitUpData = () => {
    // console.log('splitting up data');
    // , rawText =', rawText);

    let arrayOfLines = rawText.split('\r\n');
    console.log(arrayOfLines);
    let topFolder = 'top';
    let currentFilePath = topFolder;
    let currentFolder; //a or b or c or '/'
    let currentFolderArr; // ['top','a']

    //for each line
    for (let i = 0; i < arrayOfLines.length; i++) {
      //is this line a command?
      if (arrayOfLines[i][0] == '$') {
        //yes this index is a command. get the part without the '$ '
        let command = arrayOfLines[i].slice(2);
        let firstTwoChars = command.slice(0, 2);

        console.log('command', command);
        console.log('firstTwoChars=' + firstTwoChars);

        if (firstTwoChars == 'cd') {
          // command = 'cd /' or 'cd ..' or 'cd a' or 'cd b'...
          let afterTheCd = command.slice(3); //a

          if (afterTheCd == '/') {
            // 'cd /' - move currentFolder to top
            currentFolder = topFolder; // 'top'
            currentFolderArr = ['top'];
            currentFilePath = topFolder; // 'top'
          } else if (afterTheCd == '..') {
            // 'cd ..'
            // go up a folder....

            // currentFolder = 'a'
            // currentFilePath = // 'top/a' , now want 'top'
            console.log(
              '"cd .." just happened, currentFilePath =' +
                currentFilePath +
                ' and currentFolder=' +
                currentFolder +
                ' and currentFolderArr=',
              currentFolderArr
            );

            let indexOfFolderAtEnd = currentFilePath.lastIndexOf(currentFolder);
            currentFilePath = currentFilePath.slice(0, indexOfFolderAtEnd - 1); // 'top/a' will now be 'top'
            currentFolderArr.pop(); // was ['top','a']  now is ['top']
            currentFolder = currentFolderArr[currentFolderArr.length - 1]; //now is 'top'

            console.log(
              '"cd .." just happened afterdoingstuff, currentFilePath =' +
                currentFilePath +
                ' and currentFolder=' +
                currentFolder +
                ' and currentFolderArr=',
              currentFolderArr
            );
          } else {
            // a
            // wants to change into a folder inside of current folder.
            // let childFolderToSwitchTo = afterTheCd; //a
            currentFilePath += `/${afterTheCd}`;
            currentFolder = afterTheCd;
            currentFolderArr.push(afterTheCd); //['top','a'] after pushing a
            console.log('go deeper- currentFolder = ', currentFolder);
            console.log('go deeper- currentFilePath = ', currentFilePath);
            console.log('go deeper- currentFolderArr', currentFolderArr);
          }
        } else if (firstTwoChars == 'ls') {
          // '$ ls'
          //do nothing, next loop line will cover it
          //everything after this is a folder or file that we should write to ...something..one big object?
          // console.log('current folder is ', currentFolder);
          // console.log('current folder name is=' + currentFolder.name);
          //stop when next index is end or is a new command.
        }
      } else {
        //************************************ */
        // add a file or folder where we are
        //************************************ */
        console.log(
          '**about to add file or folder, currentFilePath=' + currentFilePath
        );

        let thisString = arrayOfLines[i];
        let thisStringSplit = thisString.split(' ');
        // let newObjToAdd = {};
        let newFileObj = {
          type: 'file',
          name: undefined,
          filepath: undefined,
          size: undefined,
        };
        let newFolderObj = {
          type: 'folder',
          name: undefined,
          filepath: undefined,
        };

        if (thisStringSplit[0] == 'dir') {
          //it's a folder
          newFolderObj.name = thisStringSplit[1];
          console.log(
            'about to add new folder, currentFilePath = ',
            currentFilePath
          );
          newFolderObj.filepath = currentFilePath;
        } else {
          // it's a file

          newFileObj.name = thisStringSplit[1];
          newFileObj.size = thisStringSplit[0];
          newFileObj.filepath = currentFilePath;
        }

        //***************************** */
        //where to add??
        //***************************** */

        if (newFileObj.name !== undefined) {
          formattedData.push(newFileObj);
        } else if (newFolderObj !== undefined) {
          formattedData.push(newFolderObj);
        } else {
          console.error('error in pushing an object into the formattedData');
        }
      }
    }

    console.log(
      'done splitting up data, formatted Data looks like',
      formattedData
    );
    // formattedData = [];
  };

  function access(obj, properties) {
    console.log('obj', obj);
    console.log('properties', properties);
    for (let i = 0; i < properties.length; i++) {
      obj = obj[properties[i]];
    }
    return obj;
  }

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
      <PuzzleRow title="Day 7 Puzzle 1" finalAnswer={finalAnswer} />
    </div>
  );
}

export default Day7Puzzle1;
