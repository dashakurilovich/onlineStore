import axios from 'axios';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import Card from '../components/Card';
import AppContext from './context';
import s from './Home.module.scss';


function Orders() {

  const { onAddToFavorite, onAddToCart } = useContext(AppContext)
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {

    (async () => {
      try {
        const { data } = await axios.get('https://62fecc1ba85c52ee483cd09f.mockapi.io/orders')
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
        setIsLoading(false)
      } catch (error) {
        alert('Ошибка при запросе заказов')
        console.error(error);
      }
    })()
  }, []);

  return (
    <div className={s.content}>
      <div className={s.middleBlock}>
        <h1>
          Мои заказы
        </h1>

      </div>
      <div className={s.sneakers}>
        {
          (isLoading
          ? [...Array(10)]
          : orders).map((item, index) =>
            <Card
              key={index}
              loading={isLoading}
              {...item}
            />)
        }
      </div>

    </div>
  )
}

export default Orders;