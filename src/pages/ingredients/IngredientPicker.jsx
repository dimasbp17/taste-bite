import React, { useId, useMemo, useState } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { getIngredientImage } from '../../lib/api';

const MAX_SUGGESTIONS = 8;

const IngredientPicker = ({ options, selected, onAdd, disabled }) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const listId = useId();

  const suggestions = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    const available = options.filter((name) => !selected.includes(name));
    const starts = available.filter((name) => name.toLowerCase().startsWith(term));
    const contains = available.filter(
      (name) => !name.toLowerCase().startsWith(term) && name.toLowerCase().includes(term)
    );
    return [...starts, ...contains].slice(0, MAX_SUGGESTIONS);
  }, [query, options, selected]);

  const choose = (name) => {
    onAdd(name);
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
        Add an ingredient
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
          placeholder={disabled ? 'You can pick up to 6 ingredients' : 'e.g. chicken, eggs, rice'}
          className="input h-14 rounded-2xl pl-11 text-lg"
        />
      </div>

      {showList && (
        <ul
          id={listId}
          role="listbox"
          className="absolute inset-x-0 top-full z-20 mt-2 max-h-96 overflow-y-auto rounded-2xl bg-white p-2 shadow-lift ring-1 ring-line"
        >
          {suggestions.map((name, index) => (
            <li
              key={name}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={index === highlight}
              // Prevent the input blur from closing the list before the click lands.
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => choose(name)}
              onMouseEnter={() => setHighlight(index)}
              className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 ${
                index === highlight ? 'bg-brand-50' : ''
              }`}
            >
              <img
                src={getIngredientImage(name)}
                alt=""
                loading="lazy"
                className="size-10 object-contain"
              />
              <span className="flex-1 font-medium text-ink">{name}</span>
              <FiPlus
                className="text-brand"
                aria-hidden
              />
            </li>
          ))}
        </ul>
      )}

      {open && query.trim() && suggestions.length === 0 && (
        <p className="absolute inset-x-0 top-full z-20 mt-2 rounded-2xl bg-white p-4 text-ink-soft shadow-lift ring-1 ring-line">
          No ingredient called “{query.trim()}”. Try a simpler word, like “cheese”.
        </p>
      )}
    </div>
  );
};

export default IngredientPicker;
