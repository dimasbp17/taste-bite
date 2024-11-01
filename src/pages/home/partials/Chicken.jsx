import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Chicken = () => {
  const [chicken, setChicken] = useState([]);

  useEffect(() => {
    const fetchChicken = async () => {
      try {
        const response = await axios.get(
          'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken'
        );
        setChicken(response.data.meals);
        // console.log(response.data.meals);
      } catch (error) {
        console.error('Error fetch chicken', error);
      }
    };
    fetchChicken();
  }, []);

  return (
    <>
      <div className="w-full lg:px-24">
        <h1 className="my-2 text-xl font-bold font-playfair">
          Chicken Sundries
        </h1>
        <div className="grid gap-3 lg:grid-cols-3">
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
                <h1 className="mt-2 font-bold">{iwak.strMeal}</h1>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Chicken;
