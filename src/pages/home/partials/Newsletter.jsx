import React, { useState } from 'react';
import { FiMail } from 'react-icons/fi';

const Newsletter = () => {
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
            Deliciousness to your inbox
          </h2>
          <p className="mt-3 text-white/85">
            Hand-picked recipes and cooking tips, once a week. No spam, ever.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <label
              htmlFor="newsletter-email"
              className="sr-only"
            >
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@example.com"
              className="input flex-1 rounded-full border-transparent"
            />
            <button
              type="submit"
              className="btn bg-ink px-7 text-white hover:bg-ink/85"
            >
              Subscribe
            </button>
          </form>

          <p
            className="mt-4 min-h-[1.5rem] text-sm text-white/85"
            aria-live="polite"
          >
            {submitted
              ? 'Newsletter sign-up is coming soon — thanks for your interest!'
              : 'By subscribing you agree to our terms and conditions.'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
