// Words too generic to identify an ingredient on their own: "soy sauce"
// shouldn't match every "sauce", and "brown rice" shouldn't match "brown".
const GENERIC_WORDS = [
  'sauce', 'powder', 'juice', 'stock', 'paste', 'leaves', 'seeds', 'water',
  'brown', 'ground', 'minced', 'fresh', 'chopped', 'large', 'small', 'white',
  'black', 'green', 'dried', 'sliced', 'grated', 'plain', 'extra', 'virgin',
];

const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const mentions = (text, word) => new RegExp(`\\b${escape(word)}`, 'i').test(text);

/** Ingredients from the recipe that are mentioned in this step. */
export const findStepIngredients = (step, ingredients) =>
  ingredients.filter(({ name }) => {
    const lower = name.toLowerCase();
    if (mentions(step, lower)) return true;
    return lower
      .split(/\s+/)
      .map((word) => word.replace(/s$/, ''))
      .some((word) => word.length > 3 && !GENERIC_WORDS.includes(word) && mentions(step, word));
  });

/** Cooking times written in a step, in minutes, e.g. "bake 35 minutes" → 35. */
export const findDurations = (step) => {
  const pattern = /(\d+(?:\.\d+)?)(?:\s*(?:-|–|to)\s*\d+(?:\.\d+)?)?\s*(hours?|hrs?|minutes?|mins?)\b/gi;
  const minutes = [...step.matchAll(pattern)].map(([, amount, unit]) =>
    Math.round(parseFloat(amount) * (/^h/i.test(unit) ? 60 : 1))
  );
  return [...new Set(minutes)].filter((value) => value > 0 && value <= 24 * 60).slice(0, 3);
};

export const formatDuration = (minutes) => {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
};
