import React from 'react';
import styles from './AvailableMeals.module.css';

import Card from '../UI/Card';
import MealsItem from './MealsItem/MealsItem';

const DUMMY_MEALS = [
    {
        id: 'm1',
        name: 'Sushi',
        description: 'Finest fish and veggies',
        price: 22.99,
    },
    {
        id: 'm2',
        name: 'Schnitzel',
        description: 'A german specialty!',
        price: 16.5,
    },
    {
        id: 'm3',
        name: 'Barbecue Burger',
        description: 'American, raw, meaty',
        price: 12.99,
    },
    {
        id: 'm4',
        name: 'Green Bowl',
        description: 'Healthy...and green...',
        price: 18.99,
    },
];

const AvailableMeals = () => {
    const mealsList = DUMMY_MEALS.map((meal) => (
        <MealsItem
            key={meal.id}
            id={meal.id}
            mealName={meal.name}
            mealDescription={meal.description}
            mealPrice={meal.price}
        />
    ));
    return (
        <React.Fragment>
            <section className={styles.meals}>
                <Card>
                    <ul>{mealsList}</ul>
                </Card>
            </section>
        </React.Fragment>
    );
};

export default AvailableMeals;
