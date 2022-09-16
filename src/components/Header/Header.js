import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart';

import s from './Header.module.scss'


function Header(props) {

  const { totalPrice } = useCart();

  return (
    <header>
      <Link to="/">
        <div className={s.headerLeft}>
          <img width={40} height={40} src='/img/logo.png' alt='Logotype' />
          <div className={s.headerInfo}>
            <h3>React sneakers</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className={s.headerRight}>
        <li onClick={props.onClickCart} className={s.price}>
          <img width={18} height={17} src='/img/cart.svg' alt='Cart' />
          <span>{totalPrice} руб.</span>
        </li>
        <Link to="/favorites">
          <li className={s.price}>
            <img width={20} height={20} src='/img/favorite.svg' alt='Favorite' />
          </li>
        </Link>
        <Link to="/orders">
          <li>
            <img width={20} height={20} src='/img/user.svg' alt='User' />
          </li>
        </Link>
      </ul>
    </header>
  )
}


export default Header;