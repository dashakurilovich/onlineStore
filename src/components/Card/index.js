import { useState } from 'react';
import s from './Card.module.scss'

function Card(props) {

  const [isAdded, setIsAdded] = useState(false);

  const onClickPlus = () => {
    setIsAdded(!isAdded)
  }

  return (
    <div className={s.card}>
      <div className={s.favorite}>
        <img src='/img/heart-unliked.svg' alt='Unliked' onClick={props.onClickFavorite} />
      </div>
      <img className={s.photoSneakers} width={133} height={112} src={props.imageUrl} alt='Sneakers' />
      <h5>{props.title}</h5>
      <div className={s.cardWrapper}>
        <div className={s.cardDescribe}>
          <span>Цена:</span>
          <b>{props.price} руб.</b>
        </div>
        <img className={s.plus} onClick={onClickPlus} src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'} alt='Plus' />
      </div>
    </div>
  )
}

export default Card;


