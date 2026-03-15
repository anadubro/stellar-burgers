import { fetchUser } from "../actions/user";
import { userSlice } from "./userSlice";


const mockUser = {
  email: 'test@test.com',
  name: 'Тестовый пользователь'
};

const reduser = userSlice.reducer;

describe('Проверяем userSlice', () => {
  it('pending - isLoading становится true', () => {
    const initialState = { user: null, isAuth: false, isLoading: true, error: null };
    const result = reduser(initialState, fetchUser.pending(''));

    expect(result.isLoading).toBe(true);
  });

  it('fulfilled - данные записываются в стор', () => {
    const initialState = { user: null, isAuth: false, isLoading: true, error: null };
    const result = reduser(initialState, fetchUser.fulfilled(mockUser, ''));
  
    expect(result.isLoading).toBe(false);
    expect(result.user).toEqual(mockUser);
    expect(result.isAuth).toBe(true);
  });
  
  it('rejected - ошибка записывается в стор', () => {
    const initialState = { user: null, isAuth: false, isLoading: true, error: null };
    const result = reduser(initialState, fetchUser.rejected(new Error('Ошибка'), ''));

    expect(result.isLoading).toBe(false);
    expect(result.error).toEqual('Ошибка');
  });
})
