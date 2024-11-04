import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BiSolidCategory, BiWorld } from 'react-icons/bi';
import CardRecommendations from './partials/CardRecommendations';
import { FaHashtag } from 'react-icons/fa';

const DetailRecipes = () => {
  const { id } = useParams();
  const [detailMeals, setDetailMeals] = useState([]);

  useEffect(() => {
    const fetchDetailMeals = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        setDetailMeals(response.data.meals);
        // console.log(response.data.meals);
      } catch (error) {
        console.error('Error fetch categories', error);
      }
    };
    fetchDetailMeals();
  }, []);
  return (
    <>
      <div>
        <Navbar />
      </div>
      {detailMeals.map((detail, index) => (
        <div
          key={index}
          className="grid grid-cols-12 my-10 lg:px-24"
        >
          <div className="col-span-full">
            <h1 className="mb-3 text-4xl font-bold font-playfair">
              {detail.strMeal}
            </h1>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <BiSolidCategory className="text-oren" />
                {detail.strCategory}
              </span>
              <span className="flex items-center gap-1">
                <BiWorld className="text-oren" />
                {detail.strArea}
              </span>
              <span className="flex items-center gap-1">
                <FaHashtag className="text-oren" />
                {detail.strTags || '-'}
              </span>
            </div>
            <hr className="w-full my-5 border border-gray-300" />
            <img
              src={detail.strMealThumb}
              alt={detail.strMeal}
              className="object-cover w-full h-[500px] rounded-md"
            />
          </div>
          <div className="col-span-8 pr-4">
            <div>
              <h1 className="my-5 text-2xl font-bold font-playfair">
                Ingredients
              </h1>
              <div>
                {Array.from({ length: 20 }, (_, i) => {
                  const measure = detail[`strMeasure${i + 1}`];
                  const ingredient = detail[`strIngredient${i + 1}`];

                  if (ingredient && ingredient.trim()) {
                    return (
                      <li
                        key={i}
                        className="mb-3 font-medium"
                      >
                        {measure} {ingredient}
                      </li>
                    );
                  }
                  return null;
                })}
              </div>
            </div>

            <div>
              <h1 className="my-5 text-2xl font-bold font-playfair">
                Intructions
              </h1>
              <ol className="pl-5 list-decimal ">
                {detail.strInstructions
                  .split(/STEP \d+/)
                  .filter((step) => step.trim())
                  .map((step, index) => (
                    <li
                      key={index}
                      className="mb-2 font-medium text-justify"
                    >
                      {step.trim()}
                    </li>
                  ))}
              </ol>
            </div>

            <div className="mt-5">
              <span className="font-bold">Source : </span>
              <a
                href={detail.strSource}
                target="blank"
              >
                <span className="text-blue-500">{detail.strSource || '-'}</span>
              </a>
            </div>
          </div>

          <div className="col-span-4 pl-4">
            <h1 className="my-5 text-2xl font-bold font-playfair">
              Recommendations
            </h1>
            <div>
              <CardRecommendations ingredients={detail.strIngredient1} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default DetailRecipes;
