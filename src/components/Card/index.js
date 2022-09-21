import { useContext, useState } from 'react';
import ContentLoader from 'react-content-loader';


import s from './Card.module.scss'
import AppContext from '../../pages/context';
import heartLiked from '../../assests/img/heartLiked.svg';
import heartUnliked from '../../assests/img/heartUnliked.svg';
import btnChecked from '../../assests/img/btnChecked.svg';
import btnPlus from '../../assests/img/btnPlus.svg';


function Card({
  id,
  onFavorite,
  imageUrl,
  title,
  price,
  onPlus,
  favorited = false,
  loading = false
}) {

  const { isItemAdded } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(favorited);
  const obj = { id, parentId: id, title, imageUrl, price }


  const onClickPlus = () => {
    onPlus(obj);
  }

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite)
  }

  return (
    <div className={s.card}>

      {
        loading ? <ContentLoader
          speed={2}
          width={210}
          height={260}
          viewBox="0 0 210 260"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <circle cx="570" cy="549" r="15" />
          <rect x="505" y="540" rx="2" ry="2" width="140" height="10" />
          <rect x="522" y="541" rx="2" ry="2" width="140" height="10" />
          <rect x="35" y="5" rx="10" ry="10" width="120" height="112" />
          <rect x="6" y="142" rx="5" ry="5" width="185" height="20" />
          <rect x="6" y="169" rx="5" ry="5" width="130" height="20" />
          <rect x="479" y="349" rx="8" ry="8" width="80" height="24" />
          <rect x="153" y="218" rx="10" ry="10" width="32" height="32" />
          <rect x="6" y="222" rx="5" ry="5" width="110" height="24" />
        </ContentLoader> :
          <>
            {onFavorite && (<div className={s.favorite} onClick={onClickFavorite}>
              <img src={isFavorite ? `${heartLiked}` : `${heartUnliked}`} alt='Unliked' />
            </div>)}
            <img className={s.photoSneakers} width={133} height={112} src={imageUrl} alt='Sneakers' />
            <h5>{title}</h5>
            <div className={s.cardWrapper}>
              <div className={s.cardDescribe}>
                <span>Цена:</span>
                <b>{price} руб.</b>
              </div>
              {onPlus && <img
                className={s.plus}
                onClick={onClickPlus}
                src={isItemAdded(id) ? `${btnChecked}` : `${btnPlus}`}
                alt='Plus' />}
            </div>
          </>
      }

    </div>
  )
}

export default Card;


