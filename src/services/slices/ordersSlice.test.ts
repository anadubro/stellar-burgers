import { fetchProfileOrders } from "../actions/orders";
import { ordersSlice } from "./ordersSlice";

const mockOrders = [
  {
    _id: 'order-id-1',
    status: 'done',
    name: 'Тестовый заказ',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    number: 12345,
    ingredients: ['test-id-1', 'test-id-2']
  }
];

const reduser = ordersSlice.reducer;

describe('Проверяем ordersSlice', () => {
  it('pending - isLoading становится true', () => {
    const initialState = { orders: [], isLoading: false, error: null };
    const result = reduser(initialState, fetchProfileOrders.pending(''));

    expect(result.isLoading).toBe(true);
  });

  it('fulfilled - данные записываются в стор', () => {
    const initialState = { orders: [], isLoading: false, error: null };
    const result = reduser(initialState, fetchProfileOrders.fulfilled(mockOrders, ''));
  
    expect(result.isLoading).toBe(false);
    expect(result.orders).toEqual(mockOrders);
  });

  it('rejected - ошибка записывается в стор', () => {
    const initialState = { orders: [], isLoading: false, error: null };
    const result = reduser(initialState, fetchProfileOrders.rejected(new Error('Ошибка загрузки'), ''));

    expect(result.isLoading).toBe(false);
    expect(result.error).toEqual('Ошибка загрузки');
  });
})
