import { Button } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Jumbotron = () => {
  const [allMeal, setAllMeal] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // setLoading(true);
    const fetchDessert = async () => {
      try {
        const response = await axios.get(
          'https://www.themealdb.com/api/json/v1/1/search.php?s='
        );
        setAllMeal(response.data.meals);

        // setLoading(false);
      } catch (error) {
        console.error('Error fetch chicken', error);
      }
    };
    fetchDessert();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % allMeal.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [allMeal]);

  return (
    <>
      <div className="px-4 my-5 lg:px-24">
        {allMeal.length > 0 && (
          <div className="grid grid-cols-12">
            <div className="col-span-full lg:col-span-8">
              <img
                src={allMeal[currentIndex].strMealThumb}
                alt={allMeal[currentIndex].strMeal}
                className="object-cover w-full h-[400px] rounded-tl-md lg:rounded-l-md"
              />
            </div>
            <div className="col-span-full lg:col-span-4 bg-biru-muda">
              <div className="flex flex-col items-start justify-center h-full p-10">
                <span className="text-3xl font-bold font-playfair">
                  {allMeal[currentIndex].strMeal}
                </span>
                <Button className="capitalize rounded-md bg-oren">
                  To Recipes
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Jumbotron;
