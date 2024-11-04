import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CardRecommendations = ({ ingredients }) => {
  const [allMeals, setAllMeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // setLoading(true);
    const fetchAllMeals = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
        );
        setAllMeals(response.data.meals.slice(0, 5));
        // setLoading(false);
      } catch (error) {
        console.error('Error fetch allMeals', error);
      }
    };
    fetchAllMeals();
  }, [ingredients]);

  const handleMealClick = (mealId) => {
    navigate(`/detail-recipes/${mealId}`);
    window.location.reload();
  };

  return (
    <>
      {allMeals.map((meal, index) => (
        <Link
          to={`/detail-recipes/${meal.idMeal}`}
          onClick={() => handleMealClick(meal.idMeal)}
        >
          <div
            className="grid grid-cols-12"
            key={index}
          >
            <div className="col-span-6 mb-3">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="object-cover w-full rounded-md h-28"
              />
            </div>
            <div className="flex items-center col-span-6 mb-3">
              <h1 className="ml-5 font-semibold font-inter">{meal.strMeal}</h1>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default CardRecommendations;
