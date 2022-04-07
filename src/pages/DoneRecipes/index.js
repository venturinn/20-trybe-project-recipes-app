/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import DoneRecipeCard from '../../components/DoneRecipeCard';
import Button from '../../components/Button';
import {
  doneOrFavoriteRecipesFiltersList as doneRecipesFiltersList,
  showAllDoneOrFavoriteRecipes as showAllDoneRecipes,
} from '../../redux/actions';
import { Wrapper, DoneRecipeSection, FiltersDiv } from './styled';

export default function DoneRecipes() {
  const dispatch = useDispatch();
  const doneRecipesList = useSelector((state) => state.filter.doneRecipes);
  const { results, tag } = doneRecipesList;

  useEffect(() => {
    dispatch(showAllDoneRecipes(tag));
  }, []);

  return (
    <DoneRecipeSection>
      <Header />
      {results ? (
        <div>
          <FiltersDiv>
            {doneRecipesFiltersList.map((filter) => (
              <Button
                key={ filter.testId }
                id={ filter.testId }
                label={ filter.label }
                testId={ filter.testId }
                onClick={ () => dispatch(filter.onClick(tag)) }
              />
            ))}
          </FiltersDiv>
          <Wrapper>
            {results.map((recipe, index) => (
              <DoneRecipeCard key={ recipe.id } recipe={ recipe } index={ index } />
            )) }
          </Wrapper>
        </div>
      )
        : <p>Você ainda não tem receitas feitas</p>}
    </DoneRecipeSection>
  );
}
