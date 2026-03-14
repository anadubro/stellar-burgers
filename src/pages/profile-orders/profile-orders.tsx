import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchProfileOrders } from '../../services/actions/orders';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchProfileOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
