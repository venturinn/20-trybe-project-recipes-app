import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';
import { getFiveCategories } from '../redux/actions/category';
import { setFilterName, setRecipesByCategory } from '../redux/actions/filters';

export default function Filters() {
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFiveCategories(pathname));
  }, []);

  const categoryList = useSelector((state) => state.category.categories);

  const handleFilter = (currRoute, category) => {
    dispatch(setFilterName(category));
    dispatch(setRecipesByCategory(currRoute, category));
  };

  return (
    <div>
      {categoryList.length > 0
        && (
          <div>
            <Button
              label="All"
              testId="All-category-filter"
              onClick={ () => handleFilter(pathname, 'all') }
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
