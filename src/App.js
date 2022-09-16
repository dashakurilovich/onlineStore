
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';

import AppContext from './pages/context'
import s from './App.module.scss';
import Header from './components/Header/Header';
import Drawer from './components/Drawer/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';


function App(props) {

  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [cartOpened, setCartOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('https://62fecc1ba85c52ee483cd09f.mockapi.io/cart'),
          axios.get('https://62fecc1ba85c52ee483cd09f.mockapi.io/favorites'),
          axios.get('https://62fecc1ba85c52ee483cd09f.mockapi.io/items')])

        setIsLoading(false);

        setCartItems(cartResponse.data)
        setFavorites(favoritesResponse.data)
        setItems(itemsResponse.data)
      } catch (error) {
        alert('Ошибка при запросе данных')
        console.error(error);
      }
    }
    fetchData();
  }, [])

  const onAddToCart = async (obj) => {
    const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
    try {
      if (findItem) {
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)))
        await axios.delete(`https://62fecc1ba85c52ee483cd09f.mockapi.io/cart/${findItem.id}`)
      } else {
        setCartItems(prev => [...prev, obj]);
        const { data } = await axios.post('https://62fecc1ba85c52ee483cd09f.mockapi.io/cart', obj);
        setCartItems((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            };
          };
          return item;
        }))

      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину')
      console.error(error);
    }
  };

  const onRemoveItem = async (id) => {
    try {
      await axios.delete(`https://62fecc1ba85c52ee483cd09f.mockapi.io/cart/${id}`)
      setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Ошибка при удалении из корзины')
      console.error(error);
    }
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
      console.error(error);
    }
  }
  const onChangeSearchInput = (e) => setSearchValue(e.target.value)

  const handleClear = () => {
    setSearchValue('')
  }

  const isItemAdded = (id) => {
    console.log(cartItems, 2);
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }

  return (
    <AppContext.Provider value={{
      items,
      cartItems,
      favorites,
      isItemAdded,
      onAddToCart,
      onAddToFavorite,
      setCartOpened,
      setCartItems
    }}>
      <div className={s.wrapper}>
        {cartOpened && <Drawer items={cartItems} onClose={() => { setCartOpened(false) }} onRemove={onRemoveItem} opened={true} />}
        <Header
          onClickCart={() => { setCartOpened(true) }} />
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
          <Route path="/orders" element={<Orders />}>
          </Route>
        </Routes>

      </div>
    </AppContext.Provider>
  );
}

export default App;
