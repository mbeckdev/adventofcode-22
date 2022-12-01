import React from 'react';
import styled from 'styled-components';
import listOfLinks from './util/listOfLinks';

const RowStyle = styled.div`
  display: flex;
  flex-wrap: nowrap;
  border: 1px solid blue;
  width: 90vw;
  align-self: center;
  justify-self: center;
`;
const Section = styled.div`
  background-color: whitesmoke;
  border: 1px solid green;
  width: 10vw;
  display: flex;
  flex-direction: column;
`;
const SectionLast = styled.div`
  background-color: whitesmoke;
  border: 1px solid green;
  width: 70vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function PuzzleRow({ title, finalAnswer }) {
  let thisObj = listOfLinks.filter((obj) => obj.title == title);
  let blarg = thisObj[0].link;

  return (
    <RowStyle>
      <Section>{title}</Section>
      <Section>
        <a href={blarg}>Link to problem</a>
      </Section>
      <SectionLast>{finalAnswer}</SectionLast>
    </RowStyle>
  );
}

export default PuzzleRow;
