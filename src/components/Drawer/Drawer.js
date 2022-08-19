import s from './Drawer.module.scss'


function Drawer(props) {
  return (
    <div className={s.overlay}>
      <div className={s.drawer} >
        <h2>Корзина
          <img onClick={props.onClose} className={s.removeBtn} src='/img/btn-remove.svg' alt='Remove' />
        </h2>
        <div className={s.items}>
          <div className={s.cartItem}>
            <div style={{
              backgroundImage: 'url(img/sneakers/1.jpg)'
            }} className={s.cartItemImg}>  </div>
            <div className={s.cartDescribe}>
              <p >Мужские Кроссовки Nike Air Max 270</p>
              <b>12 999 руб.</b>
            </div>
            <img className={s.removeBtn} src='/img/btn-remove.svg' alt='Remove' />
          </div>
          <div className={s.cartItem}>
            <div style={{
              backgroundImage: 'url(img/sneakers/2.jpg)'
            }} className={s.cartItemImg}>  </div>
            <div className={s.cartDescribe}>
              <p >Мужские Кроссовки Nike Air Max 270</p>
              <b>12 999 руб.</b>
            </div>
            <img className={s.removeBtn} src='/img/btn-remove.svg' alt='Remove' />
          </div>
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