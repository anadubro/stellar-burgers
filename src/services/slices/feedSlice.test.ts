import { fetchFeeds } from "../actions/feed";
import { feedSlice } from "./feedSlice";


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
const mockTotal = 100;
const mockTotalToday = 10;

const reduser = feedSlice.reducer;

describe('Проверяем feedSlice', () => {
  it('pending - isLoading становится true', () => {
    const initialState = { orders: [], total: 0, totalToday: 0, isLoading: false, error: null };
    const result = reduser(initialState, fetchFeeds.pending(''));

    expect(result.isLoading).toBe(true);
  });

  it('fulfilled - данные записываются в стор', () => {
    const initialState = { orders: [], total: 0, totalToday: 0, isLoading: true, error: null };
    const result = reduser(initialState, fetchFeeds.fulfilled(
      { orders: mockOrders, total: mockTotal, totalToday: mockTotalToday, success: true },
      ''
    ));
  
    expect(result.isLoading).toBe(false);
    expect(result.orders).toEqual(mockOrders);
    expect(result.total).toBe(mockTotal);
    expect(result.totalToday).toBe(mockTotalToday);
  });

  it('rejected - ошибка записывается в стор', () => {
    const initialState = { orders: [], total: 0, totalToday: 0, isLoading: false, error: null };
    const result = reduser(initialState, fetchFeeds.rejected(new Error('Ошибка загрузки'), ''));

    expect(result.isLoading).toBe(false);
    expect(result.error).toEqual('Ошибка загрузки');
  });
})
