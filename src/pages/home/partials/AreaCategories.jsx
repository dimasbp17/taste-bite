import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import areas from '../../../data/areas';
import SectionHeader from '../../../components/SectionHeader';
import { useTranslation } from 'react-i18next';
import useName from '../../../i18n/useName';

const INITIAL_COUNT = 12;

const AreaCategories = () => {
  const { t } = useTranslation();
  const name = useName();
  const [showAll, setShowAll] = useState(false);
  const visibleAreas = showAll ? areas : areas.slice(0, INITIAL_COUNT);

  return (
    <section
      id="cuisines"
      className="bg-sage-50 py-16 lg:py-20"
    >
      <div className="container-page">
        <SectionHeader
          eyebrow={t('areas.eyebrow')}
          title={t('areas.title')}
          description={t('areas.description')}
        />

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {visibleAreas.map((area) => (
            <li key={area.name}>
              <Link
                to={`/meal-category-area/${area.name}`}
                className="group relative block overflow-hidden rounded-2xl shadow-card"
              >
                <img
                  src={area.image}
                  alt=""
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
                <span className="absolute bottom-3 left-4 font-semibold text-white">
                  {name(area.name)}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {areas.length > INITIAL_COUNT && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((value) => !value)}
              className="btn-outline"
              aria-expanded={showAll}
            >
              {showAll ? t('areas.showFewer') : t('areas.showAll', { count: areas.length })}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AreaCategories;
