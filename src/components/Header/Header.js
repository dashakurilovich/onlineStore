import { Link } from 'react-router-dom'

import s from './Header.module.scss'


function Header(props) {

  return (
    <header>
      <Link to ="/">
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
          <span>1205 руб.</span>
        </li>
        <li className={s.price}>
          <img width={20} height={20} src='/img/favorite.svg' alt='Favorite' />
        </li>
        <li>
          <img width={20} height={20} src='/img/user.svg' alt='User' />
        </li>
      </ul>
    </header>
  )
}


export default Header;