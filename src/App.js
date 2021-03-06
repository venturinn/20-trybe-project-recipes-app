import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import DoneRecipes from './pages/DoneRecipes';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeProgress from './pages/RecipeProgress';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoods from './pages/ExploreFoods';
import ExploreFoodsIngredients from './pages/ExploreFoodsIngredients';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
import ExploreNationalities from './pages/ExploreNationalities';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods/:id" component={ RecipeDetails } />
      <Route exact path="/drinks/:id" component={ RecipeDetails } />
      <Route path="/foods/:id/in-progress" component={ RecipeProgress } />
      <Route path="/drinks/:id/in-progress" component={ RecipeProgress } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/explore" component={ Explore } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/profile" component={ Profile } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/explore/foods" component={ ExploreFoods } />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route path="/explore/foods/ingredients" component={ ExploreFoodsIngredients } />
      <Route path="/explore/drinks/ingredients" component={ ExploreDrinksIngredients } />
      <Route path="/explore/foods/nationalities" component={ ExploreNationalities } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}

export default App;
