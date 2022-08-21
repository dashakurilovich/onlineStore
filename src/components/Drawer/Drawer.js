import s from './Drawer.module.scss'


function Drawer({ onClose, items = [] }) {
  return (
    <div className={s.overlay}>
      <div className={s.drawer} >
        <h2>Корзина
          <img onClick={onClose} className={s.removeBtn} src='/img/btn-remove.svg' alt='Remove' />
        </h2>
        <div className={s.items}>
          {items.map((obj) => (
            <div className={s.cartItem}>
              <div style={{
                backgroundImage: `url(${obj.imageUrl})`
              }} className={s.cartItemImg}>  </div>
              <div className={s.cartDescribe}>
                <p >{obj.title}</p>
                <b>{obj.price} руб.</b>
              </div>
              <img className={s.removeBtn} src='/img/btn-remove.svg' alt='Remove' />
            </div>
          ))}
        </div>
        <div className={s.cartTotalBlock}>
          <ul >
            <li>
              <span>Итого:</span>
              <div></div>
              <b>21 498 руб.</b>
            </li>
            <li>
              <span>Налог 5%</span>
              <div></div>
              <b>1074 руб.</b>
            </li>
          </ul>
          <button className={s.greenButton}>Оформить заказ <img src='/img/arrow.svg' alt='Arrow' /> </button>
        </div>
      </div>
    </div>
  )
}

export default Drawer;