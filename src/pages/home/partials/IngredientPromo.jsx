import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { getIngredientImage } from '../../../lib/api';
import { useTranslation } from 'react-i18next';
import useName from '../../../i18n/useName';

const samples = ['Eggs', 'Tomatoes', 'Garlic', 'Cheese', 'Potatoes', 'Lemon'];

const IngredientPromo = () => {
  const { t } = useTranslation();
  const name = useName();

  return (
    <section className="container-page py-16 lg:py-20">
      <div className="grid items-center gap-10 rounded-[2rem] bg-white p-8 shadow-card ring-1 ring-line sm:p-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow">{t('promo.eyebrow')}</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{t('promo.title')}</h2>
          <p className="mt-4 text-lg text-ink-soft">{t('promo.text')}</p>
          <Link
            to="/cook-with-ingredients"
            className="btn-primary mt-8 px-7"
          >
            {t('promo.cta')} <FiArrowRight aria-hidden />
          </Link>
        </div>

        <ul className="grid grid-cols-3 gap-3 sm:gap-4">
          {samples.map((item) => (
            <li key={item}>
              <Link
                to={`/cook-with-ingredients?i=${encodeURIComponent(item)}`}
                className="group flex flex-col items-center rounded-2xl bg-cream p-4 text-center ring-1 ring-line transition-colors hover:bg-brand-50 hover:ring-brand/30"
              >
                <img
                  src={getIngredientImage(item)}
                  alt=""
                  loading="lazy"
                  className="size-16 object-contain transition-transform group-hover:scale-110 sm:size-20"
                />
                <span className="mt-2 font-medium text-ink">{name(item)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default IngredientPromo;
