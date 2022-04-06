import requestAPI from './requestAPI';

export const getNationalities = () => requestAPI('https://www.themealdb.com/api/json/v1/1/list.php?a=list');

export const getRecipesByNationality = (nationality) => requestAPI(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${nationality}`);
