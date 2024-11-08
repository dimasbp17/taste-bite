import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const CategoriesByArea = () => {
  const { area } = useParams();
  const [categoriesArea, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchCategoriesArea = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
        );
        setCategories(response.data.meals);

        setLoading(false);
      } catch (error) {
        console.error('Error fetch categoriesArea', error);
      }
    };
    fetchCategoriesArea();
  }, [area]);
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="px-4 lg:px-24">
        <div className="my-5">
          <h1 className="text-2xl font-bold font-playfair">Area : {area}</h1>
        </div>
        <div className="grid grid-cols-2 gap-5 mb-5 lg:grid-cols-4">
          {categoriesArea.map((meal, index) => (
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
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default CategoriesByArea;
