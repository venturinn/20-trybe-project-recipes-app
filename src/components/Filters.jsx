import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from './Button';
import { getFiveCategories } from '../redux/actions/category';
import { setFilterName, setRecipesByCategory } from '../redux/actions/filters';
import { setMainPageRecipes } from '../redux/actions/mainPage';

const Wrapper = styled.div`
  width: 100vw;
  height: 90px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  background-color: #078466;
  border-bottom-left-radius: 7.5px;
  border-bottom-right-radius: 7.5px;
;

  & Button {
    margin-top: 5px;
    width: 31vw ;
    height: 30px ;
    background-color: #F0F7EE;
    font-size: 15px;
    border-radius: 10px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
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

  return (
    <div>
      {categoryList.length > 0
        && (
          <Wrapper>
            <Button
              label="All"
              testId="All-category-filter"
              onClick={ () => handleAllButton(pathname) }
            />
            {categoryList.map((item) => (
              <Button
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
