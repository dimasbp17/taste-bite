import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Chicken = () => {
  const [chicken, setChicken] = useState([]);
  const [dessert, setDessert] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchChicken = async () => {
      try {
        const response = await axios.get(
          'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken'
        );
        setChicken(response.data.meals.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.error('Error fetch chicken', error);
      }
    };
    fetchChicken();
  }, []);

  useEffect(() => {
    setLoading(true);

    const fetchDessert = async () => {
      try {
        const response = await axios.get(
          'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert'
        );
        setDessert(response.data.meals.slice(3, 6));
        setLoading(false);
      } catch (error) {
        console.error('Error fetch chicken', error);
      }
    };
    fetchDessert();
  }, []);

  const LoadingSkeleton = () => {
    return (
      <>
        {Array(3)
          .fill()
          .map((_, index) => (
            <div
              key={index}
              className="animate-pulse"
            >
              <div>
                <div className="w-full bg-gray-300 h-60"></div>
                <div className="mt-2 bg-gray-400 h-7 w-60"></div>
              </div>
            </div>
          ))}
      </>
    );
  };

  return (
    <>
      <div className="w-full px-4 lg:px-24">
        <div>
          <h1 className="my-2 text-2xl font-bold font-playfair">
            Chicken Sundries
          </h1>
          {loading ? (
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
              <LoadingSkeleton />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
              {chicken.map((iwak, index) => (
                <Link to={'/'}>
                  <div
                    key={index}
                    className="w-full border border-none"
                  >
                    <img
                      src={iwak.strMealThumb}
                      alt={iwak.strMeal}
                      className="object-cover w-full h-60"
                    />
                    <h1 className="mt-2 font-medium font-inter">
                      {iwak.strMeal}
                    </h1>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="my-5">
          <h1 className="my-2 text-2xl font-bold font-playfair">
            Sweet Dessert
          </h1>
          {loading ? (
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
              <LoadingSkeleton />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
              {dessert.map((desert, index) => (
                <Link to={'/'}>
                  <div
                    key={index}
                    className="w-full border border-none"
                  >
                    <img
                      src={desert.strMealThumb}
                      alt={desert.strMeal}
                      className="object-cover w-full h-60"
                    />
                    <h1 className="mt-2 font-medium font-inter">
                      {desert.strMeal}
                    </h1>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chicken;
