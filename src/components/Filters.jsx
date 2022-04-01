import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';
import { getFiveCategories } from '../redux/actions/category';
import { setFilterName, setRecipesByCategory } from '../redux/actions/filters';
import { setMainPageRecipes } from '../redux/actions/mainPage';

export default function Filters() {
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFiveCategories(pathname));
  }, [dispatch, pathname]);

  const categoryList = useSelector((state) => state.category.categories);
  const filter = useSelector((state) => state.filter);

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
          <div>
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
          </div>
        )}
    </div>
  );
}
