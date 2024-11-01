import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';

const DetailRecipes = () => {
  const [detailMeals, setDetailMeals] = useState([]);

  useEffect(() => {
    const fetchDetailMeals = async () => {
      try {
        const response = await axios.get(
          'https://www.themealdb.com/api/json/v1/1/lookup.php?i=53085'
        );
        setDetailMeals(response.data.meals);
        console.log(response.data.meals);
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
      <div className="w-full px-4 my-5 lg:px-24">
        {detailMeals.map((detail, index) => (
          <div key={index}>
            <h1 className="mb-3 text-4xl font-bold font-playfair">
              {detail.strMeal}
            </h1>
            <img
              src={detail.strMealThumb}
              alt={detail.strMeal}
              className="object-cover w-full h-[500px]"
            />
            <div>
              <h1 className="my-5 text-2xl font-bold font-playfair">
                Ingredients
              </h1>
              <div>
                {Array.from({ length: 20 }, (_, i) => {
                  const measure = detail[`strMeasure${i + 1}`];
                  const ingredient = detail[`strIngredient${i + 1}`];

                  // Memastikan untuk hanya menampilkan jika ingredient ada
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
                  .split(/STEP \d+/) // Memisahkan berdasarkan pola "STEP" diikuti angka
                  .filter((step) => step.trim()) // Menghilangkan elemen kosong
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
          </div>
        ))}
      </div>
    </>
  );
};

export default DetailRecipes;
