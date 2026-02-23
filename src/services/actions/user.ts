import { setCookie, deleteCookie } from '../../utils/cookie';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TRegisterData,
  updateUserApi
} from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Получить пользователя
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const data = await getUserApi();
  return data.user;
});

// Авторизация
export const loginUser = createAsyncThunk(
  'user/login',
  async (data: { email: string; password: string }) => {
    const res = await loginUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

// Регистрация
export const registerUser = createAsyncThunk(
  'user/register',
  async (data: { email: string; password: string; name: string }) => {
    const res = await registerUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

// Выход
export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

// Обновление профиля
export const updateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => {
    const res = await updateUserApi(data);
    return res.user;
  }
);
