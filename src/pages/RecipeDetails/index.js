import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { getRecipesDetailsThunk } from '../../redux/actions';
import Button from '../../components/Button';

export default function RecipeDetails() {
  const { id } = useParams();
  console.log(id);
  const history = useHistory();

  const dispatch = useDispatch();

  const location = useLocation();
  const { pathname } = location;
  const papathnameSplited = pathname.split('/');
  const currRoute = papathnameSplited[papathnameSplited.length - 2];

  useEffect(() => {
    const getDetails = () => {
      console.log('dentro do useEffect');
      console.log(id, `/${currRoute}`);
      const recipeDetailsResults = dispatch(getRecipesDetailsThunk(id, `/${currRoute}`));
      return recipeDetailsResults;
    };
    getDetails();
  }, [id, currRoute, dispatch]);

  return (
    <div>
      RecipeDetails
      <Button
        testId="start-recipe-btn"
        label="Start Recipe"
        onClick={ () => history.push(`/${currRoute}/${id}/in-progress`) }
      />

    </div>
  );
}
