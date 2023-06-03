import React, {useRef, useState} from 'react';
import styles from './MealsItemForm.module.css';
import Input from '../../UI/Input';

const MealsItemForm = (props) => {
    const [quantityIsValid, setQuantityIsValid] = useState(true);
    const quantityInputRef = useRef();

    const submitHandler = (e) => {
        e.preventDefault();
        const quantity = quantityInputRef.current.value;
        const enteredQuantity = +quantity;

        if (
            quantity.trim().length === 0 ||
            enteredQuantity < 1 ||
            enteredQuantity > 5
        ) {
            setQuantityIsValid(false);
            return;
        }

        props.onAddItemToCart(enteredQuantity);
    };
    return (
        <React.Fragment>
            <form className={styles.form} onSubmit={submitHandler}>
                <Input
                    label='Amount'
                    ref={quantityInputRef}
                    input={{
                        type: 'number',
                        id: 'amount_' + props.id,
                        min: '1',
                        step: '1',
                        max: '5',
                        defaultValue: '1',
                    }}
                />
                <button>+ Add</button>
                {!quantityIsValid && <p>Please Enter a valid quantity(1-5)</p>}
            </form>
        </React.Fragment>
    );
};

export default MealsItemForm;
