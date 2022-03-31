import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';
import { getFiveCategories } from '../redux/actions/category';

export default function Filters() {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFiveCategories(location.pathname));
  }, []);

  const categoryList = useSelector((state) => state.category.categories);

  return (
    <div>
      <Button label="All" testId="All-category-filter" />
      {categoryList.map((item) => (
        <Button key={ item } label={ item } testId={ `${item}-category-filter` } />
      ))}
    </div>
  );
}
