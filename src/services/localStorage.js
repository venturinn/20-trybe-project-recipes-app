export const saveRecipeProgressOnLocalStorage = (key, currRecipeProgress) => {
  if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
    const obj = { [key]: currRecipeProgress };
    localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
  } else {
    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const obj = {
      ...progressRecipes,
      [key]: { ...progressRecipes[key], ...currRecipeProgress },
    };
    console.log(obj);
    localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
  }
};

export const getRecipeProgressFromLocalStorage = (key, id) => {
  if (!id) return;
  if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) return undefined;

  const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (recipesInProgress[key] && recipesInProgress[key][id]) {
    return recipesInProgress[key][id];
  }
  return undefined;
};
