import React, {useContext, useEffect, useState} from 'react';
import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
    const cartCtx = useContext(CartContext);
    const {items} = cartCtx;
    // Accumulator = The Result of Previous calculation
    // item = the Value which we passing to the calculateion
    const noOfCartItems = items.reduce((accumulator, item) => {
        return accumulator + item.quantity;
    }, 0);

    const [buttonHighlighted, setButtonHighlighted] = useState(false);

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setButtonHighlighted(true);
        const timer = setTimeout(() => {
            setButtonHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);
    // Adding classes conditionally to bump the Button
    const classesForBtn = `${classes.button} ${
        buttonHighlighted ? classes.bump : ''
    }`;

    return (
        <React.Fragment>
            <button
                type='button'
                className={classesForBtn}
                onClick={props.openCartHandler}
            >
                <span className={classes.icon}>
                    <CartIcon />
                </span>
                <span>Your Cart</span>
                <span className={classes.badge}>{noOfCartItems}</span>
            </button>
        </React.Fragment>
    );
};

export default HeaderCartButton;
