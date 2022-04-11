import styled from 'styled-components';
import React from 'react';
import Spiner from '../images/Spinner.svg';
import Waiting from '../images/waiting.svg';

const LoadingDiv = styled.div`
  min-height: 515px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function Loading() {
  return (
    <LoadingDiv>
      <img src={ Waiting } alt="Spiner" width="150px" height="150px" />
      <img src={ Spiner } alt="Spiner" />
    </LoadingDiv>
  );
}
