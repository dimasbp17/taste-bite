import React, { useState } from 'react';
import { FiMail } from 'react-icons/fi';
import useLanguage from '../../../i18n/useLanguage';

const Newsletter = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="container-page py-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-brand px-6 py-14 text-center text-white sm:px-12 lg:py-20">
        <div className="absolute -left-20 -top-20 size-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 -right-16 size-72 rounded-full bg-white/10" />

        <div className="relative mx-auto max-w-xl">
          <FiMail
            className="mx-auto text-4xl text-brand-100"
            aria-hidden
          />
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            {t('newsletter.title')}
          </h2>
          <p className="mt-3 text-white/85">{t('newsletter.text')}</p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <label
              htmlFor="newsletter-email"
              className="sr-only"
            >
              {t('newsletter.emailLabel')}
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder={t('newsletter.placeholder')}
              className="input flex-1 rounded-full border-transparent"
            />
            <button
              type="submit"
              className="btn bg-ink px-7 text-white hover:bg-ink/85"
            >
              {t('newsletter.submit')}
            </button>
          </form>

          <p
            className="mt-4 min-h-[1.5rem] text-sm text-white/85"
            aria-live="polite"
          >
            {submitted ? t('newsletter.soon') : t('newsletter.terms')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
