import styled from 'styled-components';

const IngredientCard = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
  background-color: #F0F7EE;
  padding: 18px 0 73.5px 0 ;
  
  & a {
    display: flex;
    justify-content: center;
    margin: 15px 20px;
    width: 115px;
    height: 180px;
    border-radius: 10px;
    padding: 20px 0;
    background-color: #fff; 
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15);
  }

  & img {
    margin: 0 10px;
  }

  & p {
    text-align: center;
    margin: 10px 0;
    color: #2a3641;
  }

`;

export default IngredientCard;
