import { FC, useMemo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useSelector } from '../../services/store';
import { getOrderByNumberApi } from '../../utils/burger-api';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const { number } = useParams();
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const [orderData, setOrderData] = useState<TOrder | null>(null);

  useEffect(() => {
    if (number) {
      getOrderByNumberApi(Number(number)).then((data) => {
        setOrderData(data.orders[0]);
      });
    }
  }, [number]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item: string) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = (
      Object.values(ingredientsInfo) as (TIngredient & { count: number })[]
    ).reduce((acc, item) => acc + item.price * item.count, 0);

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
