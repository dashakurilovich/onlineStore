
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';

import AppContext from './pages/context'
import s from './App.module.scss';
import Header from './components/Header/Header';
import Drawer from './components/Drawer/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';


function App(props) {

  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [cartOpened, setCartOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const cartResponse = await axios.get('https://62fecc1ba85c52ee483cd09f.mockapi.io/cart');
      const favoritesResponse = await axios.get('https://62fecc1ba85c52ee483cd09f.mockapi.io/favorites');
      const itemsResponse = await axios.get('https://62fecc1ba85c52ee483cd09f.mockapi.io/items');

      setIsLoading(false);

      setCartItems(cartResponse.data)
      setFavorites(favoritesResponse.data)
      setItems(itemsResponse.data)
    }
    fetchData();
  }, [])

  const onAddToCart = (obj) => {
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://62fecc1ba85c52ee483cd09f.mockapi.io/cart/${obj.id}`)
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
    } else {
      axios.post('https://62fecc1ba85c52ee483cd09f.mockapi.io/cart', obj)
      setCartItems(prev => [...prev, obj])
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://62fecc1ba85c52ee483cd09f.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter(item => item.id !== id));
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://62fecc1ba85c52ee483cd09f.mockapi.io/favorites/${obj.id}`)
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
      }

      else {
        const { data } = await axios.post('https://62fecc1ba85c52ee483cd09f.mockapi.io/favorites', obj)
        setFavorites((prev) => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в закладки')
    }
  }
  const onChangeSearchInput = (e) => setSearchValue(e.target.value)

  const handleClear = () => {
    setSearchValue('')
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems }}>
      <div className={s.wrapper}>
        {cartOpened && <Drawer items={cartItems} onClose={() => { setCartOpened(false) }} onRemove={onRemoveItem} />}
        <Header onClickCart={() => { setCartOpened(true) }} />

        <Routes >
          <Route path="/" element={<Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            onChangeSearchInput={onChangeSearchInput}
            handleClear={handleClear}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
          />}>
          </Route>
          <Route path="/favorites" element={<Favorites />}>
          </Route>
        </Routes>

      </div>
    </AppContext.Provider>
  );
}

export default App;
