import styled from 'styled-components';

export const ProfileSection = styled.section`
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
    font-weight: 500;
    padding: 9.5px 20px;
    width: 290px;
    border-radius: 8px;
    align-self: center
    ;
  }
`;

export const UserEmail = styled.h5`
  text-align: center;
  color: #2a3641;
  margin-bottom: 20px;
`;

export const ChefImg = styled.img`
  align-self: center;
  margin-bottom: 20px;
  width: 100px;
  height: 100px;
`;

export const Button = styled.button``;
