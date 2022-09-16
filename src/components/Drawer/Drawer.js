import {  useState } from 'react';
import axios from 'axios';

import Info from '../Info';
import s from './Drawer.module.scss'
import { useCart } from '../hooks/useCart';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({ onClose, onRemove, items = [] }) {

  const { cartItems, setCartItems, totalPrice } = useCart()

  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



  const onClickOrder = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.post('https://62fecc1ba85c52ee483cd09f.mockapi.io/orders', {
        items: cartItems
      })
      setOrderId(data.id)
      setIsOrderComplete(true)
      setCartItems([])

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://62fecc1ba85c52ee483cd09f.mockapi.io/cart/' + item.id);
        await delay(1000);
      }
    }
    catch {
      alert("Ошибка при создании заказа :(")
    }
    setIsLoading(false)
  }

  return (
    <div className={s.overlay}>
      <div className={s.drawer} >
        <h2>Корзина
          <img onClick={onClose} className={s.removeBtn} src='/img/btn-remove.svg' alt='Remove' />
        </h2>

        {
          items.length > 0
            ?
            <div className={s.wrapper}>
              <div className={s.items}>
                {items.map((obj) => (
                  <div key={obj.id} className={s.cartItem}>
                    <div style={{
                      backgroundImage: `url(${obj.imageUrl})`
                    }} className={s.cartItemImg}>  </div>
                    <div className={s.cartDescribe}>
                      <p >{obj.title}</p>
                      <b>{obj.price} руб.</b>
                    </div>
                    <img onClick={() => onRemove(obj.id)} className={s.removeBtn} src='/img/btn-remove.svg' alt='Remove' />
                  </div>
                ))}
              </div>
              <div className={s.cartTotalBlock}>
                <ul >
                  <li>
                    <span>Итого:</span>
                    <div></div>
                    <b>{totalPrice} руб.</b>
                  </li>
                  <li>
                    <span>Налог 5%</span>
                    <div></div>
                    <b>{totalPrice / 100 * 5} руб.</b>
                  </li>
                </ul>
                <button disabled={isLoading} onClick={onClickOrder} className={s.greenButton}>Оформить заказ <img className={s.arrowBtn} src='/img/arrow.svg' alt='Arrow' /> </button>
              </div>
            </div>
            :
            <Info
              title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
              description={isOrderComplete ? `Ваш заказ №${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
              image={isOrderComplete ? "/img/complete-order.jpg" : "/img/emptyCart.jpg"}
            />
        }


      </div>
    </div>
  )
}

export default Drawer;