import { useContext } from 'react';

import Card from '../components/Card';
import s from './Home.module.scss';
import AppContext from '../pages/context';



function Home({  items, searchValue, onChangeSearchInput, handleClear, onAddToFavorite, onAddToCart, isLoading }) {


  const renderItems = () => {

    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()));
    return (
      isLoading
        ? [...Array(10)]
        : filteredItems)
      .map((item, index) => (
        < Card
          key={index}
          onFavorite={(obj) => onAddToFavorite(obj)
          }
          onPlus={(obj) => onAddToCart(obj)}
          loading={isLoading}
          {...item}
        />)
      )
  }



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
          renderItems()
        }
      </div>

    </div>
  )
}

export default Home;