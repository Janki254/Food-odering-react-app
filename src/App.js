import React, {useState} from 'react';
import MainHeader from './Components/Layouts/MainHeader';
import Meals from './Components/Meals/Meals';
import Cart from './Components/Cart/Cart';
import CartProvider from './store/CartProvider';
import CheckoutForm from './Components/Cart/CheckoutForm';

const App = () => {
    const [showCart, setShowCart] = useState(false);

    const showCartHandler = () => {
        setShowCart(true);
    };
    const HideCartHandler = () => {
        setShowCart(false);
    };

    return (
        <React.Fragment>
            <CartProvider>
                {showCart && <Cart closeCart={HideCartHandler} />}
                <MainHeader openCart={showCartHandler} />
                <main>
                    <Meals />
                </main>
            </CartProvider>
        </React.Fragment>
    );
};

export default App;
