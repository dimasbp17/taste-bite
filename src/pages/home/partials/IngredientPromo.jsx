import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { getIngredientImage } from '../../../lib/api';

const samples = ['Eggs', 'Tomatoes', 'Garlic', 'Cheese', 'Potatoes', 'Lemon'];

const IngredientPromo = () => (
  <section className="container-page py-16 lg:py-20">
    <div className="grid items-center gap-10 rounded-[2rem] bg-white p-8 shadow-card ring-1 ring-line sm:p-12 lg:grid-cols-2">
      <div>
        <p className="eyebrow">Cook with what you have</p>
        <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
          Not sure what to make?
        </h2>
        <p className="mt-4 text-lg text-ink-soft">
          Pick the ingredients already in your kitchen and we&apos;ll find
          recipes that use them — less waste, no extra shopping.
        </p>
        <Link
          to="/cook-with-ingredients"
          className="btn-primary mt-8 px-7"
        >
          Find recipes by ingredient <FiArrowRight aria-hidden />
        </Link>
      </div>

      <ul className="grid grid-cols-3 gap-3 sm:gap-4">
        {samples.map((name) => (
          <li key={name}>
            <Link
              to={`/cook-with-ingredients?i=${encodeURIComponent(name)}`}
              className="group flex flex-col items-center rounded-2xl bg-cream p-4 ring-1 ring-line transition-colors hover:bg-brand-50 hover:ring-brand/30"
            >
              <img
                src={getIngredientImage(name)}
                alt=""
                loading="lazy"
                className="size-16 object-contain transition-transform group-hover:scale-110 sm:size-20"
              />
              <span className="mt-2 font-medium text-ink">{name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default IngredientPromo;
