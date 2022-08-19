import s from './Header.module.scss'


function Header(props) {

  return (
    <header>
      <div className={s.headerLeft}>
        <img width={40} height={40} src='/img/logo.png' />
        <div className={s.headerInfo}>
          <h3>React sneakers</h3>
          <p>Магазин лучших кроссовок</p>
        </div>
      </div>
      <ul className={s.headerRight}>
        <li onClick={props.onClickCart} className={s.price}>
          <img width={18} height={17} src='/img/cart.svg' />
          <span>1205 руб.</span>
        </li>
        <li>
          <img width={20} height={20} src='/img/user.svg' />
        </li>
      </ul>
    </header>
  )
}


export default Header;