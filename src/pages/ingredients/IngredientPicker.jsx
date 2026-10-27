import React, { useId, useMemo, useState } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { getIngredientImage } from '../../lib/api';
import { useTranslation } from 'react-i18next';
import useName from '../../i18n/useName';

const MAX_SUGGESTIONS = 8;

const IngredientPicker = ({ options, selected, onAdd, disabled, maxCount }) => {
  const { t } = useTranslation();
  const name = useName();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const listId = useId();

  // Match the English name and, in Indonesian, the translated name too,
  // so "bawang putih" finds Garlic.
  const suggestions = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    const available = options.filter((option) => !selected.includes(option));
    const labelsOf = (option) => [option.toLowerCase(), name(option).toLowerCase()];
    const starts = available.filter((option) =>
      labelsOf(option).some((label) => label.startsWith(term))
    );
    const contains = available.filter(
      (option) =>
        !starts.includes(option) && labelsOf(option).some((label) => label.includes(term))
    );
    return [...starts, ...contains].slice(0, MAX_SUGGESTIONS);
  }, [query, options, selected, name]);

  const choose = (option) => {
    onAdd(option);
    setQuery('');
    setHighlight(0);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setHighlight((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (suggestions[highlight]) choose(suggestions[highlight]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const showList = open && suggestions.length > 0;

  return (
    <div className="relative">
      <label
        htmlFor={`${listId}-input`}
        className="mb-2 block font-medium text-ink"
      >
        {t('ing.addLabel')}
      </label>
      <div className="relative">
        <FiSearch
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-ink-muted"
          aria-hidden
        />
        <input
          id={`${listId}-input`}
          type="text"
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={showList ? `${listId}-${highlight}` : undefined}
          autoComplete="off"
          value={query}
          disabled={disabled}
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlight(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={handleKeyDown}
          placeholder={disabled ? t('ing.maxPlaceholder', { count: maxCount }) : t('ing.placeholder')}
          className="input h-14 rounded-2xl pl-11 text-lg"
        />
      </div>

      {showList && (
        <ul
          id={listId}
          role="listbox"
          className="absolute inset-x-0 top-full z-20 mt-2 max-h-96 overflow-y-auto rounded-2xl bg-white p-2 shadow-lift ring-1 ring-line"
        >
          {suggestions.map((option, index) => {
            const label = name(option);
            return (
              <li
                key={option}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={index === highlight}
                // Prevent the input blur from closing the list before the click lands.
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(option)}
                onMouseEnter={() => setHighlight(index)}
                className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 ${
                  index === highlight ? 'bg-brand-50' : ''
                }`}
              >
                <img
                  src={getIngredientImage(option)}
                  alt=""
                  loading="lazy"
                  className="size-10 object-contain"
                />
                <span className="flex-1">
                  <span className="font-medium text-ink">{label}</span>
                  {label !== option && (
                    <span
                      lang="en"
                      className="ml-2 text-sm text-ink-soft"
                    >
                      {option}
                    </span>
                  )}
                </span>
                <FiPlus
                  className="text-brand"
                  aria-hidden
                />
              </li>
            );
          })}
        </ul>
      )}

      {open && query.trim() && suggestions.length === 0 && (
        <p className="absolute inset-x-0 top-full z-20 mt-2 rounded-2xl bg-white p-4 text-ink-soft shadow-lift ring-1 ring-line">
          {t('ing.noMatch', { q: query.trim() })}
        </p>
      )}
    </div>
  );
};

export default IngredientPicker;
