import React from 'react';
import { Link } from 'react-router-dom';
import { FiBookOpen, FiGlobe, FiHeart } from 'react-icons/fi';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useLanguage from '../../i18n/useLanguage';

const values = [
  { icon: FiBookOpen, title: 'about.value1Title', text: 'about.value1Text' },
  { icon: FiGlobe, title: 'about.value2Title', text: 'about.value2Text' },
  { icon: FiHeart, title: 'about.value3Title', text: 'about.value3Text' },
];

const About = () => {
  const { t } = useLanguage();
  useDocumentTitle(t('about.docTitle'));

  return (
    <>
      <section className="container-page pb-12 pt-12 lg:pt-20">
        <div className="max-w-3xl">
          <p className="eyebrow">{t('about.eyebrow')}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-6xl">
            {t('about.title')}
          </h1>
        </div>
        <img
          src="/images/about.jpg"
          alt={t('about.imageAlt')}
          className="mt-12 aspect-[16/9] w-full rounded-[2rem] object-cover shadow-lift lg:aspect-[21/9]"
        />
      </section>

      <section className="container-page py-12">
        <ul className="grid gap-6 md:grid-cols-3">
          {values.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="rounded-3xl bg-white p-8 ring-1 ring-line"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand">
                <Icon
                  className="text-xl"
                  aria-hidden
                />
              </span>
              <h2 className="mt-5 text-xl font-semibold">{t(title)}</h2>
              <p className="mt-2 text-ink-soft">{t(text)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-page grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-3xl font-semibold sm:text-4xl">{t('about.storyTitle')}</h2>
          <div className="mt-6 space-y-4 text-lg text-ink-soft">
            <p>{t('about.story1')}</p>
            <p>{t('about.story2')}</p>
          </div>
          <Link
            to="/recipes"
            className="btn-primary mt-8 px-7"
          >
            {t('about.cta')}
          </Link>
        </div>
        <img
          src="/images/blueberry.jpg"
          alt={t('about.blueberryAlt')}
          className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-card"
        />
      </section>
    </>
  );
};

export default About;
