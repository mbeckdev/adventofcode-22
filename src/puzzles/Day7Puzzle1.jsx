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
    console.log('formattedData', formattedData);

    //we find all filepaths - that will be a list of the directories
    let directories = new Map(); //
    // directories.set('top/a/e',0); //key will be filepath, value will be size
    // let directories = new Set(); //'top/a/e', and 'top', and 'top/a', and 'top/d'

    for (let i = 0; i < formattedData.length; i++) {
      let fileOrFolder = formattedData[i];
      //howmanyslashes?

      let filepathname = fileOrFolder.filepath;
      console.log('filepathname', filepathname);
      // let dur = (filepathname).count('/');
      let matcharray = filepathname.match(/\//g);
      let numberOfSlashes;
      if (matcharray) {
        numberOfSlashes = matcharray.length; //it's not null,
      } else {
        numberOfSlashes = 0;
      }
      // console.log('durcount =', dur);
      // console.log('numberOfSlashes', numberOfSlashes);
      // let regexSlashes = /[a]/g;
      // let numberOfSlashes = filepathname.search(regexSlashes);
      // console.log('numberofslashes', numberOfSlashes);
      // console.log('uhng', 'top/a/a/e'.search(regexSlashes));
      directories.set(fileOrFolder.filepath, numberOfSlashes);
    }
    console.log('directories map = ', directories);
    // 0
    // :
    // "top"
    // 1
    // :
    // "top/a"
    // 2
    // :
    // "top/a/e"
    // 3
    // :
    // "top/d"
    // const iterator1 =
    console.log(directories.entries());
    // let sortedDirectories = new Map(
    //   [...directories.entries()].sort((a, b) => a.values > b.values)
    // );

    // console.log('sorteddirectories map = ', sortedDirectories);

    // const map1 = new Map();

    // map1.set('0', 'foo');
    // map1.set(1, 'bar');
    // map1.set(3, 'cho');

    // const iterator1 = map1.entries();

    // console.log(iterator1.next().value);
    // // expected output: ["0", "foo"]

    // console.log(iterator1.next().value);
    // // expected output: [1, "bar"]
    // console.log(iterator1.next().value);
    // let mapAsc = new Map([...map1.entries()].sort((a, b) => a[0] > b[0]));
    let directoriesArr = [...directories.entries()].sort();
    // console.log('directoreisArr', directoriesArr);

    let sortedDirectoriesArr = [...directoriesArr].sort((a, b) => {
      // console.log('a[0]=', a[0], ' and a[1]=', a[1]);
      // console.log('b[0]=', b[0], ' and b[1]=', b[1]);
      return b[1] - a[1];
    });
    console.log('sortedDirectoriesArr', sortedDirectoriesArr);
    // 0
    // :
    // (2) ['top/a/e', 2]
    // 1
    // :
    // (2) ['top/a', 1]
    // 2
    // :
    // (2) ['top/d', 1]
    // 3
    // :
    // (2) ['top', 0]

    let directorySizes = new Map();

    ///////ok, now loop through them all adding up sizessssss
    for (let i = 0; i < sortedDirectoriesArr.length; i++) {
      console.log(
        '* * * * * * * LOOKING THROUGH sortedDirectoriesArr[',
        i,
        ']',
        sortedDirectoriesArr[i]
      );
      // sortedDirectoriesArr[i] = ['top/a/e', 2]
      let thisFilePath = sortedDirectoriesArr[i][0]; // 'top/a/e'

      let thisFolderSize = 0;
      let dataIndexWithFolder = undefined;
      let thisIsTheFolderJ = undefined;
      //loop through all files and folders, the ones that have this filepath of 'top/a/e', find it's size
      for (let j = 0; j < formattedData.length; j++) {
        // console.log('formattedData[j].filepath', formattedData[j].filepath);
        // console.log('thisfilepath', thisFilePath);

        // let regexSlashes = /[a]/g;
        // let numberOfSlashes = filepathname.search(regexSlashes);
        // let regexTopA = /top\/a/g; //  top/a
        let regexFilePath = new RegExp(thisFilePath, 'g');

        let dddd = formattedData[j].filepath.search(regexFilePath);
        // if it matches
        if (dddd != -1) {
          console.log('thisFolderSize', thisFolderSize, ' and j=', j);
          // if the size has not been set - like on a folder for the first time
          if (formattedData[j].size == undefined) {
            console.log(
              'this is one with the folder were looking for and thisisthefolderJ=',
              j
            );
            thisIsTheFolderJ = j;
          } else {
            // a size exists on this file or folder.
            console.log(
              'size exists, lets add it, thisFolderSize(' +
                thisFolderSize +
                ') +formattedData[j].size(' +
                formattedData[j].size +
                ')=' +
                Number(thisFolderSize) +
                Number(formattedData[j].size)
            );
            // has it been counted already? if so we don't want to count it again, // so has not been counted...
            if (!formattedData[j].counted) {
              console.log(
                'ZZZ formattedData[' +
                  j +
                  '].counted= ' +
                  formattedData.counted +
                  '\n and formattedData[' +
                  j +
                  ']=',
                formattedData[j]
              );
              thisFolderSize += formattedData[j].size;
              formattedData[j].counted = true;
              console.log(
                'we just set formattedData[' +
                  j +
                  '].counted = true, formattedDataj is',
                formattedData[j]
              );
            } else {
              // has already been counted, so ignore it.
            }
          }
        }
        console.log('formattedData[j].filepath.search(regexFilePath)', dddd);

        console.log(
          'formattedData[j].filepath=' +
            formattedData[j].filepath +
            ' formattedData[j].filepath.search(regexFilePath)=' +
            dddd
        );

        // if (formattedData[j].filepath === thisFilePath) {
        //   thisFolderSize += formattedData[j].size;
        //   dataIndexWithFolder = j;
        // }
      }
      if (thisIsTheFolderJ) {
        //and set the size of it's folder when you're done.
        console.log(
          'thisIsTheFolderJ',
          thisIsTheFolderJ,
          ' aaaaaaaa formattedData[thisIsTheFolderJ]',
          formattedData[thisIsTheFolderJ]
        );
        formattedData[thisIsTheFolderJ].size = Number(thisFolderSize);

        thisIsTheFolderJ = undefined;
      }
      directorySizes.set(thisFilePath, thisFolderSize);
      console.log(
        '** *** ** *** directorySizes.set(' +
          thisFilePath +
          ', ' +
          thisFolderSize +
          '); = '
      );

      //I need the object in formattedData where filepath = 'top/a/e' and type = 'folder'
      // console.log('aassdf', formattedData[dataIndexWithFolder]);
      //let objToFind = { type: 'folder', name: 'e', filepath: 'top/a' };
      // let dur = formattedData.indexOf(objToFind);

      //ok, how do I know what 'e' is,
      // ok, how do I know what 'top/a' is?

      // this works tho. cool.
      // let dur = formattedData.findIndex((obj) => {
      //   return (
      //     obj.type == 'folder' && obj.name == 'e' && obj.filepath == 'top/a'
      //   );
      //   // obj.type == 'folder' && obj.name == 'e' && obj.filepath == 'top/a';
      // });
      // console.log('dur', dur);
      //wait, i don't need to add it back in formattedData., just make new one!!!!!!!!!!!!!!
    }
    console.log('directorySizes', directorySizes);

    // go through all these filepaths 'top/a/e' and search all files that match that.
    // directories.forEach((directory) => {
    //   console.log('directory', directory);
    // });
    //find the deepest folder, put it at the beginning of a new list/array/set
    //the folder with the most /s

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
    // console.log(arrayOfLines);
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

        // console.log('command', command);
        // console.log('firstTwoChars=' + firstTwoChars);

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
            // console.log(
            //   '"cd .." just happened, currentFilePath =' +
            //     currentFilePath +
            //     ' and currentFolder=' +
            //     currentFolder +
            //     ' and currentFolderArr=',
            //   currentFolderArr
            // );

            let indexOfFolderAtEnd = currentFilePath.lastIndexOf(currentFolder);
            currentFilePath = currentFilePath.slice(0, indexOfFolderAtEnd - 1); // 'top/a' will now be 'top'
            currentFolderArr.pop(); // was ['top','a']  now is ['top']
            currentFolder = currentFolderArr[currentFolderArr.length - 1]; //now is 'top'

            // console.log(
            //   '"cd .." just happened afterdoingstuff, currentFilePath =' +
            //     currentFilePath +
            //     ' and currentFolder=' +
            //     currentFolder +
            //     ' and currentFolderArr=',
            //   currentFolderArr
            // );
          } else {
            // a
            // wants to change into a folder inside of current folder.
            // let childFolderToSwitchTo = afterTheCd; //a
            currentFilePath += `/${afterTheCd}`;
            currentFolder = afterTheCd;
            currentFolderArr.push(afterTheCd); //['top','a'] after pushing a
            // console.log('go deeper- currentFolder = ', currentFolder);
            // console.log('go deeper- currentFilePath = ', currentFilePath);
            // console.log('go deeper- currentFolderArr', currentFolderArr);
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
        // console.log(
        //   '**about to add file or folder, currentFilePath=' + currentFilePath
        // );

        let thisString = arrayOfLines[i];
        let thisStringSplit = thisString.split(' ');
        // let newObjToAdd = {};
        let newFileObj = {
          type: 'file',
          name: undefined,
          filepath: undefined,
          size: undefined,
          counted: false,
        };
        let newFolderObj = {
          type: 'folder',
          name: undefined,
          filepath: undefined,
          size: undefined,
          counted: false,
        };

        if (thisStringSplit[0] == 'dir') {
          //it's a folder
          newFolderObj.name = thisStringSplit[1];
          // console.log(
          //   'about to add new folder, currentFilePath = ',
          //   currentFilePath
          // );
          newFolderObj.filepath = currentFilePath;
        } else {
          // it's a file

          newFileObj.name = thisStringSplit[1];
          newFileObj.size = Number(thisStringSplit[0]);
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
          console.error(
            'd7p1 error in pushing an object into the formattedData'
          );
        }
      }
    }

    // console.log(
    //   'done splitting up data, formatted Data looks like',
    //   formattedData
    // );
    // formattedData = [];
  };

  function access(obj, properties) {
    // console.log('obj', obj);
    // console.log('properties', properties);
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
