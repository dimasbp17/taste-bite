import { Button } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiSolidCategory, BiWorld } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Jumbotron = () => {
  const [allMeal, setAllMeal] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchAllMeals = async () => {
      try {
        const response = await axios.get(
          'https://www.themealdb.com/api/json/v1/1/search.php?s='
        );
        setAllMeal(response.data.meals);

        setLoading(false);
      } catch (error) {
        console.error('Error fetch chicken', error);
      }
    };
    fetchAllMeals();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % allMeal.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [allMeal]);

  const SkeletonJumbotron = () => {
    return (
      <>
        <div className="grid grid-cols-12">
          <div className="col-span-full lg:col-span-8">
            <div className="bg-gray-400 animate-pulse w-full h-[300px] lg:h-[400px] rounded-t-md lg:rounded-tr-none lg:rounded-l-md"></div>
          </div>
          <div className="bg-gray-300 animate-pulse col-span-full lg:col-span-4 rounded-b-md lg:rounded-bl-none lg:rounded-r-md">
            <div className="flex flex-col items-start justify-center h-full p-10 space-y-3">
              <div className="w-32 bg-gray-500 rounded-sm h-9 animate-pulse"></div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 animate-pulse">
                  <div className="bg-gray-400 rounded-sm size-5"></div>
                  <div className="w-20 h-5 bg-gray-400 rounded-sm"></div>
                </span>

                <span className="flex items-center gap-1 animate-pulse">
                  <div className="bg-gray-500 rounded-sm size-5"></div>
                  <div className="w-20 h-5 bg-gray-500 rounded-sm"></div>
                </span>
              </div>

              <div className="w-24 h-10 bg-gray-500 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="px-4 my-5 lg:px-24">
        {loading ? (
          <SkeletonJumbotron />
        ) : (
          <>
            {allMeal.length > 0 && (
              <div className="grid grid-cols-12">
                <div className="col-span-full lg:col-span-8">
                  <img
                    src={allMeal[currentIndex].strMealThumb}
                    alt={allMeal[currentIndex].strMeal}
                    className="object-cover w-full h-[300px] lg:h-[400px] rounded-t-md lg:rounded-tr-none lg:rounded-l-md"
                  />
                </div>
                <div className="col-span-full lg:col-span-4 bg-biru-muda rounded-b-md lg:rounded-bl-none lg:rounded-r-md">
                  <div className="flex flex-col items-start justify-center h-full p-10 space-y-3">
                    <span className="text-3xl font-bold font-playfair">
                      {allMeal[currentIndex].strMeal}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <BiSolidCategory className="text-oren" />{' '}
                        {allMeal[currentIndex].strCategory}
                      </span>
                      <span className="flex items-center gap-1">
                        <BiWorld className="text-oren" />{' '}
                        {allMeal[currentIndex].strArea}
                      </span>
                    </div>
                    <Link
                      to={`/detail-recipes/${allMeal[currentIndex].idMeal}`}
                    >
                      <Button className="capitalize rounded-md bg-oren">
                        To Recipes
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Jumbotron;
