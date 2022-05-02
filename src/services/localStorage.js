const mountNewDoneRecipe = (recipe) => {
  const { strArea, strCategory, strTags } = recipe;
  const doneRecipe = {
    id: recipe.idMeal || recipe.idDrink,
    type: recipe.idMeal ? 'food' : 'drink',
    nationality: strArea || '',
    category: strCategory || '',
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: recipe.strMeal || recipe.strDrink,
    image: recipe.strMealThumb || recipe.strDrinkThumb,
    doneDate: new Date().getTime(),
    tags: !strTags ? [] : strTags.split(','),
  };
  return doneRecipe;
};

export const saveRecipeProgressOnLocalStorage = (key, currRecipeProgress) => {
  if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
    const progressToSave = { [key]: currRecipeProgress };
    localStorage.setItem('inProgressRecipes', JSON.stringify(progressToSave));
  } else {
    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const obj = {
      ...progressRecipes,
      [key]: { ...progressRecipes[key], ...currRecipeProgress },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
  }
};

export const getRecipeProgressFromLocalStorage = (key, id) => {
  if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) return undefined;

  const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (recipesInProgress[key] && recipesInProgress[key][id]) {
    return recipesInProgress[key][id];
  }
  return undefined;
};

export const saveDoneRecipeOnLocalStorage = (recipeDetails) => {
  const newDoneRecipe = mountNewDoneRecipe(recipeDetails);
  if (!JSON.parse(localStorage.getItem('doneRecipes'))) {
    localStorage.setItem('doneRecipes', JSON.stringify([newDoneRecipe]));
  } else {
    const previousDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const newDoneRecipesList = [...previousDoneRecipes, newDoneRecipe];
    localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipesList));
  }
};

export const getDoneRecipesFromLocalStorage = (filterType) => {
  if (!JSON.parse(localStorage.getItem('doneRecipes'))) return;
  const doneRecipesList = JSON.parse(localStorage.getItem('doneRecipes'));
  if (filterType === 'all' || !filterType) {
    return doneRecipesList;
  } if (filterType === 'food') {
    const doneFoodRecipesList = doneRecipesList.filter(({ type }) => type === 'food');
    return doneFoodRecipesList;
  } if (filterType === 'drink') {
    const doneDrinkRecipesList = doneRecipesList.filter(({ type }) => type === 'drink');
    return doneDrinkRecipesList;
  }
};

export const getFavoriteRecipesFromLocalStorage = (filterType) => {
  if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) return;
  const favoriteRecipesList = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (filterType === 'all' || !filterType) {
    return favoriteRecipesList;
  } if (filterType === 'food') {
    const favoriteFoodRecipesList = favoriteRecipesList
      .filter(({ type }) => type === 'food');
    return favoriteFoodRecipesList;
  } if (filterType === 'drink') {
    const favoriteDrinkRecipesList = favoriteRecipesList
      .filter(({ type }) => type === 'drink');
    return favoriteDrinkRecipesList;
  }
};

export const removeRecipeFromLocalStorageFavoriteRecipes = (id) => {
  const favoriteRecipesList = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const newFavoriteRecipesList = favoriteRecipesList.filter((recipe) => recipe.id !== id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipesList));
};
