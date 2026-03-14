import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Preloader } from '@ui';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import { useDispatch } from '../../services/store';
import { fetchUser } from '../../services/actions/user';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/actions/ingredients';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchIngredients());
  }, []);

  const background = location.state?.background;

  const modalClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        {/* Основные роуты */}
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        {/* Роуты для неавторизованных */}
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        {/* Роуты для авторизованных */}
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Роуты для модалок */}
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали заказа' onClose={modalClose}>
                <OrderInfo />
              </Modal>
            }
          />

          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={modalClose}>
                <IngredientDetails />
              </Modal>
            }
          />

          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='Детали заказа' onClose={modalClose}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
