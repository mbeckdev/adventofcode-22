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
  let formattedData = {};

  // ************************
  // ANSWER LOGIC
  // ************************

  function getAnswer() {
    // console.log('formattedData', formattedData);
    // should look like
    // {
    //   a:{},
    //   b.txt:{name:'b.txt',type:'file',size:14848514}
    // }
    let files = {};
    files = formattedData;
    let bfile = { name: 'b.txt', type: 'file', size: 14848514 };
    let adir = { name: 'a', type: 'folder' };
    // files.push(afile);
    console.log('bfile.name', bfile.name);
    files[bfile.name] = bfile; //files['b'] = bfile;
    console.log('files', files);
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
    let topFolder = { name: '', type: 'folder' }; //top
    let currentFilePath = topFolder.name;
    let currentFolder; //a or b or c or '/'
    let currentFolderArr; // ['','a']

    //for each line
    for (let i = 0; i < arrayOfLines.length; i++) {
      //is this line a command?
      if (arrayOfLines[i][0] == '$') {
        //yes this index is a command. get the part without the '$ '
        let command = arrayOfLines[i].slice(2);
        let firstTwoChars = command.slice(0, 2);

        // console.log('command', command);
        // console.log('firstTwoChars=' + firstTwoChars);

        if (firstTwoChars == 'cd') {
          // command = 'cd /' or 'cd ..' or 'cd a' or 'cd b'...
          let afterTheCd = command.slice(3); //a
          // console.log('afterthecd=' + afterTheCd);

          if (afterTheCd == '/') {
            // 'cd /' - move currentFolder to top
            currentFolder = topFolder;
            currentFolderArr = [''];
            currentFilePath = topFolder.name; // '/'
          } else if (afterTheCd == '..') {
            // 'cd ..'
            // go up a folder....
          } else {
            //a
            // wants to change into a folder inside of current folder.
            let childFolderToSwitchTo = afterTheCd; //a
            console.log('childFolderToSwitchTo=' + childFolderToSwitchTo);
            currentFolder += `/${afterTheCd}`;
            currentFolderArr.push(afterTheCd); //['','a'] after pushing a
            // currentFolder = files[/][a][childFolderToSwitchTo]
            // currentFolder = currentFolder[childFolderToSwitchTo];
          }
        } else if (firstTwoChars == 'ls') {
          // '$ ls'
          //do nothing, next loop line will cover it
          //everything after this is a folder or file that we should write to an object
          // console.log('current folder is ', currentFolder);
          // console.log('current folder name is=' + currentFolder.name);
          //stop when next index is end or is a new command.
        }
      } else {
        //************************************ */
        // add a file or folder where we are
        //************************************ */
        console.log(
          '**about to add file or folder, currentFilePath=',
          currentFilePath
        );

        let thisString = arrayOfLines[i];
        let thisStringSplit = thisString.split(' ');
        let newObjToAdd = {};
        if (thisStringSplit[0] == 'dir') {
          //it's a folder
          newObjToAdd.type = 'folder';
          newObjToAdd.name = thisStringSplit[1];
        } else {
          // it's a file
          newObjToAdd.type = 'file';
          newObjToAdd.name = thisStringSplit[1];
          newObjToAdd.size = thisStringSplit[0];
        }

        //***************************** */
        //where to add??
        //***************************** */

        console.log(
          'access(formattedData, currentFolderArr)',
          access(formattedData, currentFolderArr)
        );
        console.log('z-currentFolderArr', currentFolderArr);
        console.log('z-formattedData', formattedData);
        if (currentFilePath == '' && !!formattedData) {
          //'top'
          formattedData[newObjToAdd.name] = newObjToAdd;
        } else {
          // not top folder, add to here.
          console.log('=======currentFilePath=' + currentFilePath);
          // currentFolderArr = //['','a']
          console.log(
            'looking in a folder - access(formattedData,currentFolderArr)',
            access(formattedData, currentFolderArr)
          );

          //check for if it exists already??
          //parse the currentFilePath

          // formattedData[a][d][somefolder] = newDataObjToAdd;
          // let multipleFolders = ['','a']
          console.log('formattedDataaaaa', formattedData);
        }
        // console.log('22222formattedData', formattedData);
      }
    }

    formattedData = {};
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
