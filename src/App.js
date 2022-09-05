
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';


import s from './App.module.scss';
import Header from './components/Header/Header';
import Drawer from './components/Drawer/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

const arr = []

function App(props) {

  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [cartOpened, setCartOpened] = useState(false)


  useEffect(() => {
    axios.get('https://62fecc1ba85c52ee483cd09f.mockapi.io/items')
      .then((res) => {
        setItems(res.data)
      });
    axios.get('https://62fecc1ba85c52ee483cd09f.mockapi.io/favorites')
      .then((res) => {
        setFavorites(res.data)
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
    setCartItems((prev) => prev.filter(item => item.id != id));
  }

  const onAddToFavorite = (obj) => {
    axios.post('https://62fecc1ba85c52ee483cd09f.mockapi.io/favorites')
    setFavorites(prev => [...prev, obj])
  }

  const onChangeSearchInput = (e) => setSearchValue(e.target.value)

  const handleClear = () => {
    setSearchValue('')
  }


  return (
    <div className={s.wrapper}>
      {cartOpened && <Drawer items={cartItems} onClose={() => { setCartOpened(false) }} onRemove={onRemoveItem} />}
      <Header onClickCart={() => { setCartOpened(true) }} />

      <Routes >
        <Route path="/" element={<Home
          items={items}
          searchValue={searchValue}
          onChangeSearchInput={onChangeSearchInput}
          handleClear={handleClear}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
        />}>
        </Route>
        <Route path="/favorites" element={<Favorites
        />}>
        </Route>
      </Routes>

    </div>
  );
}

export default App;
