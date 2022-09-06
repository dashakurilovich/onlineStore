import Card from '../components/Card';
import s from './Home.module.scss';


function Favorites({ items, onAddToFavorite  }) {
  return (

    <div className={s.content}>
      <div className={s.middleBlock}>
        <h1>
          Мои закладки
        </h1>

      </div>

      <div className={s.sneakers}>
        {
          items.map((item, index) =>
            <Card
              key={index}
              favorited={true}
              onFavorite={onAddToFavorite}
              {...item}
            />)
        }
      </div>

    </div>
  )
}

export default Favorites;