import { useContext } from "react";

import AppContext from "../pages/context";
import s from './Info.module.scss';
import arrow from '../assests/img/arrow.svg';


const Info = ({title, description, image}) => {

  const { setCartOpened,} = useContext(AppContext);

  return (
    <div className={s.cartEmpty}>
      <img className={s.box} src={image} alt="EmptyCart" />
      <h2> {title}</h2>
      <p> {description} </p>
      <button
        onClick={() => setCartOpened(false)}
        className={s.greenButton}>Вернуться назад
        <img className={s.arrowBtn} src={arrow} alt='Arrow' />
      </button>
    </div>
  );
}




export default Info;