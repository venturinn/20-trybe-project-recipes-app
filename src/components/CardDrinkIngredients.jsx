import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getRecipesByIngredients } from '../services/filters';
import { getDrinkIngredients } from '../services';
import { setSearchBarResults } from '../redux/actions';
import { validateIgredients } from '../redux/actions/validateIngredients';

export default function CardDrinkIngredients() {
  const [arrayIngredients, setArrayIngredients] = useState([]);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    const asynFunct = async () => {
      const ingrediets = await getDrinkIngredients();
      setArrayIngredients(ingrediets.drinks);
      return ingrediets;
    };
    asynFunct();
  }, []);

  const handleIngredientDrink = async (e) => {
    const { name } = e.currentTarget;
    const recipes = await getRecipesByIngredients(pathname, name);
    dispatch(setSearchBarResults(recipes));
    dispatch(validateIgredients(true));
  };

  const DOZE = 12;

  return (
    <div>
      { arrayIngredients.slice(0, DOZE)
        .map((ingr, indx) => (
          <Link
            to="/drinks"
            key={ indx }
            name={ ingr.strIngredient1 }
            onClick={ (e) => handleIngredientDrink(e) }
          >
            <div data-testid={ `${indx}-ingredient-card` }>
              <img
                src={ `https://www.thecocktaildb.com/images/ingredients/${ingr.strIngredient1}-Small.png` }
                alt={ ingr.strIngredient1 }
                data-testid={ `${indx}-card-img` }
              />
              <p data-testid={ `${indx}-card-name` }>{ingr.strIngredient1}</p>
            </div>
          </Link>
        ))}
    </div>
  );
}
