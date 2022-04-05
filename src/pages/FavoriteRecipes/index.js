import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteRecipeCard from '../../components/FavoriteRecipeCard';
import Header from '../../components/Header';
import Button from '../../components/Button';
import {
  doneOrFavoriteRecipesFiltersList as favoriteRecipesFiltersList,
  showAllDoneOrFavoriteRecipes as showAllFavoriteRecipes,
} from '../../redux/actions';

export default function FavoriteRecipes() {
  const dispatch = useDispatch();
  const favoriteRecipesList = useSelector((state) => state.filter.favoriteRecipes);
  const { results, tag } = favoriteRecipesList;

  useEffect(() => {
    dispatch(showAllFavoriteRecipes(tag));
  }, []);

  return (
    <section>
      <Header />
      {results && results.length > 0 ? (
        <div>
          {favoriteRecipesFiltersList.map((filter) => (
            <div key={ filter.testId }>
              <Button
                id={ filter.testId }
                label={ filter.label }
                testId={ filter.testId }
                onClick={ () => dispatch(filter.onClick(tag)) }
              />
            </div>
          ))}
          {results.map((recipe, index) => (
            <div key={ recipe.id }>
              <FavoriteRecipeCard recipe={ recipe } index={ index } />
            </div>
          )) }
        </div>
      )
        : <p>Você ainda não tem receitas favoritadas</p>}
    </section>
  );
}
