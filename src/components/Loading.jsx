import styled from 'styled-components';
import React from 'react';
import Spiner from '../images/Spinner.svg';

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
      <img src={ Spiner } alt="Spiner" />
    </LoadingDiv>
  );
}
