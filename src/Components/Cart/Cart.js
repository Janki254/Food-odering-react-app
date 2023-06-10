import React, {useContext, useState} from 'react';
import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import CheckoutForm from './CheckoutForm';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmitted, setDidSubmitted] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const AddItemsHandler = (item) => {
        cartCtx.addItems({...item, quantity: 1});
    };
    const DeleteItemsHandler = (id) => {
        cartCtx.deleteItem(id);
    };
    const orderHandler = () => {
        setIsCheckout(true);
    };

    const ConfirmOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch(
            'https://food-ordering-app-aac0e-default-rtdb.firebaseio.com/Orders.json',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: userData,
                    orderItems: cartCtx.items,
                }),
            },
        );

        setIsSubmitting(false);
        setDidSubmitted(true);
        cartCtx.clearCart();
    };
    // Cart Items
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

    // ModalActions
    const modalActions = (
        <div className={styles.actions}>
            <button className={styles['button--alt']} onClick={props.closeCart}>
                Close
            </button>
            {hasItems && (
                <button className={styles.button} onClick={orderHandler}>
                    Order
                </button>
            )}
        </div>
    );

    // CartModalContent
    const CartModalContent = (
        <React.Fragment>
            <div>{cartItems}</div>
            <div className={styles.total}>
                <span>Total Amount</span>
                <span className={styles.price}>{totalAmount}</span>
            </div>
            {isCheckout && (
                <CheckoutForm
                    onConfirmOrder={ConfirmOrderHandler}
                    onCancel={props.closeCart}
                />
            )}
            {!isCheckout && modalActions}
        </React.Fragment>
    );
    // Submitting Order Data
    const isSubmittingModalContent = (
        <div className={styles.feedback}>
            <p className={styles.feedback}>Sending Order Details...</p>
        </div>
    );

    // Submitting Order Data
    const SubmittedgModalContent = (
        <React.Fragment>
            <div className={styles.feedback}>
                <p>Order Submitted Successfully!.😊</p>
                <button className={styles.button} onClick={props.closeCart}>
                    Close
                </button>
            </div>
        </React.Fragment>
    );

    return (
        <Modal closeCartHandler={props.closeCart}>
            {!isSubmitting && !didSubmitted && CartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmitted && SubmittedgModalContent}
        </Modal>
    );
};

export default Cart;
