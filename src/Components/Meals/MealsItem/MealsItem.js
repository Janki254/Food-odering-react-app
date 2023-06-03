import React, {useContext} from 'react';
import styles from './MealsItem.module.css';
import MealsItemForm from './MealsItemForm';
import CartContext from '../../../store/cart-context';

const MealsItem = (props) => {
    const cartCtx = useContext(CartContext);

    const price = `$${props.mealPrice.toFixed(2)}`;

    const addingCartItemHandler = (quantity) => {
        cartCtx.addItems({
            id: props.id,
            name: props.mealName,
            price: props.mealPrice,
            quantity: quantity,
        });
    };

    return (
        <React.Fragment>
            <li className={styles.meal}>
                <div>
                    <h3>{props.mealName}</h3>
                    <div className={styles.description}>
                        {props.mealDescription}
                        <div className={styles.price}>{price}</div>
                    </div>
                </div>
                <div>
                    <MealsItemForm
                        onAddItemToCart={addingCartItemHandler}
                        id={props.id}
                    />
                </div>
            </li>
        </React.Fragment>
    );
};

export default MealsItem;
