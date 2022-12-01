import React from 'react';
import styled from 'styled-components';

const RowStyle = styled.div`
  display: flex;
  flex-wrap: nowrap;
  border: 1px solid blue;
  width: 90vw;
  align-self: center;
  justify-self: center;
`;

const Heya = styled.div`
  background-color: red;
  border: 1px solid green;
  width: 10vw;
  display: flex;
  flex-direction: column;
`;
const HeyaLast = styled.div`
  background-color: red;
  border: 1px solid green;
  width: 70vw;
  display: flex;
  flex-direction: column;
`;

const listOfLinks = [
  { title: 'Title', link: 'LINK' },
  { title: 'Day 1 Puzzle 1', link: 'https://adventofcode.com/2022/day/1' },
  { title: 'Day 1 Puzzle 2', link: 'https://adventofcode.com' },
];

function PuzzleRow({ title, finalAnswer }) {
  let thisObj = listOfLinks.filter((obj) => obj.title == title);
  let blarg = thisObj[0].link;

  // let blarg = 'https://adventofcode.com';

  return (
    <RowStyle>
      <Heya>{title}</Heya>
      <Heya>
        <a href={blarg}>Link to problem</a>
      </Heya>
      <HeyaLast>{finalAnswer}</HeyaLast>
    </RowStyle>
  );
}

export default PuzzleRow;
