import React from 'react';
import styles from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
    return (
        <React.Fragment>
            <div className={styles.input}>
                <label htmlFor={props.input.id}>{props.label}</label>
                <input {...props.input} ref={ref}/>
            </div>
        </React.Fragment>
    );
});

export default Input;
