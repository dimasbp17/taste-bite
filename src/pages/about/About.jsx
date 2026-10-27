import React from 'react';
import { Link } from 'react-router-dom';
import { FiBookOpen, FiGlobe, FiHeart } from 'react-icons/fi';

const values = [
  {
    icon: FiBookOpen,
    title: 'Easy to follow',
    text: 'Every recipe is broken into clear, numbered steps with a tick-off ingredient list.',
  },
  {
    icon: FiGlobe,
    title: 'From around the world',
    text: 'Explore dishes from 28 cuisines — from Japanese teriyaki to Moroccan tagine.',
  },
  {
    icon: FiHeart,
    title: 'Made for home cooks',
    text: 'No fancy equipment needed. Just good food you can make in your own kitchen.',
  },
];

const About = () => {
  return (
    <>
      <section className="container-page pb-12 pt-12 lg:pt-20">
        <div className="max-w-3xl">
          <p className="eyebrow">About Tastebite</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-6xl">
            We&apos;re a group of foodies who love cooking and sharing.
          </h1>
        </div>
        <img
          src="/images/about.jpg"
          alt="Friends sharing a meal around a table"
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
              <h2 className="mt-5 text-xl font-semibold">{title}</h2>
              <p className="mt-2 text-ink-soft">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-page grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Simple, easy recipes for all
          </h2>
          <div className="mt-6 space-y-4 text-lg text-ink-soft">
            <p>
              We are the right place for anyone who loves cooking and wants to
              explore recipes from around the world. Our mission is to bring you
              the best dishes you can easily make at home — from mouth-watering
              appetizers to sweet desserts.
            </p>
            <p>
              With Tastebite, cooking becomes more fun and a lot less
              complicated. Start your culinary adventure with us and find new
              inspiration in every recipe.
            </p>
          </div>
          <Link
            to="/recipes"
            className="btn-primary mt-8 px-7"
          >
            Start exploring recipes
          </Link>
        </div>
        <img
          src="/images/blueberry.jpg"
          alt="Blueberry dessert"
          className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-card"
        />
      </section>
    </>
  );
};

export default About;
