import styled from 'styled-components';

const Dropdown = styled.select`
  background-color: #fff;
  padding: 5px;
  border: 0.5px solid #2a3641;
  border-radius: 7px;
  width: 150px;
  color: #2a3641;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.02);

  & option:hover{
    cursor: pointer;
    color: red;
  }
`;

export const DropdownDiv = styled.div`
  background-color: #F0F7EE;
  display: flex;
  justify-content: center;
  padding-top: 25px;
`;

export default Dropdown;
