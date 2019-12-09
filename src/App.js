import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

import { useLocalStorage } from './hooks/useLocalStorage';

import { ProductContext } from './contexts/ProductContext';
import { CartContext } from './contexts/CartContext';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useLocalStorage('localCart', []);
	console.log(cart);

	const addItem = item => {
		setCart([...cart, item]);
	};

	const removeItem = item => {
		setCart(cart.filter(i => i.id !== item.id));
	};

	return (
		<div className="App">
			<CartContext.Provider value={{cart, removeItem}}>				
				<Navigation />			

				{/* Routes */}
				<ProductContext.Provider value={{products, addItem}}>
					<Route
						exact
						path="/"
						component={Products}
					/>
		
					<Route
						path="/cart"
						component={ShoppingCart}
					/>
				</ProductContext.Provider>
			</CartContext.Provider>
		</div>
	);
}

export default App;
