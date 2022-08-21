
import { useEffect, useState } from 'react';
import s from './App.module.scss';
import Card from './components/Card';
import Header from './components/Header/Header';
import Drawer from './components/Drawer/Drawer';

const arr = []


function App(props) {

  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [cartOpened, setCartOpened] = useState(false)


  useEffect(() => {
    fetch('https://62fecc1ba85c52ee483cd09f.mockapi.io/items').then(res => {
      return res.json();
    })
      .then((json) => {
        setItems(json);
      })
  }, [])

  const onAddToCart = (obj) => {
    setCartItems(prev => [...prev, obj])
  }

  const onChangeSearchInput = (e) => setSearchValue(e.target.value)

  const handleClear = () => {
    setSearchValue('')
  }


  return (
    <div className={s.wrapper}>
      {cartOpened && <Drawer items={cartItems} onClose={() => { setCartOpened(false) }} />}
      <Header onClickCart={() => { setCartOpened(true) }} />
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
            items.map((item, index) =>
              <Card
                key={index}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onClickFavorite={() => { console.log('Добавили в закладки'); }}
                onPlus={(obj) => onAddToCart(obj)}
              />)
          }
        </div>

      </div>
    </div>
  );
}

export default App;
