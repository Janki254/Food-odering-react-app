import React from 'react';
import styles from './CartItem.module.css';

const CartItem = (props) => {
    const price = `$${props.price.toFixed(2)}`;
    return (
        <React.Fragment>
            <li className={styles['cart-item']}>
                <div>
                    <h2>{props.name}</h2>
                    <div className={styles.summary}>
                        <span className={styles.price}>{price}</span>
                        <span className={styles.quantity}>
                            x{props.quantity}
                        </span>
                    </div>
                </div>
                <div className={styles.actions}>
                    <button onClick={props.onDeleteItem}>&ndash;</button>
                    <button onClick={props.onAddItem}>+</button>
                </div>
            </li>
        </React.Fragment>
    );
};

export default CartItem;
