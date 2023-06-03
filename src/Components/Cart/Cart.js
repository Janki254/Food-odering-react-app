import React, {useContext} from 'react';
import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const AddItemsHandler = (item) => {
        cartCtx.addItems({...item, quantity: 1});
    };
    const DeleteItemsHandler = (id) => {
        cartCtx.deleteItem(id);
    };

    const cartItems = (
        <ul className={styles['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity}
                    onAddItem={AddItemsHandler.bind(null, item)}
                    onDeleteItem={DeleteItemsHandler.bind(null, item.id)}
                />
            ))}
        </ul>
    );

    return (
        <React.Fragment>
            <Modal closeCartHandler={props.closeCart}>
                <div>{cartItems}</div>
                <div className={styles.total}>
                    <span>Total Amount</span>
                    <span className={styles.price}>{totalAmount}</span>
                </div>
                <div className={styles.actions}>
                    <button
                        className={styles['button--alt']}
                        onClick={props.closeCart}
                    >
                        Close
                    </button>
                    {hasItems && (
                        <button className={styles.button}>Order</button>
                    )}
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default Cart;
