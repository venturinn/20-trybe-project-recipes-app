import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { getRecipesDetailsThunk } from '../../redux/actions';
import RecipeStepByStep from '../../components/RecipeStepByStep';
import FavoriteButton from '../../components/FavoriteButton';
import ShareButton from '../../components/ShareButton';
import { MainContainer, LinkCopied, ShareContainer, FavoriteContainer } from './styled';

const routePosition = 3;

export default function RecipeProgress() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();

  const [currentRoute] = useState(() => {
    const { pathname } = location;
    const pathnameSplited = pathname.split('/');
    const currRoute = pathnameSplited[pathnameSplited.length - routePosition];
    return currRoute;
  });

  const recipeDetails = useSelector((state) => state.searchResults.recipeDetails);
  const recipeKey = currentRoute === 'foods' ? 'meals' : 'cocktails';
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  useEffect(() => {
    dispatch(getRecipesDetailsThunk(id, `/${currentRoute}`));
  }, [currentRoute, id, dispatch]);

  return (
    <MainContainer>
      {Object.keys(recipeDetails).length > 0
      && <RecipeStepByStep
        recipeDetails={ recipeDetails }
        recipeKey={ recipeKey }
      />}
      <FavoriteContainer>
        <FavoriteButton
          id={ id }
          isDrinkOrFood={ currentRoute }
          details={ recipeDetails }
        />
      </FavoriteContainer>
      <ShareContainer>
        <ShareButton
          setIsLinkCopied={ setIsLinkCopied }
          testId="share-btn"
          type={ currentRoute }
          id={ id }
        />
      </ShareContainer>
      {isLinkCopied && <LinkCopied>Link copied!</LinkCopied>}
    </MainContainer>
  );
}
