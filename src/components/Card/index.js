import s from './Card.module.scss'

function Card(props) {

  const onClickButton = () => {

  }

  return (
    <div className={s.card}>
      <div className={s.favorite}>
        <img src='/img/heart-unliked.svg' alt='Unliked' />
      </div>
      <img width={133} height={112} src={props.imageUrl} alt='Sneakers' />
      <h5>{props.title}</h5>
      <div className={s.cardWrapper}>
        <div className={s.cardDescribe}>
          <span>Цена:</span>
          <b>{props.price} руб.</b>
        </div>
        <button className={s.button}>
          <img width={11} height={11} src='/img/plus.svg' alt='Plus' onClick={onClickButton} />
        </button>
      </div>
    </div>
  )
}

export default Card;


