
import './App.css';
import Card from './components/Card';
import Drawer from './components/Drawer';
import Header from './components/Header';

function App() {
  return (
    <div className='wrapper'>
      <div  className='overlay'>
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
          <Card />
          <Card />
          <Card />
          <Card />
        </div>

      </div>
    </div>
  );
}

export default App;
