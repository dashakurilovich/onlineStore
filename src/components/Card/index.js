import { useState } from 'react';
import s from './Card.module.scss'
import ContentLoader from 'react-content-loader';

function Card({ id,
  onFavorite,
  imageUrl,
  title,
  price,
  onPlus,
  favorited = false,
  added = false,
  loading = false
}) {

  const [isAdded, setIsAdded] = useState(added);
  const [isFavorite, setisFavorite] = useState(favorited);

  const onClickPlus = () => {
    onPlus({ id, imageUrl, title, price });
    setIsAdded(!isAdded)
  }

  const onClickFavorite = () => {
    onFavorite({ id, imageUrl, title, price });
    setisFavorite(!isFavorite)
  }

  return (
    <div className={s.card}>

      {
        loading ? <ContentLoader
          speed={2}
          width={200}
          height={260}
          viewBox="0 0 210 260"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <circle cx="570" cy="549" r="15" />
          <rect x="505" y="540" rx="2" ry="2" width="140" height="10" />
          <rect x="522" y="541" rx="2" ry="2" width="140" height="10" />
          <rect x="0" y="28" rx="10" ry="10" width="190" height="90" />
          <rect x="-3" y="141" rx="5" ry="5" width="190" height="15" />
          <rect x="0" y="166" rx="5" ry="5" width="150" height="15" />
          <rect x="479" y="349" rx="8" ry="8" width="80" height="24" />
          <rect x="156" y="225" rx="10" ry="10" width="32" height="32" />
          <rect x="0" y="225" rx="5" ry="5" width="110" height="24" />
        </ContentLoader> :
          <>
            <div className={s.favorite} onClick={onClickFavorite}>
              <img src={isFavorite ? '/img/heart-liked.svg' : '/img/heart-unliked.svg'} alt='Unliked' />
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
          </>
      }

    </div>
  )
}

export default Card;


