
import './App.css';
import Card from './components/Card';
import Drawer from './components/Drawer';
import Header from './components/Header';

const arr = [
  { title: 'Кроссовки Puma X Aka Boku Future Rider', price: 8999, imageUrl: '/img/sneakers/1.jpg' },
  { title: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 12999, imageUrl: '/img/sneakers/2.jpg' },
  { title: 'Мужские Кроссовки Nike Air Max 270', price: 12999, imageUrl: '/img/sneakers/3.jpg' },
  { title: 'Мужские Кроссовки Under Armour Curry 8', price: 8499, imageUrl: '/img/sneakers/5.jpg' },
]


function App(props) {
  return (
    <div className='wrapper'>
      <div style={{ display: 'none' }} className='overlay'>
        <Drawer />
      </div>
      <Header />
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
            arr.map((obj) =>
              <Card 
                title={obj.title}
                price={obj.price}
                imageUrl={obj.imageUrl}
              />)
          }
        </div>

      </div>
    </div>
  );
}

export default App;
