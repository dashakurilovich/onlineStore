import { useState } from 'react';
import s from './Card.module.scss'

function Card({ onFavorite, imageUrl, title, price, onPlus }) {

  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setisFavorite] = useState(false);

  const onClickPlus = () => {
    onPlus({ imageUrl, title, price });
    setIsAdded(!isAdded)
  }

  const onClickFavorite = () => {
    onFavorite({ imageUrl, title, price });
    setisFavorite(!isFavorite)
  }

  return (
    <div className={s.card}>
      <div className={s.favorite} onClick={onClickFavorite}>
        <img src={isFavorite ? '/img/heart-liked.svg' : '/img/heart-unliked.svg'} alt='Unliked'  />
      </div>
      <img className={s.photoSneakers} width={133} height={112} src={imageUrl} alt='Sneakers' />
      <h5>{title}</h5>
      <div className={s.cardWrapper}>
        <div className={s.cardDescribe}>
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img className={s.plus} onClick={onClickPlus} src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'} alt='Plus' />
      </div>
    </div>
  )
}

export default Card;


