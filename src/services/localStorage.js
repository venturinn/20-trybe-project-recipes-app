export const saveRecipeProgressOnLocalStorage = (key, item) => {
  if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
    const obj = { [key]: item };
    localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
  } else {
    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const obj = {
      ...progressRecipes,
      [key]: { ...progressRecipes[key], ...item },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
  }
};

export const getRecipeProgressFromLocalStorage = (key, id) => {
  if (!id) return;
  if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
    return undefined;
  }
  const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  console.log('tem recipesInProgress', recipesInProgress);
  const currRecipeProgress = recipesInProgress[key];
  console.log(currRecipeProgress[id]);
  console.log('key', key);
  const toReturn = currRecipeProgress[id] || {};
  return toReturn;
};
