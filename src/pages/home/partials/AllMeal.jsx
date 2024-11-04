import { Button } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllMeals = () => {
  const [allMeals, setAllMeals] = useState([]);
  const [visibleMeals, setVisibleMeals] = useState(8);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchAllMeals = async () => {
      try {
        const response = await axios.get(
          'https://www.themealdb.com/api/json/v1/1/search.php?s='
        );
        setAllMeals(response.data.meals);
        setLoading(false);
      } catch (error) {
        console.error('Error fetch allMeals', error);
      }
    };
    fetchAllMeals();
  }, []);

  const showMoreMeals = () => {
    setVisibleMeals((prev) => prev + 8);
  };

  const LoadingSkeleton = () => {
    return (
      <>
        {Array(12)
          .fill()
          .map((_, index) => (
            <div
              key={index}
              className="animate-pulse"
            >
              <div>
                <div className="w-full h-32 bg-gray-300 rounded-md lg:h-60"></div>
                <div className="w-32 h-6 mt-2 bg-gray-400 rounded-md"></div>
              </div>
            </div>
          ))}
      </>
    );
  };

  return (
    <>
      <div className="w-full px-4 lg:px-24">
        <div className="mt-10">
          <h1 className="my-2 text-2xl font-bold font-playfair">
            Pick All Meals
          </h1>
          {loading ? (
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <LoadingSkeleton />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
                {allMeals.slice(0, visibleMeals).map((meal, index) => (
                  <Link to={`/detail-recipes/${meal.idMeal}`}>
                    <div
                      key={index}
                      className="w-full border border-none"
                    >
                      <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="object-cover w-full h-32 rounded-md lg:h-60"
                      />
                      <h1 className="mt-2 font-semibold font-inter">
                        {meal.strMeal}
                      </h1>
                    </div>
                  </Link>
                ))}
              </div>
              {visibleMeals < allMeals.length && (
                <div className="flex justify-center my-5">
                  <Button
                    size="md"
                    variant="outlined"
                    className="capitalize border rounded-md text-oren border-oren"
                    onClick={showMoreMeals}
                  >
                    Load More
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AllMeals;
