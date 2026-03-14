import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

// по умолчанию onlyUnAuth = false - значит роут для авторизованных
const ProtectedRoute = ({
  children,
  onlyUnAuth = false
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuth = useSelector((state) => state.user.isAuth);
  const isLoading = useSelector((state) => state.user.isLoading);

  // Пока идет проверка пользователя на авториизацию - показываем прелоадер
  if (isLoading) {
    return <Preloader />;
  }

  // Если роут не защищенный а пользователь уже залогинен - перенапрявляем пользователя на главную страницу
  if (onlyUnAuth && isAuth) {
    return <Navigate to='/' />;
  }

  // Если роут защищенный, а пользователь не залогинен - отправляем на страницу авторизации
  // state={{ from: location }} - запоминаем куда он хотел попасть, чтобы после входа туда вернуть
  if (!onlyUnAuth && !isAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
