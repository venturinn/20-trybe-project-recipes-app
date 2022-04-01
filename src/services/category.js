import requestAPI from './requestAPI';

const getCategories = (currRoute) => {
  if (currRoute === '/foods') {
    return requestAPI('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((data) => data.meals);
  }
  return requestAPI('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((data) => data.drinks);
};

export default getCategories;
