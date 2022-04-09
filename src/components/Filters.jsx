import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from './Button';
import { getFiveCategories } from '../redux/actions/category';
import { setFilterName, setRecipesByCategory } from '../redux/actions/filters';
import { setMainPageRecipes } from '../redux/actions/mainPage';

const StyledButton = styled(Button)`
    background-color: #F0F7EE;
    width: 40vw;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 5px;
    margin: 10px;
    padding-left: 20px;
    padding-right: 20px;
`;

const Wrapper = styled.div`
  height: 70px;
  width: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: nowrap;
  background-color: #078466;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  white-space: nowrap;
  overflow-x: scroll;
  ::-webkit-scrollbar{
    display: none;
  } 
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  // paddings diferentes para drinks e foods
  padding-left: ${(props) => (props.location === '/foods' ? '270px' : '365px')};
`;

export default function Filters() {
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFiveCategories(pathname));
  }, [dispatch, pathname]);

  const categoryList = useSelector((state) => state.category.categories);
  const filter = useSelector((state) => state.filter.mainPage);
  const searchBarVisibility = useSelector(
    (state) => state.searchResults.searchBarIsVisible,
  );

  // onClick func
  const handleFilter = (currRoute, category) => {
    if (filter === category) {
      dispatch(setFilterName(''));
      dispatch(setMainPageRecipes(currRoute));
    } else {
      dispatch(setFilterName(category));
      dispatch(setRecipesByCategory(currRoute, category));
    }
  };

  const handleAllButton = (currRoute) => {
    dispatch(setFilterName(''));
    dispatch(setMainPageRecipes(currRoute));
  };

  const conditionToRenderFilters = !searchBarVisibility && categoryList.length > 0;

  return (
    <div>
      {conditionToRenderFilters
        && (
          <Wrapper location={ pathname }>
            <StyledButton
              label="All"
              testId="All-category-filter"
              onClick={ () => handleAllButton(pathname) }
            />
            {categoryList.map((item) => (
              <StyledButton
                key={ item }
                label={ item }
                testId={ `${item}-category-filter` }
                onClick={ () => handleFilter(pathname, item) }
              />
            ))}
          </Wrapper>
        )}
    </div>
  );
}
