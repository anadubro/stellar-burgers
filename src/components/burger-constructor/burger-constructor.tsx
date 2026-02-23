import { FC, useMemo, useState } from 'react';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { clearConstructor } from '../../services/slices/constructorSlice';
import { orderBurgerApi } from '../../utils/burger-api';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
  const [orderRequest, setOrderRequest] = useState(false);
  const [orderModalData, setOrderModalData] = useState<any>(null);
  const constructorItems = { bun, ingredients };
  const isAuth = useSelector((state) => state.user.isAuth);
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!isAuth) {
      navigate('/login');
      return;
    }
    if (!bun || orderRequest) return;
    setOrderRequest(true);
    orderBurgerApi([bun._id, ...ingredients.map((i) => i._id), bun._id])
      .then((data) => {
        setOrderModalData(data.order);
        dispatch(clearConstructor());
      })
      .finally(() => setOrderRequest(false));
  };

  const closeOrderModal = () => {
    setOrderModalData(null);
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      (ingredients || []).reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [bun, ingredients]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
