import React, {useEffect, useState} from 'react';
import styles from './AvailableMeals.module.css';

import Card from '../UI/Card';
import MealsItem from './MealsItem/MealsItem';

const AvailableMeals = () => {
    const [meals_array, setMeals_array] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    //Fetching Meals from Firebase's Meals Database
    useEffect(() => {
        const FetchingMeals = async () => {
            const res = await fetch(
                'https://food-ordering-app-aac0e-default-rtdb.firebaseio.com/Meals.json',
            );

            if (!res.ok) {
                throw new Error('Loading Meals Failed!..');
            }

            const responseData = await res.json();

            const loadedMeals = [];

            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                });
            }

            setMeals_array(loadedMeals);

            setIsLoading(false);
        };
        FetchingMeals().catch((err) => {
            setIsLoading(false);
            setError(err.message);
        });
    }, []);

    const mealsList = meals_array.map((meal) => (
        <MealsItem
            key={meal.id}
            id={meal.id}
            mealName={meal.name}
            mealDescription={meal.description}
            mealPrice={meal.price}
        />
    ));

    let content;

    if (isLoading) {
        content = <p className={styles.mealsLoadind}>Loadings..</p>;
    }
    if (error) {
        content = <p className={styles.errorState}>{error}</p>;
    }
    if (mealsList.length > 0) {
        content = mealsList;
    }
    return (
        <React.Fragment>
            <section className={styles.meals}>
                <Card>
                    <ul>{content}</ul>
                </Card>
            </section>
        </React.Fragment>
    );
};

export default AvailableMeals;
