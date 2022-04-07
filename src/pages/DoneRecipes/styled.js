import styled from 'styled-components';
import ShareButton from '../../components/ShareButton';

export const MyShareButton = styled(ShareButton)`
  position: absolute;
  top: 10px;
  right: 15px;
`;

export const InteractDivs = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;

  & label {
    margin: 0px 5px;
  }
`;

// export const LinkIsCopiedFooter = styled.footer`
//   background-color: #02484B;
//   color: #02484B
// `;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const RecipeCard = styled.div`
  --shadow-color: 0deg 0% 63%;
  position: relative;
  display: flex;
  align-items: center;
  width: 330px;
  height: 200px;
  margin: 20px 0;
  border-radius: 8px;
  background-color: #FFF;
  box-shadow: 0.5px 0.7px 1.3px hsl(var(--shadow-color) / 0),
    2.7px 3.5px 6.6px hsl(var(--shadow-color) / 0.18),
    5.3px 7px 13.2px hsl(var(--shadow-color) / 0.36),
    10.9px 14.2px 26.9px hsl(var(--shadow-color) / 0.54);
  
  & img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 0 5px;
}

  & div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 180px;
    height: 130px;
    padding: 15px 0;
  }

  & p {
    color: #2a3641;
    margin: 2px 5px;
    text-align: center;
  }

  & .recipe-tags {
    margin: 10px 5px;
    border-radius: 90px;
    padding: 2.5px 10px;
    text-align: center;
    background-color: #F6AE2D;
  }

  & .category {
    color: #989FB2;
  }
`;

export const DoneRecipeSection = styled.section`
  background-color: #f0f7ee;
  height: 100vh;
`;

export const FiltersDiv = styled.div`
  --shadow-color: 166deg 100% 14%;
  display: flex;
  justify-content: space-evenly;
  padding: 30px 0;
  margin: 20px 0;
  border-radius: 0 0 10px 10px;
  background-color: #078466;
  box-shadow: 0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.34),
    0.4px 0.8px 1px -1.2px hsl(var(--shadow-color) / 0.34),
    1px 2px 2.5px -2.5px hsl(var(--shadow-color) / 0.34);

  & button {
    width: 100px;
    background-color: #f0f7ee;
    color: #2a3641;
    border: none;
    border-radius: 12px;
    padding: 2px;
    box-shadow: 0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.34),
    0.4px 0.8px 1px -1.2px hsl(var(--shadow-color) / 0.34),
    1px 2px 2.5px -2.5px hsl(var(--shadow-color) / 0.34);
  }
`;
