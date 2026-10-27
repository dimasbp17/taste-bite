import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { getCategories } from '../../../lib/api';
import useFetch from '../../../hooks/useFetch';
import SectionHeader from '../../../components/SectionHeader';
import useLanguage from '../../../i18n/useLanguage';

const Categories = () => {
  const { t, name } = useLanguage();
  const { data: categories, loading } = useFetch(getCategories);
  const scrollerRef = useRef(null);

  const scroll = (direction) => {
    const el = scrollerRef.current;
    el?.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <section className="border-y border-line bg-white py-16">
      <div className="container-page">
        <SectionHeader
          eyebrow={t('categories.eyebrow')}
          title={t('categories.title')}
        >
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scroll(-1)}
              className="btn-outline size-11 p-0"
              aria-label={t('categories.scrollLeft')}
            >
              <FiChevronLeft className="text-xl" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              className="btn-outline size-11 p-0"
              aria-label={t('categories.scrollRight')}
            >
              <FiChevronRight className="text-xl" />
            </button>
          </div>
        </SectionHeader>

        <ul
          ref={scrollerRef}
          className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide sm:mx-0 sm:px-0"
        >
          {loading
            ? Array.from({ length: 8 }, (_, i) => (
                <li
                  key={i}
                  className="w-32 shrink-0 animate-pulse sm:w-36"
                >
                  <div className="aspect-square rounded-3xl bg-cream-dark" />
                  <div className="mx-auto mt-3 h-4 w-16 rounded bg-cream-dark" />
                </li>
              ))
            : (categories || []).map((category) => (
                <li
                  key={category.idCategory}
                  className="w-32 shrink-0 snap-start sm:w-36"
                >
                  <Link
                    to={`/meal-category/${category.strCategory}`}
                    className="group block rounded-3xl text-center"
                  >
                    <div className="flex aspect-square items-center justify-center rounded-3xl bg-cream p-4 ring-1 ring-line transition-all group-hover:bg-brand-50 group-hover:ring-brand/30">
                      <img
                        src={category.strCategoryThumb}
                        alt=""
                        loading="lazy"
                        className="w-full object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <p className="mt-3 font-medium text-ink group-hover:text-brand">
                      {name(category.strCategory)}
                    </p>
                  </Link>
                </li>
              ))}
        </ul>
      </div>
    </section>
  );
};

export default Categories;
