import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import areaImages from './areaImages';

const AreaCategories = () => {
  const [categoriesArea, setCategoriesArea] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // setLoading(true);
    const fetchCategoriesArea = async () => {
      try {
        const response = await axios.get(
          'https://www.themealdb.com/api/json/v1/1/list.php?a=list'
        );
        setCategoriesArea(response.data.meals);
        console.log(response.data.meals);

        // setLoading(false);
      } catch (error) {
        console.error('Error fetch categories', error);
      }
    };
    fetchCategoriesArea();
  }, []);
  return (
    <>
      <div className="w-full px-4 lg:px-24">
        <h1 className="my-2 text-2xl font-bold font-playfair">
          Meal Categories by Area
        </h1>

        <div className="grid grid-cols-7 gap-3">
          {categoriesArea
            .filter((area) => area.strArea !== 'Unknown')
            .map((area, index) => (
              <Link
                key={index}
                to={'/'}
              >
                <div className="text-black bg-white rounded-lg shadow-md">
                  <img
                    src={areaImages[area.strArea]}
                    alt=""
                    className="object-cover w-full h-24 rounded-t-lg"
                  />
                  <h1 className="p-1 text-sm text-center">{area.strArea}</h1>
                </div>
              </Link>
            ))}
        </div>
        {/* <div className="flex w-full gap-4 overflow-x-scroll whitespace-nowrap scrollbar-hide">
          <Link to={'/'}>
            <div className="text-black bg-white rounded-lg shadow-md">
              <img
                src={italian}
                alt=""
                className="object-cover h-24 rounded-t-lg w-28"
              />
              <h1 className="p-1 text-center">Italian</h1>
            </div>
          </Link>
        </div> */}

        {/* {loading ? (
          <div className="flex w-full gap-4 overflow-x-scroll whitespace-nowrap scrollbar-hide">
            <SkeletonCategories />
          </div>
        ) : (
          <div className="flex w-full gap-4 overflow-x-scroll whitespace-nowrap scrollbar-hide">
            {categories.map((category, index) => (
              <Link to={`/meal-category/${category.strCategory}`}>
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
        )} */}
      </div>
    </>
  );
};

export default AreaCategories;
