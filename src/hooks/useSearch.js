import { useMemo, useState } from 'react';

/**
 * useSearch - client-side search hook for filtering an array of items by keyword and location
 *
 * @param {Array} items - array of objects to search
 * @param {Object} options
 *    - keys: array of keys to search for the keyword (default: ['title','company','location'])
 *    - initialKeyword: initial keyword string
 *    - initialLocation: initial location string
 *
 * @returns { keyword, setKeyword, location, setLocation, results, reset }
 */
export default function useSearch(items = [], options = {}) {
  const {
    keys = ['title', 'company', 'location'],
    initialKeyword = '',
    initialLocation = '',
  } = options;

  const [keyword, setKeyword] = useState(initialKeyword);
  const [location, setLocation] = useState(initialLocation);

  const results = useMemo(() => {
    const k = String(keyword || '').trim().toLowerCase();
    const loc = String(location || '').trim().toLowerCase();

    if (!k && !loc) return items;

    return items.filter(item => {
      const matchesKeyword = !k || keys.some(key =>
        String(item[key] || '').toLowerCase().includes(k)
      );

      const matchesLocation = !loc || String(item.location || '').toLowerCase().includes(loc);

      return matchesKeyword && matchesLocation;
    });
  }, [items, keyword, location, keys]);

  const reset = () => {
    setKeyword('');
    setLocation('');
  };

  return { keyword, setKeyword, location, setLocation, results, reset };
}
