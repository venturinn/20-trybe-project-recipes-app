import styled from 'styled-components';

export const RecipesListSection = styled.section`
  background-color: #f0f7ee;
  padding-bottom: 73.5px;
  padding-top: 18px;
  min-height: 500px;
`;

export const Card = styled.div`
  --shadow-color: 0deg 0% 63%;
  display: flex;
  width: 330px;
  height: 200px;
  margin: 20px 0;
  border-radius: 8px;
  background-color: #FFF;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15);

  & a {
    display: flex;
    justify-content: space-between;
    flex: 1;
  }

  & img { 
    width: 200px;
    height: 200px;
    border-radius: 10px 0px 0px 10px;
    left: 0;
  }

  & .recipe-description{
    text-align: center;
    align-self: center;
    margin: 0 auto;
  }
  
  & h5 {
    color: #2a3641;
    font-size: medium;
    margin-bottom: 0;
  }

  & p {
    color: #989FB2;
    margin-bottom: 0;
    font-size: small;
  }
`;

// export const MainCardOne = styled.div`
//   --shadow-color: 0deg 0% 63%;
//   display: flex;
//   flex-direction: column;
//   position: relative;
//   width: 330px;
//   height: 200px;
//   margin: 20px 0;
//   border-radius: 8px;
//   background-color: #FFF;
//   box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15);

//   & img {
//     object-fit: cover;
//     object-position: 50% center;
//     border-radius: 8px 8px 0 0;
//     width: 100%;
//     height: 145px;
//   }

//   & .recipe-description{
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: space-evenly;
//     margin: 2px 5px;
//     text-align: center;
//     height: 50px;
//   }

//   & h5 {
//     color: #2a3641;
//     font-size: medium;
//     margin-bottom: 0;
//   }

//   & p {
//     color: #989FB2;
//     margin-bottom: 0;
//     font-size: small;
//   }
// `;
