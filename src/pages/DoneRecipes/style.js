import styled from 'styled-components';
import ShareButton from '../../components/ShareButton';

export const MyShareButton = styled(ShareButton)``;

export const InteractDivs = styled.div`
  display: flex;
  align-self: flex-end;

  & > label {
    padding: 0;
    margin: 2px 5px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  padding-bottom: 20px;
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
  flex-wrap: wrap;
  border-radius: 8px;
  background-color: #FFF;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15);
  
  & img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 0 5px;
}

  & > div {
    width: 50%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  & p {
    color: #2a3641;
    margin: 2px 5px;
    text-align: center;
    overflow-wrap: break-word;  
  }
  
  & .tags-container {
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    padding-top: 10px;
    margin: 0;
    flex-wrap: nowrap;
    width: fit-content;
    max-width: 100%;
  }

  & .recipe-tags {
    margin: 0px 5px;
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
`;

export const FiltersDiv = styled.div`
  --shadow-color: 166deg 100% 14%;
  display: flex;
  justify-content: space-evenly;
  top: 0;
  flex-wrap: wrap;
  padding: 30px 0;
  margin-bottom: 20px;
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
