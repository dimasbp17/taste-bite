import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'https://www.themealdb.com/api/json/v1/1/categories.php'
        );
        setCategories(response.data.categories);
        console.log(response.data.categories);
      } catch (error) {
        console.error('Error fetch categories', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <div className="w-full px-4 lg:px-24">
        <h1 className="my-2 text-2xl font-bold font-playfair">
          Meal Categories
        </h1>
        <div className="flex w-full gap-4 overflow-x-scroll whitespace-nowrap scrollbar-hide">
          {categories.map((category, index) => (
            <Link to={'/'}>
              <div
                key={index}
                className="flex flex-col items-center w-24 border-none"
              >
                <img
                  src={category.strCategoryThumb}
                  alt={category.strCategory}
                  className="object-cover w-24 h-24 rounded-full shadow-md"
                />
                <h1 className="mt-2 text-sm font-medium text-center">
                  {category.strCategory}
                </h1>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
