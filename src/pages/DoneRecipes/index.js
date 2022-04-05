/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import DoneRecipeCard from '../../components/DoneRecipeCard';
import Button from '../../components/Button';
import { doneRecipesFiltersList, showAllDoneRecipes } from '../../redux/actions';

export default function DoneRecipes() {
  const dispatch = useDispatch();
  const doneRecipesList = useSelector((state) => state.filter.doneRecipes);
  const { results, tag } = doneRecipesList;
  console.log('tag em DoneRecipes', tag);

  useEffect(() => {
    dispatch(showAllDoneRecipes(tag));
  }, []);

  return (
    <section>
      <Header />
      {doneRecipesList ? (
        <div>
          {doneRecipesFiltersList.map((filter) => (
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
              <DoneRecipeCard recipe={ recipe } index={ index } />
            </div>
          )) }
        </div>
      )
        : <p>Você ainda não tem receitas feitas</p>}
    </section>
  );
}
