
import { useEffect, useState } from 'react';
import axios from 'axios';

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
    axios.get('https://62fecc1ba85c52ee483cd09f.mockapi.io/items')
      .then((res) => {
        setItems(res.data)
      });
    axios.get('https://62fecc1ba85c52ee483cd09f.mockapi.io/cart')
      .then((res) => {
        setCartItems(res.data)
      });

  }, [])

  const onAddToCart = (obj) => {
    axios.post('https://62fecc1ba85c52ee483cd09f.mockapi.io/cart', obj)
    setCartItems(prev => [...prev, obj])
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://62fecc1ba85c52ee483cd09f.mockapi.io/cart/${id}`)
    // eslint-disable-next-line eqeqeq
    setCartItems((prev) => prev.filter(item => item.id != id));
  }

  const onChangeSearchInput = (e) => setSearchValue(e.target.value)

  const handleClear = () => {
    setSearchValue('')
  }


  return (
    <div className={s.wrapper}>
      {cartOpened && <Drawer items={cartItems} onClose={() => { setCartOpened(false) }} onRemove={onRemoveItem} />}
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
            items.filter((item) => item.title.toLowerCase().includes(searchValue)).map((item, index) =>
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
