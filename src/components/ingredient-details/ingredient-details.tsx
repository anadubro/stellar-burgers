import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '../../services/actions/ingredients';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const isLoading = useSelector((state) => state.ingredients.isLoading);

  const ingredientData = ingredients.find((i) => i._id === id);

  if (isLoading || !ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
