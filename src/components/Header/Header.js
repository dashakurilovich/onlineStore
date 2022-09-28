import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart';

import s from './Header.module.scss'
import logo from '../../assests/img/logo.png';
import cart from '../../assests/img/cart.svg';
import favorite from '../../assests/img/favorite.svg';
import user from '../../assests/img/user.svg';


function Header(props) {

  const { totalPrice } = useCart();


  return (
    <header>
      <Link to="/">
        <div className={s.headerLeft}>
          <img width={40} height={40} src={logo} alt='Logotype' />
          <div className={s.headerInfo}>
            <h3>Women sneakers</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className={s.headerRight}>
        <li onClick={props.onClickCart} className={s.price}>
          <img width={18} height={17} src={cart} alt='Cart' />
          <span>{totalPrice} руб.</span>
        </li>
        <Link to="/favorites">
          <li className={s.price}>
            <img width={20} height={20} src={favorite} alt='Favorite' />
          </li>
        </Link>
        <Link to="/orders">
          <li>
            <img width={20} height={20} src={user} alt='User' />
          </li>
        </Link>
      </ul>
    </header>
  )
}


export default Header;