import './App.css';
import { useState } from 'react';

import AddToCart from './components/AddToCard';
import DisplayCartItems from './components/DisplayCartItems';

function App() {
  const useState1 = (a) => {
    let aNew = a;

    function setter(a) {
      aNew = a;
    }

    return [aNew, setter]
  }

  const [var1, setVar] = useState1(1);

  console.log(var1)
  setVar(var1 + 1);
  console.log(var1)
  const [cartItems, setCardItems] = useState([]);

  const addItemToCart = (newItem) => {
    setCardItems([...cartItems,newItem]);
  }

  return (
    <div className="App App-header">
      <AddToCart addItemToCart={addItemToCart}/>
      <DisplayCartItems cartItems={cartItems}/>
    </div>
  );
}

export default App;
