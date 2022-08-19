
import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import Header from './components/Header/Header';
import Drawer from './components/Drawer/Drawer';

const arr = []


function App(props) {

  const [items, setItems] = useState([])
  const [cartOpened, setCartOpened] = useState(false)

  useEffect(() => {
    fetch('https://62fecc1ba85c52ee483cd09f.mockapi.io/items').then(res => {
      return res.json();
    })
      .then((json) => {
        setItems(json);
      })
  }, [])


  return (
    <div className='wrapper'>
      {cartOpened && <Drawer onClose={() => { setCartOpened(false) }} />}
      <Header onClickCart={() => { setCartOpened(true) }} />
      <div className='content'>
        <div className='middleBlock'>
          <h1>Все кроссовки</h1>
          <div className='searchBlock'>
            <img width={14} height={14} src='/img/lupa.svg' alt='Search' className='lupa' />
            <input placeholder='Поиск....' />
          </div>
        </div>

        <div className='sneakers'>
          {
            items.map((obj) =>
              <Card
                title={obj.title}
                price={obj.price}
                imageUrl={obj.imageUrl}
                onClickFavorite={() => { console.log('Добавили в закладки'); }}
                onClickPlus={() => { console.log('Нажали плюс'); }}
              />)
          }
        </div>

      </div>
    </div>
  );
}

export default App;
