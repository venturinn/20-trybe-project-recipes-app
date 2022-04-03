import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { getRecipesDetailsThunk } from '../../redux/actions';
import RecipeStepByStep from '../../components/RecipeStepByStep';
import FavoriteButton from '../../components/FavoriteButton';
import ShareButton from '../../components/ShareButton';
import BottomNav from '../../components/BottomNav';
import Header from '../../components/Header';

const routePosition = 3;

export default function RecipeProgress() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

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
    <div>
      <Header />
      <FavoriteButton
        id={ id }
        isDrinkOrFood={ currentRoute }
        details={ recipeDetails }
      />
      <ShareButton setIsLinkCopied={ setIsLinkCopied } />
      {isLinkCopied && <p>Link copied!</p>}
      {Object.keys(recipeDetails).length > 0
      && <RecipeStepByStep
        recipeDetails={ recipeDetails }
        recipeKey={ recipeKey }
      />}
      <BottomNav />
    </div>
  );
}
