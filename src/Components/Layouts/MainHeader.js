import React from 'react';
import classes from './MainHeader.module.css';
import mealImage from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

const MainHeader = (props) => {
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton openCartHandler={props.openCart} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealImage} alt='meals' />
            </div>
        </React.Fragment>
    );
};

export default MainHeader;
