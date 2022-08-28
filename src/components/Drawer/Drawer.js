import s from './Drawer.module.scss'


function Drawer({ onClose, onRemove, items = [] }) {
  return (
    <div className={s.overlay}>
      <div className={s.drawer} >
        <h2>Корзина
          <img onClick={onClose} className={s.removeBtn} src='/img/btn-remove.svg' alt='Remove' />
        </h2>

        {
          items.length > 0
            ?
            <div>
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
                    <img onClick={() => onRemove(obj.id)} className={s.removeBtn} src='/img/btn-remove.svg' alt='Remove' />
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
                <button className={s.greenButton}>Оформить заказ <img className={s.arrowBtn} src='/img/arrow.svg' alt='Arrow' /> </button>
              </div>
            </div>
            :
            <div className={s.cartEmpty}>
              <img className={s.box} src="/img/emptyCart.jpg" alt="EmptyCart" />
              <h2> Корзина пустая</h2>
              <p> Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
              <button onClick={onClose} className={s.greenButton}>Вернуться назад <img className={s.arrowBtn} src='/img/arrow.svg' alt='Arrow' /> </button>
            </div>
        }


      </div>
    </div>
  )
}

export default Drawer;