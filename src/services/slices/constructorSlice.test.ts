import { constructorSlice, addIngredient, removeIngredient, moveIngredientUp, moveIngredientDown } from './constructorSlice';

const reducer = constructorSlice.reducer;

const mockIngredient = {
  _id: 'test-id',
  id: 'unique-id',
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
};

describe('constructorSlice', () => {
  it('Добавление ингредиента', () => {
    const initialState = { bun: null, ingredients: [] };
    const result = reducer(initialState, addIngredient(mockIngredient));

    expect(result.ingredients).toHaveLength(1);
    expect(result.ingredients[0]).toEqual(mockIngredient);
  });

  it('Удаление ингредиента', () => {
    const initialState = { bun: null, ingredients: [mockIngredient] };
    const result = reducer(initialState, removeIngredient('unique-id'));

    expect(result.ingredients).toHaveLength(0);
  });

  it('Перемещение ингредиента вверх', () => {
    const mockIngredient2 = { ...mockIngredient, id: 'unique-id-2', name: 'Второй' };
    const initialState = { bun: null, ingredients: [mockIngredient, mockIngredient2] };
    const result = reducer(initialState, moveIngredientUp(1));

    expect(result.ingredients[0].id).toBe('unique-id-2');
    expect(result.ingredients[1].id).toBe('unique-id');
  });

  it('Перемещение ингредиента вниз', () => {
    const mockIngredient2 = { ...mockIngredient, id: 'unique-id-2', name: 'Второй' };
    const initialState = { bun: null, ingredients: [mockIngredient, mockIngredient2] };
    const result = reducer(initialState, moveIngredientDown(0));
    
    expect(result.ingredients[0].id).toBe('unique-id-2');
    expect(result.ingredients[1].id).toBe('unique-id');
  });
});
