import React from 'react';
import styles from './CheckoutForm.module.css';
import useInput from '../../hooks/useInput';

const CheckoutForm = (props) => {
    const notEmpty = (value) => value.trim() !== '';
    const isFiveChar = (value) => value.trim().length === 6;
    // Name
    const {
        value: enteredName,
        isValid: nameIsvalid,
        inputHasError: nameHasError,
        userInputChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        resetInputHandler: nameReset,
    } = useInput(notEmpty);
    // Street
    const {
        value: enteredStreet,
        isValid: streetIsvalid,
        inputHasError: streetHasError,
        userInputChangeHandler: streetChangeHandler,
        inputBlurHandler: streetBlurHandler,
        resetInputHandler: streetReset,
    } = useInput(notEmpty);

    // City
    const {
        value: enteredCity,
        isValid: cityIsvalid,
        inputHasError: cityHasError,
        userInputChangeHandler: cityChangeHandler,
        inputBlurHandler: cityBlurHandler,
        resetInputHandler: cityReset,
    } = useInput(notEmpty);
    // PostalCodde
    const {
        value: enteredPostalCode,
        isValid: postalCodeIsvalid,
        inputHasError: postalCodeHasError,
        userInputChangeHandler: postalCodeChangeHandler,
        inputBlurHandler: postalCodeBlurHandler,
        resetInputHandler: postalCodeReset,
    } = useInput(isFiveChar);

    let formIsValid = false;

    if (nameIsvalid && streetIsvalid && cityIsvalid && postalCodeIsvalid) {
        formIsValid = true;
    }

    const ConfirmHndler = (e)    => {
        e.preventDefault();

        if (!formIsValid) {
            return;
        }

        props.onConfirmOrder({
            username: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostalCode,
        });
        nameReset();
        streetReset();
        cityReset();
        postalCodeReset();
    };
    const nameClasses = nameHasError
        ? `${styles.control} ${styles.invalid}`
        : styles.control;
    const streetClasses = streetHasError
        ? `${styles.control} ${styles.invalid}`
        : styles.control;
    const cityClasses = cityHasError
        ? `${styles.control} ${styles.invalid}`
        : styles.control;
    const postalCodeClasses = postalCodeHasError
        ? `${styles.control} ${styles.invalid}`
        : styles.control;

    return (
        <React.Fragment>
            <form onSubmit={ConfirmHndler} className={styles.form}>
                {/* Name */}
                <div className={nameClasses}>
                    <label htmlFor='uname'>Enter Your Name</label>
                    <input
                        type='text'
                        id='uname'
                        value={enteredName}
                        onChange={nameChangeHandler}
                        onBlur={nameBlurHandler}
                    />
                    {nameHasError && <p>Name Can't be Empty</p>}
                </div>
                <h4>Enter Your Address</h4>
                <div className={styles.address}>
                    {/* Street */}
                    <div className={streetClasses}>
                        <label htmlFor='street'>Street</label>
                        <input
                            type='text'
                            id='street'
                            value={enteredStreet}
                            onChange={streetChangeHandler}
                            onBlur={streetBlurHandler}
                        />
                        {streetHasError && <p>Street Can't be Empty!</p>}
                    </div>
                    {/* PostalCode */}
                    <div className={postalCodeClasses}>
                        <label htmlFor='postal-code'>PostalCode</label>
                        <input
                            type='text'
                            id='postal-code'
                            value={enteredPostalCode}
                            onChange={postalCodeChangeHandler}
                            onBlur={postalCodeBlurHandler}
                        />
                        {postalCodeHasError && (
                            <p>
                                PostalCode can't be Empty and it must be 6 char
                                long
                            </p>
                        )}
                    </div>
                    {/* City */}
                    <div className={cityClasses}>
                        <label htmlFor='city'>City</label>
                        <input
                            type='text'
                            id='city'
                            value={enteredCity}
                            onChange={cityChangeHandler}
                            onBlur={cityBlurHandler}
                        />
                        {cityHasError && <p>City Can't be Empty!</p>}
                    </div>
                </div>
                <div className={styles.actions}>
                    <button type='button' onClick={props.onCancel}>
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className={styles.submit}
                        disabled={!formIsValid}
                    >
                        Confirm
                    </button>
                </div>
            </form>
        </React.Fragment>
    );
};

export default CheckoutForm;
