import Card from '../components/Card';
import s from './Home.module.scss';


function Home({ items, searchValue, onChangeSearchInput, handleClear, onAddToFavorite, onAddToCart }) {
  return (

    <div className={s.content}>
      <div className={s.middleBlock}>
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
        </h1>

        <div className={s.searchBlock}>
          <img width={14} height={14} src='/img/lupa.svg' alt='Search' className='lupa' />
          <input onChange={onChangeSearchInput} value={searchValue} placeholder='Поиск....' />
          {searchValue && <img
            onClick={handleClear}
            className={s.removeBtn}
            src='/img/btn-remove.svg'
            alt='Clear' />}
        </div>
      </div>

      <div className={s.sneakers}>
        {
          items.filter((item) => item.title.toLowerCase().includes(searchValue)).map((item, index) =>
            <Card
              key={index}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFavorite={(obj) => onAddToFavorite(obj)}
              onPlus={(obj) => onAddToCart(obj)}
            />)
        }
      </div>

    </div>
  )
}

export default Home;