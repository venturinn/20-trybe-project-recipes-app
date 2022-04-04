import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getRecipesByIngredients } from '../services/filters';
import { getFoodIngredients } from '../services';
import { setSearchBarResults } from '../redux/actions';

export default function CardFoodIngredients() {
  const [arrayIngredients, setArrayIngredients] = useState([]);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const asynFunct = async () => {
      const ingrediets = await getFoodIngredients();
      setArrayIngredients(ingrediets.meals);
      return ingrediets;
    };
    asynFunct();
  }, []);

  const handleIngredientFood = async (e) => {
    const { name } = e.currentTarget;
    const recipes = await getRecipesByIngredients(pathname, name);
    dispatch(setSearchBarResults(recipes));
  };

  const DOZE = 12;

  return (
    <div>
      { arrayIngredients.slice(0, DOZE)
        .map(({ idIngredient, strIngredient }, indx) => (
          <Link
            to="/foods"
            name={ strIngredient }
            key={ idIngredient }
            onClick={ (e) => handleIngredientFood(e) }
          >
            <div
              data-testid={ `${indx}-ingredient-card` }
            >

              <img
                src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                alt={ strIngredient }
                data-testid={ `${indx}-card-img` }
              />
              <p data-testid={ `${indx}-card-name` }>{strIngredient}</p>
            </div>
          </Link>
        ))}
    </div>
  );
}
