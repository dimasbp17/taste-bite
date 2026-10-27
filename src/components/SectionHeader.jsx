import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const SectionHeader = ({ eyebrow, title, description, link, children }) => (
  <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div className="max-w-2xl">
      {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
      <h2 className="text-3xl font-semibold sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-ink-soft">{description}</p>}
    </div>
    {link && (
      <Link
        to={link.to}
        className="group inline-flex shrink-0 items-center gap-2 font-semibold text-brand hover:text-brand-dark"
      >
        {link.label}
        <FiArrowRight
          className="transition-transform group-hover:translate-x-1"
          aria-hidden
        />
      </Link>
    )}
    {children}
  </div>
);

export default SectionHeader;
