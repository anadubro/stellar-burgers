import { rootReducer } from './store';

describe('Проверяем возвращаемое начальное состояние со всеми слайсами', () => {
  it('Начальное состояние со слайсом ingredients', () => {
    const result = rootReducer(undefined, { type: 'unknown' });
    expect(result).toEqual({
      ingredients: {
        ingredients: [],
        isLoading: false,
        error: null
      },
      user: {
        user: null,
        isAuth: false,
        isLoading: true,
        error: null
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: null
      },
      orders: {
        orders: [],
        isLoading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      }
    });


  });


})
