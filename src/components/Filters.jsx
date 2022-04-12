import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from './Button';
import { getFiveCategories } from '../redux/actions/category';
import { setFilterName, setRecipesByCategory } from '../redux/actions/filters';
import { setMainPageRecipes } from '../redux/actions/mainPage';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  padding: 5px;
  height: 70px;
  overflow-x: scroll;
  background-color: #078466;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  box-shadow: 4px 4px 10px rgb(0 0 0 / 15%);
  ;
  `;

const FilterButton = styled(Button)`
    --shadow-color: 166deg 100% 14%;
    width: fit-content;
    white-space: nowrap;
    height: 33px ;
    background-color: ${(props) => props.theme.bg};
    color: ${({ theme: { bg } }) => (bg === '#ef8a17' ? '#fff' : '#2a3641')};
    font-size: 15px;
    border-radius: 12px;
    margin: 0 5px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
    box-shadow: 0.3px 0.5px 0.7px hsl(var(--shadow-color) / 0.34),
    0.4px 0.8px 1px -1.2px hsl(var(--shadow-color) / 0.34),
    1px 2px 2.5px -2.5px hsl(var(--shadow-color) / 0.34);
`;

export default function Filters() {
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setFilterName(''));
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
          <Wrapper>
            <FilterButton
              theme={ { bg: filter === '' ? '#ef8a17' : '#f0f7ee' } }
              label="All"
              testId="All-category-filter"
              onClick={ () => handleAllButton(pathname) }
            />
            {categoryList.map((item) => (
              <FilterButton
                theme={ { bg: filter === item ? '#ef8a17' : '#f0f7ee' } }
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
