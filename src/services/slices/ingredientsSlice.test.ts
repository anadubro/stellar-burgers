import { fetchIngredients } from "../actions/ingredients";
import { ingredientsSlice } from "./ingredientsSlice";

const mockIngredients = [
  {
    _id: 'test-id',
    name: 'Тестовый ингредиент',
    type: 'main',
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 10,
    price: 100,
    image: '',
    image_large: '',
    image_mobile: ''
  }
];

const reduser = ingredientsSlice.reducer;

describe('Проверяем ingredientsSlice', () => {
  it('pending - isLoading становится true', () => {
    const initialState = { ingredients: [], isLoading: false, error: null };
    const result = reduser(initialState, fetchIngredients.pending(''));

    expect(result.isLoading).toBe(true);
  });

  it('fulfilled - данные записываются в стор', () => {
    const initialState = { ingredients: [], isLoading: false, error: null };
    const result = reduser(initialState, fetchIngredients.fulfilled(mockIngredients, ''));

    expect(result.isLoading).toBe(false);
    expect(result.ingredients).toEqual(mockIngredients);
  });

  it('rejected - ошибка записывается в стор', () => {
    const initialState = { ingredients: [], isLoading: false, error: null };
    const result = reduser(initialState, fetchIngredients.rejected(new Error('Ошибка'), ''));

    expect(result.isLoading).toBe(false);
    expect(result.error).toEqual('Ошибка');
  });
})
