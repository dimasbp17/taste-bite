import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const CategoriesMeals = () => {
  const { category } = useParams();
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState('');
  const [categoryImage, setCategoryImage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchCategoriesMeals = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        setCategories(response.data.meals);

        const categoryResponse = await axios.get(
          'https://www.themealdb.com/api/json/v1/1/categories.php'
        );

        const selectedCategory = categoryResponse.data.categories.find(
          (cat) => cat.strCategory === category
        );

        if (selectedCategory) {
          setDescription(selectedCategory.strCategoryDescription);
          setCategoryImage(selectedCategory.strCategoryThumb);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetch categories', error);
      }
    };
    fetchCategoriesMeals();
  }, [category]);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <img
          src={categoryImage}
          alt=""
          className="object-cover w-full h-40"
        />
      </div>
      <div className="px-4 lg:px-24">
        <div className="my-5">
          <h1 className="text-3xl font-bold font-playfair">
            {category}{' '}
            <span className="text-sm font-medium font-inter">
              ({categories.length} recipes)
            </span>
          </h1>
          <h3 className="font-medium text-justify">{description}</h3>
        </div>
        <div className="grid grid-cols-2 gap-5 mb-5 lg:grid-cols-4">
          {categories.map((meal, index) => (
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
      <Footer />
    </>
  );
};

export default CategoriesMeals;
