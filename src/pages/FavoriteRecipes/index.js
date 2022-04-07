import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteRecipeCard from '../../components/FavoriteRecipeCard';
import Header from '../../components/Header';
import Button from '../../components/Button';
import {
  Wrapper,
  DoneRecipeSection as FavoriteRecipeSection,
  FiltersDiv,
} from '../DoneRecipes/styled';
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
    <FavoriteRecipeSection>
      <Header />
      {results && results.length > 0 ? (
        <div>
          <FiltersDiv>
            {favoriteRecipesFiltersList.map((filter) => (
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
              <FavoriteRecipeCard key={ recipe.id } recipe={ recipe } index={ index } />
            )) }
          </Wrapper>
        </div>
      )
        : <p>Você ainda não tem receitas favoritadas</p>}
    </FavoriteRecipeSection>
  );
}
