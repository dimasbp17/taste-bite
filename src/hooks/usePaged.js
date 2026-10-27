import { useEffect, useState } from 'react';

/**
 * Shows a long list a page at a time. The count resets when `resetKey`
 * changes (e.g. a new search), so a new list always starts at the top.
 */
const usePaged = (items, pageSize, resetKey) => {
  const [count, setCount] = useState(pageSize);

  useEffect(() => setCount(pageSize), [resetKey, pageSize]);

  return {
    visible: items.slice(0, count),
    shown: Math.min(count, items.length),
    total: items.length,
    hasMore: count < items.length,
    showMore: () => setCount((value) => value + pageSize),
  };
};

export default usePaged;
