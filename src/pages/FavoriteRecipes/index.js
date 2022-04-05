import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteRecipeCard from '../../components/FavoriteRecipeCard';
import Header from '../../components/Header';
import { showAllDoneRecipes } from '../../redux/actions';

export default function FavoriteRecipes() {
  const dispatch = useDispatch();
  const favoriteRecipesList = useSelector((state) => state.filter.favoriteRecipes);
  const { results, tag } = favoriteRecipesList;
  console.log(results);
  console.log('tag em DoneRecipes', tag);

  useEffect(() => {
    dispatch(showAllDoneRecipes(tag));
  }, []);

  return (
    <section>
      <Header />
      {favoriteRecipesList ? (
        <div>
          {/* {doneRecipesFiltersList.map((filter) => (
            <div key={ filter.testId }>
              <Button
                id={ filter.testId }
                label={ filter.label }
                testId={ filter.testId }
                onClick={ () => dispatch(filter.onClick(tag)) }
              />
            </div>
          ))} */}
          {results.map((recipe, index) => (
            <div key={ recipe.id }>
              <FavoriteRecipeCard recipe={ recipe } index={ index } />
            </div>
          )) }
        </div>
      )
        : <p>Você ainda não tem receitas feitas</p>}
    </section>
  );
}
