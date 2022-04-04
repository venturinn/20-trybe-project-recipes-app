/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import DoneRecipeCard from '../../components/DoneRecipeCard';
import Button from '../../components/Button';
import { doneRecipesFiltersList, showAllDoneRecipes } from '../../redux/actions';

export default function DoneRecipes() {
  const dispatch = useDispatch();
  const doneRecipesList = useSelector((state) => state.searchFilters.doneRecipesResults);
  // fazer useEffect que recebe action para trazer a lista de receitas feitas a ser renderizada
  useEffect(() => {
    dispatch(showAllDoneRecipes());
  }, []);
  // fazer filtros (cada uma é uma action)
  // useSelector
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
                onClick={ () => dispatch(filter.onClick()) }
              />
            </div>
          ))}
          {doneRecipesList.map((recipe) => (
            <div key={ recipe.id }>
              <DoneRecipeCard recipe={ recipe } />
            </div>
          )) }
        </div>
      )
        : (<p>Você ainda não tem receitas feitas</p>)}

    </section>
  );
}
