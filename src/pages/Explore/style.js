import styled from 'styled-components';

export const ExploreSection = styled.section`
  display: flex;
  background-color: #f0f7ee;
  flex-direction: column;
  min-height: calc(100vh - 60px);
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;

  & button {
    border: none;
    margin: 20px 0;
    background-color: #ef8a17;
    color: #fff;
    padding: 9.5px 20px;
    width: 290px;
    border-radius: 8px;
    align-self: center
    ;
  }
`;
